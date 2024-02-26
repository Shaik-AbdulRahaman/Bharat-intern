document.addEventListener("DOMContentLoaded", function() {
    const amountInput = document.getElementById("amount");
    const categoryInput = document.getElementById("category");
    const incomeTypeContainer = document.getElementById("incomeTypeContainer");
    const incomeTypeInput = document.getElementById("incomeType");
    const expenseTypeContainer = document.getElementById("expenseTypeContainer");
    const expenseTypeInput = document.getElementById("expenseType");
    const addTransactionBtn = document.getElementById("addTransaction");
    const transactionList = document.getElementById("transactionList");
    const balanceElement = document.querySelector(".balance");

    let balance = 0;

    categoryInput.addEventListener("change", function() {
        if (categoryInput.value === "income") {
            incomeTypeContainer.classList.remove("hidden");
            expenseTypeContainer.classList.add("hidden");
        } else if (categoryInput.value === "expense") {
            expenseTypeContainer.classList.remove("hidden");
            incomeTypeContainer.classList.add("hidden");
        } else {
            incomeTypeContainer.classList.add("hidden");
            expenseTypeContainer.classList.add("hidden");
        }
    });

    addTransactionBtn.addEventListener("click", function() {
        const amount = parseFloat(amountInput.value);
        const category = categoryInput.value;
        let type = null;

        if (category === "income") {
            type = incomeTypeInput.value;

            if (type === "") {
                alert("Please select an income type.");
                return;
            }
        } else if (category === "expense") {
            type = expenseTypeInput.value;

            if (type === "") {
                alert("Please select an expense type.");
                return;
            }
        }

        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        const transaction = {
            amount: amount,
            category: category,
            type: type,
        };

        updateBalance(transaction);
        addTransactionToList(transaction);
        resetForm();
    });

    function updateBalance(transaction) {
        if (transaction.category === "income") {
            balance += transaction.amount;
        } else {
            balance -= transaction.amount;
        }

        balanceElement.textContent = `Balance: $${balance.toFixed(2)}`;
    }

    function addTransactionToList(transaction) {
        const listItem = document.createElement("li");
        listItem.textContent = `$${transaction.amount.toFixed(2)} (${transaction.category}`;

        if (transaction.type) {
            listItem.textContent += ` - ${transaction.type}`;
        }

        listItem.textContent += `)`;

        if (transaction.category === "income") {
            listItem.classList.add("income");
        } else {
            listItem.classList.add("expense");
        }

        transactionList.appendChild(listItem);
    }

    function resetForm() {
        amountInput.value = "";
        categoryInput.value = "income";
        incomeTypeInput.value = "";
        expenseTypeInput.value = "";
        incomeTypeContainer.classList.add("hidden");
        expenseTypeContainer.classList.add("hidden");
    }
});
