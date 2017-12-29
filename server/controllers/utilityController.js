const Demo = require('../models/Demo');
const jwt = require('jsonwebtoken');

function createToken(auth) {
  return jwt.sign(
    {
      id: auth.id
    },
    'my-secret',
    {
      expiresIn: 60 * 120
    }
  );
}

exports.generateToken = (req, res, next) => {
  req.token = createToken(req.auth);
  return next();
};

exports.sendToken = (req, res) => {
  res.setHeader('x-auth-token', req.token);
  return res.status(200).send(JSON.stringify(req.user));
};

// create demo data
exports.seedDB = async (req, res) => {
  const baseData = {
    address: 'lagos, nigeria',
    website: 'https://domain.com',
    email: 'hello@domain.com',
    phone: '+23412345678'
  };

  const companies = [
    { name: 'konga', description: 'buy anything online' },
    { name: 'devcenter', description: 'hire great developers' },
    { name: 'paystack', description: 'simple payments' }
  ];

  const sampleData = await companies.map(company => Object.assign({}, baseData, company));

  await Demo.remove({}, () => {
    sampleData.forEach((item) => {
      new Demo(item).save();
    });
  });

  res.json('Database seeded successfully');
};
