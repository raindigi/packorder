// I used vuex to try and consolidate state as much as possible
export const state = () => ({
  orderData: [],
})

export const getters = {
  serveOrderData: (state) => {
    return state.orderData
  },
}

export const mutations = {
  getOrderData(state, data) {
    const output = []
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    const mergeById = (customer, a2) =>
      customer.map((itm) => ({
        ...a2.find((item) => item.company_id === itm.company_id && item),
        ...itm,
      }))
    const mergeByCustomerId = (orders, customers) =>
      orders.map((itm) => ({
        ...customers.find((item) => item.user_id === itm.customer_id && item),
        ...itm,
      }))
    const mergeDeliveryAndOrderItem = (orderItem, delivery) =>
      orderItem.map((itm) => ({
        ...delivery.find((item) => item.order_item_id === itm.id && item),
        ...itm,
      }))

    const mergeByOrderId = (order, orderItem) =>
      order.map((itm) => ({
        ...orderItem.find((item) => item.order_id === itm.id && item),
        ...itm,
      }))

    const customerData = mergeById(data.customer, data.customer_company)

    const orderAndCustomer = mergeByCustomerId(data.orders, customerData)

    const orderAndDelivery = mergeDeliveryAndOrderItem(
      data.orderItems,
      data.deliveries
    )

    const accumulator = orderAndDelivery.map((data) => ({
      id: data.id,
      order_item_id: data.order_item_id,
      delivery_identifier: data.delivery_identifier,
      delivered_quantity: data.delivered_quantity,
      order_id: data.order_id,
      price_per_unit: data.price_per_unit,
      quantity: data.quantity,
      total: isNaN(data.price_per_unit)
        ? '-'
        : data.quantity * data.price_per_unit,
      total_delivered:
        typeof (data.delivered_quantity * data.price_per_unit) === 'number'
          ? data.delivered_quantity * data.price_per_unit
          : '-',
      product: data.product,
    }))

    accumulator.forEach(function (item) {
      const existing = output.filter(function (v, i) {
        return v.order_id === item.order_id
      })
      if (existing.length) {
        const existingIndex = output.indexOf(existing[0])
        output[existingIndex].product = output[existingIndex].product.concat(
          item.product
        )
        output[existingIndex].total = output[existingIndex].total.concat(
          item.total
        )
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
    const finalOrderTransfomer = output.map((data) => ({
      id: data.id,
      order_item_id: data.order_item_id,
      delivery_identifier: data.delivery_identifier,
      delivered_quantity: data.delivered_quantity,
      order_id: data.order_id,
      price_per_unit: data.price_per_unit,
      quantity: data.quantity,
      total: data.total.reduce(reducer),
      total_delivered: isNaN(data.total_delivered.reduce(reducer))
        ? '-'
        : data.total_delivered.reduce(reducer),
      product: data.product,
    }))

    const orderItemsAndCustomer = mergeByOrderId(
      orderAndCustomer,
      finalOrderTransfomer
    )
    // eslint-disable-next-line
    console.log(orderItemsAndCustomer)

    state.orderData = orderItemsAndCustomer
  },
}
