// I used vuex to try and consolidate state as much as possible
export const state = () => ({
  orderData: [],
  customerData: [],
  companyData: [],
  deliveryData: [],
  tableData: [],
})

export const getters = {}

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
    const orderItemsAndCustomer = mergeByOrderId(
      orderAndCustomer,
      orderAndDelivery
    )

    // eslint-disable-next-line
    console.log(orderItemsAndCustomer)

    state.orderData = data
    state.companyData = data
    state.customerData = data
    state.deliveryData = data
  },
}
