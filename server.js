
const express = require('express');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const passport = require('passport')


const sequelize = new Sequelize('Expense-Tracker', 'localhost', 'MYSQL', {
    host: 'localhost',
    dialect: 'mysql'
  });

const User = require('./models/user');
const Expense = require('./models/expense');
const Category = require('./models/category');
const PaymentMethod = require('./models/payment');
const Budget = require('./models/budget');



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      
      const newUser = await User.create({
        username,
        email,
        password: await bcrypt.hash(password, 10) 
      });
  
     
      res.status(201).json({
        message: 'User registered successfully',
        user: newUser
      });
    } catch (err) {
      console.error('Error registering user:', err);
      res.status(500).json({
        error: 'Failed to register user'
      });
    }
  });


app.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true,
}));
app.get('/expenses', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send('Not authenticated');
    }
    const expenses = await Expense.findAll({ where: { userId: req.user.id } });
    res.json(expenses);
});


app.post('/expenses', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send('Not authenticated');
    }
    const { amount, category, description, date } = req.body;
    try {
        const expense = await Expense.create({
            amount,
            category,
            description,
            date,
            userId: req.user.id,
        });
        res.status(201).json(expense);
    } catch (err) {
        res.status(500).send('Error adding expense');
    }
});

const PORT=3000

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
