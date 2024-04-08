module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    'Booking',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  //Declare realation
  Booking.associate = models => {
    Booking.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    Booking.hasMany(models.Bookingdetail, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Booking;
};
