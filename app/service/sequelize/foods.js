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
  });

  return {
    data: result.rows,
    pages: Math.ceil(result.count / limit),
    total: result.count,
  };
};

module.exports = { getAllFoods };
