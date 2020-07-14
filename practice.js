weatherData = (state) => {
  return state.weatherData.map((data) => ({
    id: parseInt(data.id),
    order_name: data.order_name,
    company_name: data.company_name,
    name: data.name,
    temp: data._weatherTemp === undefined ? 0 : parseInt(data._weatherTemp),
    orderDate: moment.unix(data.created_at).format('LLL'),
    deliveredAmount: parseFloat(data.price_per_unit * data.delivered_quantity),
    totalAmount: parseFloat(data.price_per_unit * data.quantity),
  }))
}

const data = [
  {
    id: 1,
    order_id: 1,
    price_per_unit: 1.3454,
    quantity: 10,
    product: 'Corrugated Box',
  },
  {
    id: 2,
    order_id: 2,
    price_per_unit: 23.14,
    quantity: 11,
    product: 'Corrugated Box',
  },
  {
    id: 3,
    order_id: 3,
    price_per_unit: 123.0345,
    quantity: 12,
    product: 'Corrugated Box',
  },
  {
    id: 4,
    order_id: 4,
    price_per_unit: null,
    quantity: 13,
    product: 'Corrugated Box',
  },
  {
    id: 5,
    order_id: 5,
    price_per_unit: 100,
    quantity: 14,
    product: 'Corrugated Box',
  },
  {
    id: 6,
    order_id: 6,
    price_per_unit: 1.5454,
    quantity: 15,
    product: 'Corrugated Box',
  },
  {
    id: 7,
    order_id: 7,
    price_per_unit: 25.14,
    quantity: 16,
    product: 'Corrugated Box',
  },
  {
    id: 8,
    order_id: 8,
    price_per_unit: 133.0345,
    quantity: 17,
    product: 'Corrugated Box',
  },
  {
    id: 9,
    order_id: 9,
    price_per_unit: 13.456,
    quantity: 18,
    product: 'Corrugated Box',
  },
  {
    id: 10,
    order_id: 10,
    price_per_unit: 110,
    quantity: 19,
    product: 'Corrugated Box',
  },
  {
    id: 11,
    order_id: 1,
    price_per_unit: 45.2334,
    quantity: 20,
    product: 'Hand sanitizer',
  },
  {
    id: 12,
    order_id: 2,
    price_per_unit: null,
    quantity: 21,
    product: 'Hand sanitizer',
  },
  {
    id: 13,
    order_id: 3,
    price_per_unit: 273.1234,
    quantity: 22,
    product: 'Hand sanitiZER',
  },
  {
    id: 14,
    order_id: 4,
    price_per_unit: 11.45,
    quantity: 23,
    product: 'Hand sanitizer',
  },
  {
    id: 15,
    order_id: 5,
    price_per_unit: 12.467,
    quantity: 24,
    product: 'Hand sanitizer',
  },
  {
    id: 16,
    order_id: 6,
    price_per_unit: 11,
    quantity: 25,
    product: 'Hand sanitizer',
  },
  {
    id: 17,
    order_id: 7,
    price_per_unit: 123,
    quantity: 26,
    product: 'Hand sanitizer',
  },
  {
    id: 18,
    order_id: 8,
    price_per_unit: 173.1234,
    quantity: 27,
    product: 'Hand sanitizer',
  },
  {
    id: 19,
    order_id: 9,
    price_per_unit: 23.876,
    quantity: 28,
    product: 'Hand sanitizer',
  },
  {
    id: 20,
    order_id: 10,
    price_per_unit: 120,
    quantity: 29,
    product: 'Hand sanitizer',
  },
]

