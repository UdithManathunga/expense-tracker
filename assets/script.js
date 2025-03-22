let balance = 0;
const balanceElement = document.getElementById("balance");
const transactionList = document.getElementById("transaction-list");

function addTransaction() {
    const desc = document.getElementById("desc").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const type = document.getElementById("type").value;

    if (desc === "" || isNaN(amount)) {
        alert("Please enter valid details.");
        return;
    }

    // Update balance
    balance += type === "income" ? amount : -amount;
    balanceElement.innerText = balance;

    // Create transaction entry
    const li = document.createElement("li");
    li.innerHTML = `${desc} <span>${type === "income" ? "+" : "-"}$${amount}</span> 
                    <button onclick="deleteTransaction(this, ${amount}, '${type}')">❌</button>`;
    transactionList.appendChild(li);

    // Clear input fields
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
}

function deleteTransaction(element, amount, type) {
    // Update balance when deleting
    balance -= type === "income" ? amount : -amount;
    balanceElement.innerText = balance;

    // Remove transaction from UI
    element.parentElement.remove();
}
