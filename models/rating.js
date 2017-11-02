module.exports = function(sequelize, DataTypes) {
  var Rating = sequelize.define("Rating", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      validate: {
        len: [1]
      }
    },
    pair_id: {
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
  return Rating;
};
