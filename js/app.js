let insertBudget = document.getElementById('budget-input');
let submitBtn = document.getElementById('budget-submit');
let errorFeedback = document.querySelector('.budget-feedback');
let totalBudget = document.getElementById('budget-amount')
let totalBalance = document.getElementById('balance-amount');
let totalExpenses = document.getElementById('expense-amount');
let expensesInput = document.getElementById('amount-input');
let expensesBtn = document.getElementById('expense-submit');
let expensesTable = document.querySelector('.table');
let expenseTitle = document.querySelector('.expense-input');
let expenseArray = [];
let rowIndex = 0;
function createTable() {
    return `<table class = 'table table1'>
        <thead>
         <tr>
          <td> Expense title</td>
          <td> Expense value</td>
          </tr>
        </thead>
        <tbody class="tableBody"></tbody>
    </table>`
}

function countBudget() {
    let budget = insertBudget.value;
    let amount = parseInt(budget);
    if (budget === "") {
        showErrorEmptyInput();
    } else {
        if (amount < 0) {
            showNegativeAmount();
        } else {
            totalBudget.innerText = amount;
            totalBalance.innerText = amount;
            recalculateBalance(amount);
            hideErrorFeedback()
        }
    }
}
function recalculateBalance(amount) {
    if (totalExpenses.innerText !== "") {
        console.log(totalExpenses.innerText);

        let expense = parseInt(totalExpenses.innerText);
        totalBalance.innerText = amount - expense;
    }
}


function showNegativeAmount() {
    errorFeedback.style.display = 'block';
    errorFeedback.innerText = 'Value can not be empty or negative.';
}

function showErrorEmptyInput() {
    console.log("emptyInput");
    errorFeedback.style.display = 'block';
    errorFeedback.innerText = 'Value can not be empty or negative.';
}

function hideErrorFeedback() {
    errorFeedback.style.display = 'none';
}


function placeBudget() {
    document.getElementById('budget-amount').value = budget;
}

submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    countBudget();
});

class Expense {
    constructor(title, amount) {
        this.title = title;
        this.expense = amount;

    }
}

function insertExpense() {
    let budget = insertBudget.value;
    let budgetAmount = parseInt(budget);
    let expense = expensesInput.value;
    if (expense === "" || expenseTitle.value === "") {
        return;
    }
    let parseExpense = parseInt(expense);
    let currentBalance = parseInt(totalBalance.innerText)
    let currentExpenses = parseInt(totalExpenses.innerText)

    totalBalance.innerText = currentBalance - parseExpense;
    totalExpenses.innerText = currentExpenses + parseExpense;

    if (expenseArray.length === 0) {
        expensesTable.innerHTML = createTable();
    }
    let length = expenseArray.length;
    let table = document.querySelector('.tableBody');
    let inputExpense = new Expense(expenseTitle.value, parseExpense);
    expenseArray.push(inputExpense);
    table.innerHTML += createExpensesRow(rowIndex, inputExpense);
    clearExpenseInput();
    rowIndex++;
}


function clearExpenseInput() {
    expenseTitle.value = "";
    expensesInput.value = "";
}


function createExpensesRow(rowId, expense) {
    return `<tr id = "${rowId}">
        <td>${expense.title}</td>
        <td>${expense.expense}</td>
        <td><i class="fas fa-edit" onclick="editExpense(${rowId}, '${expense.title}', ${expense.expense})"></i></td>
        <td><i class="fas fa-trash" onclick="deleteExpense(${rowId},  '${expense.title}', ${expense.expense})"></i></td>
      </tr>`;
}

function editExpense(rowId, expenseTitleText, expenseValue) {
    expenseTitle.value = expenseTitleText;
    expensesInput.value = expenseValue;
    deleteExpense(rowId, expenseTitleText, expenseValue);
}

function deleteExpense(rowId,  expenseTitleText, expenseValue) {
    console.log("delete row id : " + rowId);
    console.log("amount to remove: " + expenseTitleText);
    let row = document.getElementById(rowId);
    row.remove();

    expenseArray.splice(rowId);
    updateExpensesAndBalance(expenseValue)
}
function updateExpensesAndBalance(amountToSubtract) {
    console.log("amount to remove: " + amountToSubtract);
    
    let balance = parseInt(totalBalance.innerText);
    console.log("balance: " + balance);
    
    let currentExpenses = parseInt(totalExpenses.innerText);
    console.log("exp: " + currentExpenses);
    
    let newBalance = balance + amountToSubtract;
    let newExpenses = currentExpenses - amountToSubtract;

    totalExpenses.innerText = newExpenses;
    totalBalance.innerText = newBalance;
}

expensesBtn.addEventListener('click', (event) => {
    event.preventDefault();
    insertExpense();
});