const data2 = [
  {
    id: 1,
    delivery_identifier: 1,
    order_item_id: 1,
    delivered_quantity: 5,
  },
  {
    id: 2,
    delivery_identifier: 2,
    order_item_id: 2,
    delivered_quantity: 11,
  },
  {
    id: 3,
    delivery_identifier: 3,
    order_item_id: 3,
    delivered_quantity: 12,
  },
  {
    id: 4,
    delivery_identifier: 4,
    order_item_id: 4,
    delivered_quantity: 3,
  },
  {
    id: 5,
    delivery_identifier: 5,
    order_item_id: 6,
    delivered_quantity: 15,
  },
  {
    id: 6,
    delivery_identifier: 6,
    order_item_id: 7,
    delivered_quantity: 8,
  },
  {
    id: 7,
    delivery_identifier: 7,
    order_item_id: 8,
    delivered_quantity: 3,
  },
  {
    id: 8,
    delivery_identifier: 8,
    order_item_id: 16,
    delivered_quantity: 25,
  },
  {
    id: 9,
    delivery_identifier: 9,
    order_item_id: 17,
    delivered_quantity: 26,
  },
  {
    id: 10,
    delivery_identifier: 10,
    order_item_id: 18,
    delivered_quantity: 27,
  },
  {
    id: 11,
    delivery_identifier: 11,
    order_item_id: 19,
    delivered_quantity: 28,
  },
  {
    id: 12,
    delivery_identifier: 12,
    order_item_id: 20,
    delivered_quantity: 29,
  },
  {
    id: 13,
    delivery_identifier: 13,
    order_item_id: 4,
    delivered_quantity: 5,
  },
  {
    id: 14,
    delivery_identifier: 14,
    order_item_id: 8,
    delivered_quantity: 8,
  },
  {
    id: 15,
    delivery_identifier: 15,
    order_item_id: 8,
    delivered_quantity: 6,
  },
]
const reducer = (accumulator, currentValue) => accumulator + currentValue
const mergeDeliveryAndOrderItem = (orderItem, delivery) =>
  orderItem.map((itm) => ({
    ...delivery.find((item) => item.order_item_id === itm.id && item),
    ...itm,
  }))

const mng = mergeDeliveryAndOrderItem(data, data2)
const filterNan = (array) => {
  const floatingNumber = array.filter(function (value) {
    return !Number.isNaN(value)
  })

  return floatingNumber
}

const nullRemove = mng.map((data) => ({
  id: data.id,
  order_item_id: data.order_item_id,
  delivery_identifier: data.delivery_identifier,
  delivered_quantity:
    data.delivered_quantity === undefined ? 0 : data.price_per_unit,
  order_id: data.order_id,
  price_per_unit: data.price_per_unit === null ? 0 : data.price_per_unit,
  quantity: data.quantity,
  total:
    typeof data.price_per_unit === null
      ? '-'
      : data.quantity * data.price_per_unit,
  total_delivered:
    data.delivered_quantity === undefined
      ? 0
      : data.delivered_quantity * data.price_per_unit,
  product: data.product,
}))

const output = []

nullRemove.forEach(function (item) {
  const existing = output.filter(function (v, i) {
    return v.order_id === item.order_id
  })
  if (existing.length) {
    const existingIndex = output.indexOf(existing[0])
    output[existingIndex].product = output[existingIndex].product.concat(
      item.product
    )
    output[existingIndex].total = output[existingIndex].total.concat(item.total)
    output[existingIndex].total_delivered = output[
      existingIndex
    ].total_delivered.concat(item.total_delivered)
  } else {
    if (
      typeof item.price_per_unit !== 'undefined' &&
      typeof item.product === 'string'
    )
      item.total = [item.total]
    item.total_delivered = [item.total_delivered]
    item.product = [item.product]
    output.push(item)
  }
})

console.log('===========================================================')
const accumulator2 = output.map((data) => ({
  id: data.id,
  order_item_id: data.order_item_id,
  delivery_identifier: data.delivery_identifier,
  delivered_quantity: data.delivered_quantity,
  order_id: data.order_id,
  price_per_unit: data.price_per_unit,
  quantity: data.quantity,
  total: data.total.reduce(reducer),
  total_delivered: data.total_delivered.reduce(reducer),
}))
console.log(accumulator2)
