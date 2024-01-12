const { NotFoundError } = require('../../errors');

const Exercise = require('../../../models').Exercise;

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
      'image',
    ],
  });

  return {
    data: result.rows,
    pages: Math.ceil(result.count / limit),
    total: result.count,
  };
};

const getOneExercise = async (req) => {
  const { id } = req.params;

  const result = await Exercise.findOne({
    where: { id },
    attributes: [
      'id',
      'name',
      'category',
      'description',
      'duration',
      'repetitions',
      'sets',
      'image',
    ],
  });

  if (!result) {
    throw new NotFoundError(`Exercise with id ${id} not found`);
  }

  return result;
};

module.exports = { getAllExercises, getOneExercise };
