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

    const mergeByOrderId = (customerData, orderItemData) =>
      orderItemData.map((itm) => ({
        ...customerData.find((item) => item.id === itm.order_id && item),
        ...itm,
      }))

    const customerData = mergeById(data.customer, data.customer_company)

    const orderAndCustomer = mergeByCustomerId(data.orders, customerData)

    const orderAndDelivery = mergeDeliveryAndOrderItem(
      data.orderItems,
      data.deliveries
    )

    const nullRemover = orderAndDelivery.map((data) => ({
      id: data.id,
      order_item_id: data.order_item_id,
      delivery_identifier: data.delivery_identifier,
      delivered_quantity:
        data.delivered_quantity === undefined ? 0 : data.price_per_unit,
      order_id: data.order_id,
      price_per_unit: data.price_per_unit === null ? 0 : data.price_per_unit,
      quantity: data.quantity,
      total:
        data.price_per_unit === null
          ? '-'
          : Math.abs(data.quantity * data.price_per_unit),
      total_delivered:
        data.delivered_quantity === undefined
          ? 0
          : data.delivered_quantity * data.price_per_unit,
      product: data.product,
    }))

    const orderTransfomer = nullRemover.map((data) => ({
      id: data.id,
      order_item_id: data.order_item_id,
      delivery_identifier: data.delivery_identifier,
      delivered_quantity: data.delivered_quantity,
      order_id: data.order_id,
      price_per_unit: data.price_per_unit,
      quantity: data.quantity,
      total: data.total,
      total_delivered: data.total_delivered,
      product: data.product,
    }))

    const orderItemsAndCustomer = mergeByOrderId(
      orderAndCustomer,
      orderTransfomer
    )
    // eslint-disable-next-line
    console.log(orderItemsAndCustomer)

    state.orderData = orderItemsAndCustomer
  },
}
