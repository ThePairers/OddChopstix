module.exports = function(sequelize, DataTypes) {
  var Pairing = sequelize.define("Pairing", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      validate: {
        len: [1]
      }
    },
    alc_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    food_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    rating: {
      type: DataTypes.INTEGER,
    },
    review: {
      type: DataTypes.STRING,
    },
    review_date: {
      type: DataTypes.DATE
    }
  });
  return Pairing;
};
