module.exports = (sequelize, DataTypes) => {
    const Expense = sequelize.define('Expense', {
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        category: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
        date: {
            type: DataTypes.DATE
        }
    });
    return Expense;
};
