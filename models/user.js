const Sequelize = require('sequelize');

const sequelize = new Sequelize('Expense-Tracker', 'root', 'MYSQL', {
  host: 'localhost',
  dialect: 'mysql'
});

const User = sequelize.define('User', {
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  created_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  updated_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
});

sequelize.sync({ alter: true }) 
  .then(() => {
    console.log('User model synced successfully');
  })
  .catch(err => {
    console.error('Error syncing user model:', err);
  });

module.exports = User;

