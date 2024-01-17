const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require('@google/generative-ai');

const { NotFoundError } = require('../../errors');
const User = require('../../../models').User;
const Exercise = require('../../../models').Exercise;
const Food = require('../../../models').Food;
const Activity = require('../../../models').Activity;
const ExerciseRecommendation =
  require('../../../models').ExerciseRecommendation;
const FoodRecommendation = require('../../../models').FoodRecommendation;
const ActivityRecommendation =
  require('../../../models').ActivityRecommendation;
const dotenv = require('dotenv');
dotenv.config();

const createActivitiesRecommendationUser = async (req) => {
  const { uid } = req.user;
  const { date } = req.body;

  const user = await User.findOne({ where: { uid } });
  if (!user) {
    throw new NotFoundError(`User with uid ${uid} was not found`);
  }

  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({ model: process.env.MODEL_NAME });

  const generationConfig = {
    temperature: 0.7,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const activities = await Activity.findAndCountAll({
    where: { UserId: user.id, date: date },
    attributes: ['id', 'name', 'duration', 'priority'],
  });

  let input = '';
  activities.rows.forEach((activity, index) => {
    input += `\n${index + 1}. ${activity.name} ${
      activity.duration
    } menit, prioritas ${activity.priority}.`;
  });

  const parts = [
    {
      text:
        'rencana aktivitas:' +
        input +
        '\nAturan:\n1. waktu aktivitas terakhir tidak boleh lebih dari jam 20.00.\n2. rencana aktivitas harus diutamakan.\n3. tambahkan aktivitas olahraga jika tidak ada aktivitas olahraga\n4. tambahkan aktivitas sarapan, makan siang, makan malam jika tidak ada.\n5. tambahkan aktivitas istirahat jika tidak ada aktivitas istirahat.\n6. dibuat dalam bentuk list dengan format [jam, aktivitas].\n',
    },
  ];

  const content = await model.generateContent({
    contents: [{ role: 'user', parts }],
    generationConfig,
    safetySettings,
  });

  const response = content.response.text();
  const lines = response.split('\n');
  const recommendedActivities = [];
  lines.forEach((line) => {
    recommendedActivities.push(line);
  });

  const result = await ActivityRecommendation.create({
    activities: recommendedActivities,
    date: date,
    UserId: user.id,
  });

  return result;
};

const getActivitiesRecommendationUser = async (req) => {
  const { date } = req.query;
  const { uid } = req.user;

  const user = await User.findOne({ where: { uid } });
  if (!user) {
    throw new NotFoundError(`User with uid ${uid} was not found`);
  }

  const result = await ActivityRecommendation.findOne({
    where: { UserId: user.id, date: date },
    attributes: ['id', 'activities', 'date'],
  });

  return result;
};

const getExercisesRecommendationUser = async (req) => {
  const { page = 1, limit = 10, date } = req.query;
  const { uid } = req.user;

  const user = await User.findOne({ where: { uid } });
  if (!user) {
    throw new NotFoundError(`User with uid ${uid} was not found`);
  }

  const result = await ExerciseRecommendation.findAndCountAll({
    limit,
    offset: (page - 1) * limit,
    where: { UserId: user.id, date: date },
    attributes: ['id', 'UserId', 'date'],
    include: [
      {
        model: Exercise,
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
      },
    ],
  });

  return {
    data: result.rows,
    pages: Math.ceil(result.count / limit),
    total: result.count,
  };
};

const getFoodsRecommendationUser = async (req) => {
  const { page = 1, limit = 10, date } = req.query;
  const { uid } = req.user;

  const user = await User.findOne({ where: { uid } });
  if (!user) {
    throw new NotFoundError(`User with uid ${uid} was not found`);
  }
  const result = await FoodRecommendation.findAndCountAll({
    limit,
    offset: (page - 1) * limit,
    where: { UserId: user.id, date: date },
    attributes: ['id', 'UserId', 'date'],
    include: {
      model: Food,
      attributes: ['id', 'name', 'category', 'description', 'image'],
    },
  });

  return {
    data: result.rows,
    pages: Math.ceil(result.count / limit),
    total: result.count,
  };
};

module.exports = {
  createActivitiesRecommendationUser,
  getActivitiesRecommendationUser,
  getExercisesRecommendationUser,
  getFoodsRecommendationUser,
};
