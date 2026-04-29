// Select elements
const navExpenses = document.getElementById('navExpenses');
const navSummary = document.getElementById('navSummary');
const expensesPage = document.getElementById('expensesPage');
const summaryPage = document.getElementById('summaryPage');
const expenseForm = document.getElementById('expenseForm');

const totalExpenseElem = document.getElementById('totalExpense');
const membersCountElem = document.getElementById('membersCount');
const perPersonAmountElem = document.getElementById('perPersonAmount');
const debtList = document.getElementById('debtList');


const expenseTypes = [
    'Select Expense Type',
    '🍽️Food & Dining',
    '🚗Travel / Transport',
    '🏤Hotel / Stay',
    '🎟️Tickets / Entery Fees',
    '🛒Shopping',
    '📸Entertainment',
    '🚕Cab / Auto',
    '⛽Fuel',
    '🎢Activities / Adventures',
    '💊Emergency / Medical',
    '📦Other'
  ];
  
// Show Expenses page by default
function showExpensesPage() {
    expensesPage.style.display = 'block';
    summaryPage.style.display = 'none';
    navExpenses.classList.add('active');
    navSummary.classList.remove('active');
}

function showSummaryPage() {
    expensesPage.style.display = 'none';
    summaryPage.style.display = 'block';
    navExpenses.classList.remove('active');
    navSummary.classList.add('active');
}

// Navigation event handlers
navExpenses.addEventListener('click', (e) => {
    e.preventDefault();
    showExpensesPage();
});

navSummary.addEventListener('click', (e) => {
    e.preventDefault();
    showSummaryPage();
});

// Expense form submit handler
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const totalAmount = parseFloat(expenseForm.totalAmount.value);
    if (isNaN(totalAmount) || totalAmount <= 0) {
        alert('Please enter a valid total expense amount.');
        return;
    }

    // Collect member names from paid by fields (avoid empty)
    const paidBy = [];
    for (let i = 1; i <= 4; i++) {
        const name = expenseForm[`paidBy${i}`].value.trim();
        const type = expenseForm[`description${i}`].value;
        // Only consider if both type and name present
        if (name && type) {
            paidBy.push(name);
        }
    }

    // Collect member names from member name 1 input - add more member inputs as needed in extension
    const memberNames = [];

    if (expenseForm.member1.value.trim() !== '') {
        memberNames.push(expenseForm.member1.value.trim());
    }

    // To simplify, assume members who paid or are in split are all memberNames
    paidBy.forEach(name => {
        if (!memberNames.includes(name)) {
            memberNames.push(name);
        }
    });

    // For this demo, simulate debts based on members for summary page
    // We will assume some debts for display (static for demo)
    // Calculate per person expense
    const perPerson = totalAmount / memberNames.length || 0;

    // Prepare output
    totalExpenseElem.textContent = `₹${totalAmount.toFixed(2)}`;
    membersCountElem.textContent = memberNames.length;
    perPersonAmountElem.textContent = `₹${perPerson.toFixed(2)}`;

    // Example debt calculation (for demo, static): List member 1 owes member 2 ₹500, member 3 owes member 1 ₹300
    debtList.innerHTML = '';

    // Generate debts for demo - checking members count to assign example debts
    if (memberNames.length >= 2) {
        debtList.appendChild(createDebtItem(memberNames[0], memberNames[1], 500));
    }
    if (memberNames.length >= 3) {
        debtList.appendChild(createDebtItem(memberNames[2], memberNames[0], 300));
    }

    // Switch to summary page after adding
    showSummaryPage();
});

function createDebtItem(debtor, creditor, amount) {
    const div = document.createElement('div');
    div.className = 'debt-item';

    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('aria-hidden', 'true');
    icon.setAttribute('focusable', 'false');
    icon.setAttribute('width', '24');
    icon.setAttribute('height', '24');
    icon.setAttribute('viewBox', '0 0 24 24');
    icon.setAttribute('fill', '#000');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zM2 20v-2c0-2.21 3.58-4 8-4s8 1.79 8 4v2H2z');
    icon.appendChild(path);

    const textSpan = document.createElement('span');
    textSpan.className = 'debt-text';
    textSpan.textContent = `${debtor} owes ${creditor}`;

    const amountSpan = document.createElement('span');
    amountSpan.className = 'debt-amount';
    amountSpan.textContent = `₹${amount}`;

    div.appendChild(icon);
    div.appendChild(textSpan);
    div.appendChild(amountSpan);

    return div;
}