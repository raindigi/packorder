const order = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'order',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      order_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      customer_id: {
        type: DataTypes.STRING(1234),
        allowNull: false,
      },
    },
    {},
  );
  Order.associate = function (models) {
    Order.hasMany(models.OrderItem, {
      foreignKey: 'order_id',
      as: 'OrderItem',
    });
  };

  return Order;
};

module.exports = order;
