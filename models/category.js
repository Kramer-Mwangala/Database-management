const Sequelize = require('sequelize');

const User = require('./user'); 

const sequelize = new Sequelize('Expense-Tracker', 'root', 'MYSQL', {
    host: 'localhost',
    dialect: 'mysql'
  });

const Category = sequelize.define('Category', {
  category_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User, 
      key: 'user_id'
    }
  },
  category_name: {
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


Category.belongsTo(User, { foreignKey: 'user_id' });

sequelize.sync({ alter: true }) 
  .then(() => {
    console.log('category model synced successfully');
  })
  .catch(err => {
    console.error('Error syncing category model:', err);
  });



module.exports = Category;