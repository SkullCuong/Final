module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  //Declare realation

  Role.associate = (models) => {
    Role.hasMany(models.Staff, {
      foreignKey: {
        allowNull: false,
      },
    });
    Role.hasMany(models.Guest, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Role;
};
