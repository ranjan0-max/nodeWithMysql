const Response = require('../Helpers/response.helper');
const { IST } = require('../Helpers/dateTime.helper');
const { generateCustomError } = require('../Helpers/error.helper');
const AuthHelper = require('../Helpers/auth.helper');
const Logger = require('../Helpers/logger');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY, APP_NAME } = process.env;

const login = async (req, res, next) => {
  try {
    const query = {};
    if (req.body?.email) query.email = req.body.email;
    else if (req.body?.password) query.password = req.body.password;
    else return Response.badRequest(res, { message: "Invalid Inputs" });

    const user = await prisma.user.findUnique({
      where: query,
      include: { role: true }
    });

    if (!user){
      return Response.badRequest(res, { message: "Invalid User" });
    }
    if (user.isDeleted) {
      return Response.badRequest(res, { message: "User Is In Active" });
    }

    await AuthHelper.compareHash(req.body.password, user.password);

    const accessToken = await AuthHelper.generateToken(
      { id: user.id, role: user.role, activeStatus: user.active },
      ACCESS_TOKEN_EXPIRY,
      ACCESS_TOKEN_SECRET
    );

    const refreshToken = await AuthHelper.generateToken(
      { id: user.id, role: user.role, activeStatus: user.active },
      REFRESH_TOKEN_EXPIRY,
      REFRESH_TOKEN_SECRET
    );

    res.cookie(APP_NAME, JSON.stringify({ refreshToken }), {
      secure: true,
      httpOnly: true,
      expires: IST('date', 7, 'days'),
      sameSite: 'none'
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken }
    });

    Response.success(res, {
      data: { accessToken, user, refreshToken },
      message: 'Logged-In Successfully'
    });
  } catch (error) {
    console.log(error);
    Logger.error(error.message + ' at login function auth controller');
    next(error);
  }
};

const generateTokens = async (req, res, next) => {
  try {
    let token = JSON.parse(req.cookies[APP_NAME])?.refreshToken;
    if (!token) return generateCustomError('Invalid data or data missing!', 'bad_request', 400, 'invalidData');

    const verify = await AuthHelper.verifyToken(token, REFRESH_TOKEN_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: verify.id, refreshToken: token, isDeleted: false }
    });

    if (!user) return generateCustomError('Invalid token or user blocked!', 'bad_request', 400, 'invalidTokenOrUserBlocked');

    const accessToken = await AuthHelper.generateToken(
      { id: user.id, name: user.name, userId: user.userId, role: user.role },
      ACCESS_TOKEN_EXPIRY,
      ACCESS_TOKEN_SECRET
    );

    return Response.success(res, { data: [{ accessToken }] });
  } catch (error) {
    Logger.error(error.message + ' at generate tokens function auth controller');
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { auth_user_id } = req.query;
    if (!auth_user_id) return Response.error(res, { message: 'auth_user_id is required.', statusCode: 400 });

    await prisma.user.update({
      where: { id: parseInt(auth_user_id) },
      data: { refreshToken: '', active: false, updatedAt: IST('date') }
    });

    res.clearCookie(APP_NAME, { secure: true, httpOnly: true, sameSite: 'none' });
    return Response.success(res, { message: 'User logged out!' });
  } catch (error) {
    console.log('error', error);
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.query.auth_user_id) },
      select: {
        id: true,
        name: true,
        userId: true,
        active: true,
        role: { select: { id: true, name: true } }
      }
    });

    if (!user) return generateCustomError('Please register and try again!', 'user_not_found', 400);
    Response.success(res, { data: { user, date: IST() }, message: 'Logged-In User Data Found' });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { login, logout, generateTokens, getUser };