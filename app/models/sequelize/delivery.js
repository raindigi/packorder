module.exports = (sequelize, DataTypes) => {
  const Delivery = sequelize.define('Delivery', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    order_item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    delivered_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Delivery.associate = (models) => {
    Delivery.belongsTo(models.OrderItem, { foreignKey: 'order_item_id', as: 'OrderItem' });
  };
  return Delivery;
};
