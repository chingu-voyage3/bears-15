const Demo = require('../models/Demo');

exports.home = (req, res) => {
  res.json('hello world');
};

exports.login = (req, res) => {
  res.json('is user logged in ?');
};

exports.getSampleData = async (req, res) => {
  const sampleData = await Demo.find({});
  res.json(sampleData);
};
