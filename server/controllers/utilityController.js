const Demo = require('../models/Demo');

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

  res.send('Database seeded successfully');
};
