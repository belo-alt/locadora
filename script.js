
 // script.js

let clients = [];

function addClient() {
    const name = document.getElementById('clientName').value;
    const reference = document.getElementById('clientReference').value;

    if (name && reference) {
        const client = {
            id: Date.now(),
            name,
            reference,
            loans: []
        };
        clients.push(client);
        updateClientSelect();
        displayClients();
        document.getElementById('clientName').value = '';
        document.getElementById('clientReference').value = '';
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function updateClientSelect() {
    const clientSelect = document.getElementById('clientSelect');
    clientSelect.innerHTML = '';
    clients.forEach(client => {
        const option = document.createElement('option');
        option.value = client.id;
        option.textContent = client.name;
        clientSelect.appendChild(option);
    });
}

function addLoan() {
    const clientId = document.getElementById('clientSelect').value;
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const loanDate = document.getElementById('loanDate').value;
    const paymentDate = document.getElementById('paymentDate').value;

    if (clientId && loanAmount && interestRate && loanDate && paymentDate) {
        const loan = {
            id: Date.now(),
            amount: loanAmount,
            interestRate,
            loanDate,
            paymentDate,
            totalAmount: loanAmount + (loanAmount * (interestRate / 100))
        };

        const client = clients.find(client => client.id == clientId);
        client.loans.push(loan);
        displayClients();
        document.getElementById('loanAmount').value = '';
        document.getElementById('interestRate').value = '';
        document.getElementById('loanDate').value = '';
        document.getElementById('paymentDate').value = '';
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function displayClients() {
    const clientsContainer = document.getElementById('clientsContainer');
    clientsContainer.innerHTML = '';

    clients.forEach(client => {
        const clientDiv = document.createElement('div');
        clientDiv.classList.add('client');
        clientDiv.innerHTML = `<h3>${client.name} (${client.reference})</h3>`;
        clientDiv.innerHTML += `<button onclick="deleteClient(${client.id})">Excluir Cliente</button>`;

        client.loans.forEach(loan => {
            const loanDiv = document.createElement('div');
            loanDiv.classList.add('loan');
            loanDiv.innerHTML = `
                <p>Valor: R$${loan.amount.toFixed(2)}</p>
                <p>Taxa de Juros: ${loan.interestRate}%</p>
                <p>Data do Empréstimo: ${loan.loanDate}</p>
                <p>Data do Pagamento: ${loan.paymentDate}</p>
                <p>Total com Juros: R$${loan.totalAmount.toFixed(2)}</p>
                <button onclick="deleteLoan(${client.id}, ${loan.id})">Excluir Empréstimo</button>
            `;
            clientDiv.appendChild(loanDiv);
        });

        clientsContainer.appendChild(clientDiv);
    });
}

function deleteClient(clientId) {
    clients = clients.filter(client => client.id !== clientId);
    updateClientSelect();
    displayClients();
}

function deleteLoan(clientId, loanId) {
    const client = clients.find(client => client.id == clientId);
    client.loans = client.loans.filter(loan => loan.id !== loanId);
    displayClients();
}

function searchClient() {
    const searchName = document.getElementById('searchClientName').value.toLowerCase();
    const clientsContainer = document.getElementById('clientsContainer');
    clientsContainer.innerHTML = '';

    clients.filter(client => client.name.toLowerCase().includes(searchName)).forEach(client => {
        const clientDiv = document.createElement('div');
        clientDiv.classList.add('client');
        clientDiv.innerHTML = `<h3>${client.name} (${client.reference})</h3>`;

        client.loans.forEach(loan => {
            const loanDiv = document.createElement('div');
            loanDiv.classList.add('loan');
            loanDiv.innerHTML = `
                <p>Valor: R$${loan.amount.toFixed(2)}</p>
                <p>Taxa de Juros: ${loan.interestRate}%</p>
                <p>Data do Empréstimo: ${loan.loanDate}</p>
                <p>Data do Pagamento: ${loan.paymentDate}</p>
                <p>Total com Juros: R$${loan.totalAmount.toFixed(2)}</p>
            `;
            clientDiv.appendChild(loanDiv);
        });

        clientsContainer.appendChild(clientDiv);
    });
}






