const orderItem = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    'orderItem',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price_per_unit: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product: {
        type: DataTypes.STRING(1234),
        allowNull: false,
      },
    },
    {},
  );
  OrderItem.associate = (models) => {
    OrderItem.hasMany(models.Delivery, { foreignKey: 'order_item_id', as: 'Delivery' });
    OrderItem.belongsTo(models.Order, { foreignKey: 'order_id', as: 'Order' });
  };
  return OrderItem;
};

module.exports = orderItem;
