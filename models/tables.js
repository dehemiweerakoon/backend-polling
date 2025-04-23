const  Sequelize = require('sequelize');

const sequelize = new Sequelize(
    "polling_system","root","2001",{
    HOST : "localhost",
    dialect :"mysql",
    operatorAlliases:true
}
);

const db ={} // connect to the databases ...

db.sequelize = sequelize;
db.Sequelize =Sequelize;

db.poll = require('./poll')(sequelize,Sequelize); // db.poll
db.Question = require('./question')(sequelize,Sequelize); //db.Question..

db.poll.hasMany(db.Question);
db.Question.belongsTo(db.poll);

module.exports = db;

