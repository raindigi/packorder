const csv = require('csvtojson');
const moment = require('moment');

async function dataTransformer(tableTo, fileName) {
  const data = await csv().fromFile(fileName);
  switch (tableTo) {
    case 'Order':
      return data.map((data) => ({
        id: parseInt(data.id),
        created_at: moment(data.created_at).toDate(),
        order_name: data.order_name,
        customer_id: data.customer_id,
      }));
    case 'Delivery':
      return data.map((data) => ({
        id: parseInt(data.id),
        order_item_id: parseInt(data.order_item_id),
        delivered_quantity: parseInt(data.delivered_quantity),
      }));
    case 'Order Items':
      return data.map((data) => ({
        id: parseInt(data.id),
        order_id: parseInt(data.order_id),
        price_per_unit: parseFloat(data.price_per_unit),
        quantity: parseInt(data.quantity),
        product: data.product,
      }));
    case 'User':
      return data.map((data) => ({
        user_id: data.user_id,
        login: data.login,
        password: data.password,
        name: data.name,
        company_id: data.company_id,
        credit_cards: data.credit_cards,
      }));
    default:
      break;
  }
}

module.exports = { dataTransformer };
