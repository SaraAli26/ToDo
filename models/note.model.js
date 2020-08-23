
const Sequelize = require("sequelize");

const sequelize = new Sequelize('todoappdb', 'root', '12345aA*', {
    host: 'localhost',
    dialect: 'mysql', 
     pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
  
  sequelize.authenticate().then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });



const Note = sequelize.define('notes', {
    Title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Body: {
      type: Sequelize.STRING,
      allowNull: false
    },
    deadlinedate: {
      type: Sequelize.DATE,
      allowNull: false
    }
    ,
    Image: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: false
});
 
module.exports = Note;