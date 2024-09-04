const Sequelize = require('sequelize');
const User = require('./user'); 
const PaymentMethod = require('./payment'); 
const Category = require('./category'); 

const sequelize = new Sequelize('Expense-Tracker', 'root', 'MYSQL', {
  host: 'localhost',
  dialect: 'mysql',
  logging: (sql, queryTime) => {
    console.log(`[Sequelize]: ${sql}`); 
  },
});


const Budget = sequelize.define('Budget', {
  budget_id: {
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
  category_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'category_id'
    }
  },
  amount: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  start_date: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  end_date: {
    type: Sequelize.DATEONLY,
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

Budget.belongsTo(User, { foreignKey: 'user_id' });
Budget.belongsTo(Category, { foreignKey: 'category_id' });

sequelize.sync({ alter: true }) 
  .then(() => {
    console.log('Budget model synced successfully');
  })
  .catch(err => {
    console.error('Error syncing Budget model:', err);
  });

module.exports = Budget;