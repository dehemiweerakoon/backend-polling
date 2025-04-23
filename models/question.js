module.exports = (sequelize,Sequelize)=>{
  const Question = sequelize.define("questions", {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,       // lowercase `allowNull`
      primaryKey: true,
      autoIncrement: true     // lowercase `primaryKey`
    },
    question: {
      type: Sequelize.STRING,
    },
    count:{
      type : Sequelize.INTEGER,
    }
  });
  return Question;
}
