const { NotFoundError } = require('../../errors');

const Food = require('../../../models').foods;

const getAllFoods = async (req) => {
  const { page = 1, limit = 10 } = req.query;
  const whereClause = {};

  if (req.query.keyword) {
    keyword = keyword.toLowerCase();
    whereClause.name = { [Op.iLike]: `%${q}%` };
  }

  const result = await Food.findAndCountAll({
    limit,
    offset: (page - 1) * limit,
    where: whereClause,
    attributes: ['id', 'name', 'category', 'description', 'image'],
  });

  return {
    data: result.rows,
    pages: Math.ceil(result.count / limit),
    total: result.count,
  };
};

const getOneFood = async (req) => {
  const { id } = req.params;

  const result = await Food.findOne({
    where: { id },
    attributes: ['id', 'name', 'category', 'description', 'image'],
  });

  if (!result) {
    throw new NotFoundError(`Food with id ${id} not found`);
  }

  return result;
};

module.exports = { getAllFoods, getOneFood };
