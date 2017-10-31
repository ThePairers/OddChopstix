module.exports = function(sequelize, DataTypes) {
  var Food = sequelize.define("Food", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    food_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    food_photo: {
      type: DataTypes.STRING
    },
    food_description: {
      type: DataTypes.STRING
    }
  });
  return Food;
};
