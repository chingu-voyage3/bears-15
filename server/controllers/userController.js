const Demo = require('../models/Demo');

exports.home = (req, res) => {
  res.send('hello world');
};

exports.login = (req, res) => {
  res.send('is user logged in ?');
};

exports.getSampleData = async (req, res) => {
  const sampleData = await Demo.find({});
  res.json(sampleData);
};
