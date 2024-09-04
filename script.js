document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (response.ok) {
            window.location.href = '/dashboard';
        } else {
            alert('Login failed');
        }
    })
    .catch(error => console.error('Error:', error));
});

document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/expenses')
    .then(response => response.json())
    .then(data => {
        data.forEach(expense => {
            addExpenseToList(expense);
            updateTotal(expense.amount);
        });
    });
});

function addExpenseToList(expense) {
    const expenseList = document.getElementById('expense-list');
    const expenseItem = document.createElement('li');
    expenseItem.innerHTML = `${expense.category}: $${expense.amount.toFixed(2)} (${expense.description})`;
    expenseList.appendChild(expenseItem);
}

function updateTotal(amount) {
    const totalAmountElement = document.getElementById('total-amount');
    const currentTotal = parseFloat(totalAmountElement.textContent);
    const newTotal = currentTotal + amount;
    totalAmountElement.textContent = newTotal.toFixed(2);
}
