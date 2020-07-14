// const User = require('../models/mongoose/user');
// const Company = require('../models/mongoose/Company');
const { db } = require('../models/sequelize');
const router = express.Router();
const { Order, OrderItem, Delivery } = db;

// function customerDataMerge(customer, companyInfo) {
//   for (let i = 0; i < companyInfo.length; i++) {
//     if (customer.company_id === companyInfo[i].company_id) {
//       return companyInfo[i].company_id;
//     }
//   }
// }

async function transformer() {
  // const customerCollection = await User.find({}, ' -credit_cards -_id -password -__v');
  // const companyCollection = await Company.find({}, ' -_id  -__v');
  router.get('/order', async (_, res) => {
  const orders = await Order.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt,'],
    },
    include: [
      {
        model: OrderItem,
        as: 'OrderItem',
      },
    ],
    order: [['created_at', 'DESC']],
    limit: 100,
    raw: true,
  });

  const deliveries = await Delivery.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'id'],
    },
    include: [
      {
        model: OrderItem,
        as: 'OrderItem',
      },
    ],
    limit: 100,
    raw: true,
  });

  console.table(deliveries);
  console.table(orders);
  console.table(customerCollection);
  console.table(companyCollection);
    }
}

transformer();
