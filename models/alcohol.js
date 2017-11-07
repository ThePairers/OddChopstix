module.exports = function(sequelize, DataTypes) {
  var Alcohol = sequelize.define("Alcohol", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        len: [1]
      }
    },
    alc_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    alc_photo: {
      type: DataTypes.STRING
    }
  });
  return Alcohol;
};
