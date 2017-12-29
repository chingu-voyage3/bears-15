const Demo = require('../models/Demo');

exports.home = (req, res) => {
  res.json('hello world');
};

exports.getSampleData = async (req, res) => {
  const sampleData = await Demo.find({});
  res.json(sampleData);
};
