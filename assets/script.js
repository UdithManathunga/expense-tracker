let balance = 0;
const balanceElement = document.getElementById("balance");
const transactionList = document.getElementById("transaction-list");

document.addEventListener("DOMContentLoaded", loadTransactions);

function addTransaction() {
    const desc = document.getElementById("desc").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const date = document.getElementById("date").value;  // 📅 Get selected date
    const type = document.getElementById("type").value;

    if (desc === "" || isNaN(amount) || date === "") {
        alert("Please enter valid details.");
        return;
    }

    const transaction = {
        id: Date.now(),
        desc,
        amount,
        date,  // 📅 Store the selected date
        type
    };

    saveTransaction(transaction);
    renderTransaction(transaction);
    updateBalance();

    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("date").value = "";  // 📅 Clear date input
}

function saveTransaction(transaction) {
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function loadTransactions() {
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.forEach(renderTransaction);
    updateBalance();
}

function renderTransaction(transaction) {
    const li = document.createElement("li");
    li.innerHTML = `${transaction.desc} <span>${transaction.type === "income" ? "+" : "-"}$${transaction.amount}</span> 
                    <small>${transaction.date}</small> <!-- 📅 Show Date -->
                    <button onclick="deleteTransaction(${transaction.id})">❌</button>`;
    li.setAttribute("data-id", transaction.id);
    transactionList.appendChild(li);
}

function updateBalance() {
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    balance = transactions.reduce((total, trans) => {
        return trans.type === "income" ? total + trans.amount : total - trans.amount;
    }, 0);
    balanceElement.innerText = balance;
}

function deleteTransaction(id) {
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions = transactions.filter(trans => trans.id !== id);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    document.querySelector(`[data-id="${id}"]`).remove();
    updateBalance();
}
