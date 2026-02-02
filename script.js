const dashboardBtn = document.querySelector("#Dashboard_button");
const addExpenseBtn = document.querySelector("#add_expense_button");
const historyBtn = document.querySelector("#expense_history_button");
const settingsBtn = document.querySelector("#settings_button");


const dashboardSection = document.querySelector(".Dashboard");
const addExpenseSection = document.querySelector("#addExpense");
const historySection = document.querySelector("#history");
const settingsSection = document.querySelector("#settings");
const categoriesDisplay = document.querySelector(".Categories");


dashboardBtn.addEventListener("click", () => {
    dashboardSection.classList.remove("hidden");
    addExpenseSection.classList.add("hidden");
    addExpenseSection.classList.remove("addExpense");
    historySection.classList.add("hidden");
    historySection.classList.remove("history");
    settingsSection.classList.add("hidden");
    settingsSection.classList.remove("settings");
});

addExpenseBtn.addEventListener("click", () => {
    addExpenseSection.classList.remove("hidden");
    addExpenseSection.classList.add("addExpense");
    dashboardSection.classList.add("hidden");
    historySection.classList.add("hidden");
    historySection.classList.remove("history");
    settingsSection.classList.add("hidden");
    settingsSection.classList.remove("settings");
});

historyBtn.addEventListener("click", () => {
    addExpenseSection.classList.add("hidden");
    addExpenseSection.classList.remove("addExpense");
    dashboardSection.classList.add("hidden");
    historySection.classList.remove("hidden");
    historySection.classList.add("history");
    settingsSection.classList.add("hidden");
    settingsSection.classList.remove("settings");
});

settingsBtn.addEventListener("click", () => {
    addExpenseSection.classList.add("hidden");
    addExpenseSection.classList.remove("addExpense");
    dashboardSection.classList.add("hidden");
    historySection.classList.remove("history");
    historySection.classList.add("hidden");
    settingsSection.classList.add("settings");
    settingsSection.classList.remove("hidden");
});


const form = document.querySelector(".expense-form");
const titleInput = document.querySelector("#title");
const amountInput = document.querySelector("#amount");
const categoryInput = document.querySelector("#category");
const dateInput = document.querySelector("#date");

const transactionNumber = document.querySelector(".transaction_number");
const totalSpent = document.querySelector(".total_spent");
const historyContainer = document.querySelector(".expense_outer2");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const expense = {
        id: Date.now(),
        title: titleInput.value,
        amount: Number(amountInput.value),
        category: categoryInput.value,
        date: dateInput.value
    };

    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    form.reset();

    updateDashboard();
    renderHistory();
});


function updateDashboard() {
    transactionNumber.textContent = expenses.length;

    let total = 0;
    const categoryTotals = {};

    expenses.forEach(exp => {
        total += exp.amount;

        if (categoryTotals[exp.category]) {
            categoryTotals[exp.category] += exp.amount;
        } else {
            categoryTotals[exp.category] = exp.amount;
        }
    });

    totalSpent.textContent = `₹${total}`;

    categoriesDisplay.innerHTML = "";

    for (let category in categoryTotals) {
        const p = document.createElement("p");
        p.textContent = `${category}: ₹${categoryTotals[category]}`;
        categoriesDisplay.appendChild(p);
    }
}


function renderHistory() {
    historyContainer.innerHTML = "";

    expenses.forEach(exp => {
        const div = document.createElement("div");
        div.classList.add("expense_data");

        div.innerHTML = `
            <strong>${exp.title}</strong><br>
            Date: ${exp.date}<br>
            Category: ${exp.category}<br>
            Amount: ₹${exp.amount}
        `;

        historyContainer.appendChild(div);
    });
}


document.querySelector("#reset_all_data").addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all expenses?")) {
        localStorage.removeItem("expenses");
        expenses = [];
        updateDashboard();
        renderHistory();
    }
});

updateDashboard();
renderHistory();