const db = require('./models');

async function addExpense() {
    await db.Expense.create({
        amount: 50.00,
        category: 'Food',
        description: 'Lunch',
        date: new Date()
    });
}

addExpense();
