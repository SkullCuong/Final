module.exports = (sequelize, DataTypes) => {
  const BookingDetail = sequelize.define(
    "BookingDetail",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      order_check_in: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      order_check_out: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      check_in: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      check_out: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );

  //Declare realation
  BookingDetail.associate = (models) => {
    BookingDetail.belongsTo(models.Booking, {
      foreignKey: {
        allowNull: false,
      },
    });
    BookingDetail.belongsTo(models.Room, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return BookingDetail;
};
