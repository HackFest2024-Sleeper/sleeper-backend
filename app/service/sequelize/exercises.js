const Exercise = require('../../../models').exercises;

const getAllExercises = async (req) => {
  const { page = 1, limit = 10 } = req.query;
  const whereClause = {};

  if (req.query.keyword) {
    keyword = keyword.toLowerCase();
    whereClause.name = { [Op.iLike]: `%${q}%` };
  }

  const result = await Exercise.findAndCountAll({
    limit,
    offset: (page - 1) * limit,
    where: whereClause,
    attributes: [
      'id',
      'name',
      'category',
      'description',
      'duration',
      'repetitions',
      'sets',
      'video',
    ],
  });

  return {
    data: result.rows,
    pages: Math.ceil(result.count / limit),
    total: result.count,
  };
};

module.exports = { getAllExercises };
