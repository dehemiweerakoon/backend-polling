module.exports = (sequelize, Sequelize) => {
    const Poll = sequelize.define("poll", {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false, // lowercase `allowNull`
          primaryKey: true, 
          autoIncrement: true// lowercase `primaryKey`
        },
        text: {
          type: Sequelize.STRING,
          allowNull:false
        },
      });
      return Poll;
};
