const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'block',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      data: {
        allowNull: false,
        type: DataTypes.JSON,
      },
    },
    {
      timestamps: false,
      underscored: true,
    },
  );
};
