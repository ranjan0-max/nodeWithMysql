const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Remove specified keys from data object(s)
function removeKeys(keys, data) {
  const dataArray = Array.isArray(data) ? data : [data];
  return dataArray.map((item) => {
    keys.forEach((key) => {
      if (key === '_id') {
        item.id = item[key];
      }
      delete item[key];
    });
    return item;
  });
}

// Check uniqueness
async function isUnique(model, data) {
  const count = await model.count({ where: data });
  if (count > 0) {
    throw new Error('Data exists!');
  }
  return true;
}

// Get count
async function getCount(model, query = {}) {
  return await model.count({ where: query });
}

// Create record
async function create(model, data) {
  const createdData = await model.create({ data });
  return removeKeys(['id'], createdData);
}

// Read with pagination
async function readWithPagination(model, query, pagination = {}, exclude = [], orderBy = []) {
  const data = await model.findMany({
    where: query,
    select: exclude.length ? Object.fromEntries(exclude.map((key) => [key, false])) : undefined,
    skip: pagination.skip || 0,
    take: pagination.limit || 10,
    orderBy,
  });
  return data;
}

// Read single record
async function read(model, query, exclude = [], orderBy = []) {
  const data = await model.findFirst({
    where: query,
    select: exclude.length ? Object.fromEntries(exclude.map((key) => [key, false])) : undefined,
    orderBy,
  });
  return data;
}

// Update record
async function update(model, query, data) {
  return await model.updateMany({ where: query, data });
}

// Delete record
async function remove(model, query) {
  return await model.deleteMany({ where: query });
}

// Find details with includes
async function findDetails(model, query, includes = []) {
  return await model.findMany({ where: query, include: includes.length ? Object.fromEntries(includes.map((key) => [key, true])) : undefined });
}

// Find details with selected fields
async function findDetailsWithSelectedField(model, query, projection = [], includes = []) {
  return await model.findMany({
    where: query.conditions || {},
    select: projection.length ? Object.fromEntries(projection.map((key) => [key, true])) : undefined,
    include: includes.length ? Object.fromEntries(includes.map((key) => [key, true])) : undefined,
  });
}

module.exports = {
  isUnique,
  getCount,
  readWithPagination,
  read,
  create,
  update,
  remove,
  findDetails,
  findDetailsWithSelectedField,
};
