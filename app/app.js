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
      // eslint-disable-next-line
      break;
    case 'Delivery':
      return data.map((data) => ({
        id: parseInt(data.id),
        order_item_id: parseInt(data.order_item_id),
        delivered_quantity: parseInt(data.delivered_quantity),
      }));
      // eslint-disable-next-line
      break;
    case 'Order Items':
      return data.map((data) => ({
        id: parseInt(data.id),
        order_id: parseInt(data.order_id),
        price_per_unit: parseFloat(data.price_per_unit),
        quantity: parseInt(data.quantity),
        product: data.product,
      }));
      // eslint-disable-next-line
      break;
    case 'User':
      return data.map((data) => ({
        user_id: data.user_id,
        login: data.login,
        password: data.password,
        name: data.name,
        company_id: data.company_id,
        credit_cards: data.credit_cards,
      }));
      // eslint-disable-next-line
      break;
    case 'Company':
      return data.map((data) => ({
        company_id: data.company_id,
        company_name: data.company_name,
      }));
      // eslint-disable-next-line
      break;
    default:
      break;
  }
}

module.exports = { dataTransformer };
