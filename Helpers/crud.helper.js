/**
 *
 * @param {array of keys ["key_one", "key_two", ...]} keys
 * @param { data object [{ key_one: 'data', key_two: 0, key_three: 'more data'},...]} data
 */

function removeKeys(keys, data) {
  let dataArray;
  if (data instanceof Array) {
    dataArray = data;
  } else {
    dataArray = [data];
  }
  let newDataArray = dataArray.map((item) => {
    keys.filter((key) => {
      if (key == '_id') {
        item.id = item[key];
      }
      if (item.hasOwnProperty(key)) {
        delete item[key];
      }
    });
    return item;
  });
  return newDataArray;
}

// -=-=-=-=-=-=-=-=-=- check unique =-=-=-=-=-=-=-=-=-=-=-=-=-

async function isUnique(Model, data) {
  return new Promise(async (resolve, reject) => {
    try {
      const count = await Model.count({ where: data });
      if (count > 0) {
        let error = new Error('Data exists!');
        error.name = 'NON_UNIQUE';
        error.resCode = 400;
        throw error;
      }
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}

// -=-=-=-=-=-=-=-=-=- get the count =-=-=-=-=-=-=-=-=-=-=-=-=-

async function getCount(Model, query = {}) {
  try {
    const count = await Model.count({ where: query });
    return count;
  } catch (error) {
    throw error;
  }
}

// -=-=-=-=-=-=-=-=-=- create =-=-=-=-=-=-=-=-=-=-=-=-=-

async function create(Model, data) {
  return new Promise(async (resolve, reject) => {
    try {
      const createdData = await Model.create(data);
      const savedData = removeKeys(['id'], createdData.toJSON()); // Assuming Sequelize uses "id" instead of "_id"
      resolve(savedData);
    } catch (error) {
      reject(error);
    }
  });
}

// -=-=-=-=-=-=-=-=-=- read the data with selected pages and return array =-=-=-=-=-=-=-=-=-=-=-=-=-

async function readWithPagination(Model, query, pagination = false, exclude = {}, sort = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      let options = {
        where: query,
        attributes: exclude,
        limit: pagination ? pagination.limit || 10 : undefined,
        offset: pagination ? pagination.skip || 0 : 0,
        order: sort
      };

      const data = await Model.findAll(options);
      resolve(data.map((record) => record.toJSON()));
    } catch (error) {
      reject(error);
    }
  });
}

// -=-=-=-=-=-=-=-=-=- simple read and return a object =-=-=-=-=-=-=-=-=-=-=-=-=-

async function read(Model, query, exclude = {}, sort = []) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Model.findOne({
        where: query,
        attributes: exclude,
        order: sort
      });
      resolve(data ? data.toJSON() : null);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

// -=-=-=-=-=-=-=-=-=- update =-=-=-=-=-=-=-=-=-=-=-=-=-

async function update(Model, data) {
  return new Promise(async (resolve, reject) => {
    try {
      await Model.update(data.data, { where: data.query });
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}

// -=-=-=-=-=-=-=-=-=- delete =-=-=-=-=-=-=-=-=-=-=-=-=-

async function remove(Model, data) {
  return new Promise(async (resolve, reject) => {
    try {
      await Model.destroy({ where: data });
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}

// -=-=-=-=-=-=-=-=-=- read the and return the array =-=-=-=-=-=-=-=-=-=-=-=-=-

async function findDetails(Model, query, includes = []) {
  return new Promise(async (resolve, reject) => {
    try {
      const options = {
        where: query
      };

      if (includes.length > 0) {
        options.include = includes;
      }

      const data = await Model.findAll(options);
      resolve(data.map((record) => record.toJSON()));
    } catch (error) {
      reject(error);
    }
  });
}

// -=-=-=-=-=-=-=-=-=- read data with selected coulums =-=-=-=-=-=-=-=-=-=-=-=-=-

async function findDetailsWithSelectedField(Model, query, includes = []) {
  return new Promise(async (resolve, reject) => {
    try {
      const options = {
        where: query.conditions || {},
        attributes: query.projection || []
      };

      if (includes.length > 0) {
        options.include = includes;
      }

      const data = await Model.findAll(options);
      resolve(data.map((record) => record.toJSON()));
    } catch (error) {
      const newErr = new Error('Unable to get details');
      newErr.error = error;
      newErr.code = 401;
      reject(newErr);
    }
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
  findDetailsWithSelectedField
};
