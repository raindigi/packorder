const order = (sequelize, DataTypes) => {
  const Orders = sequelize.define('post', {
    id: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    order_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  return Orders;
};

module.exports = order;
