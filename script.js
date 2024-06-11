document.getElementById('client-form').addEventListener('submit', addClient);
document.getElementById('show-clients').addEventListener('click', displayClients);
document.getElementById('search-button').addEventListener('click', searchClient);

let clients = [];

function addClient(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const reference = document.getElementById('reference').value;
    const phone = document.getElementById('phone').value;
    const loanValue = parseFloat(document.getElementById('loan-value').value);
    const interestRate = parseFloat(document.getElementById('interest-rate').value);
    const loanDate = document.getElementById('loan-date').value;
    const paymentDate = document.getElementById('payment-date').value;

    const client = {
        id: Date.now(),
        name,
        reference,
        phone,
        loans: [
            {
                loanValue,
                interestRate,
                loanDate,
                paymentDate,
                totalValue: loanValue + (loanValue * (interestRate / 100))
            }
        ]
    };

    clients.push(client);
    document.getElementById('client-form').reset();
    displayClients();
}

function displayClients() {
    const clientList = document.getElementById('client-list');
    clientList.innerHTML = '';

    clients.forEach(client => {
        const clientDiv = document.createElement('div');
        clientDiv.className = 'client';

        const today = new Date().toISOString().split('T')[0];
        const isLate = new Date(today) >= new Date(client.loans[0].paymentDate);

        clientDiv.innerHTML = `
            <h2 class="${isLate ? 'late' : ''}">${client.name}</h2>
            <p>Referência: ${client.reference}</p>
            <p>Telefone: ${client.phone}</p>
            <button onclick="newLoan(${client.id})">Novo Empréstimo</button>
        `;

        client.loans.forEach(loan => {
            const loanDiv = document.createElement('div');
            loanDiv.className = 'loan';
            loanDiv.innerHTML = `
                <p>Valor do Empréstimo: R$ ${loan.loanValue.toFixed(2)}</p>
                <p>Taxa de Juros: ${loan.interestRate}%</p>
                <p>Data do Empréstimo: ${loan.loanDate}</p>
                <p>Data do Pagamento: ${loan.paymentDate}</p>
                <p>Valor Total (com Juros): R$ ${loan.totalValue.toFixed(2)}</p>
            `;
            clientDiv.appendChild(loanDiv);
        });

        clientList.appendChild(clientDiv);
    });
}

function newLoan(clientId) {
    const loanValue = parseFloat(prompt('Valor do Empréstimo:'));
    const interestRate = parseFloat(prompt('Taxa de Juros (%):'));
    const loanDate = prompt('Data do Empréstimo (aaaa-mm-dd):');
    const paymentDate = prompt('Data do Pagamento (aaaa-mm-dd):');

    const client = clients.find(client => client.id === clientId);

    if (client) {
        const newLoan = {
            loanValue,
            interestRate,
            loanDate,
            paymentDate,
            totalValue: loanValue + (loanValue * (interestRate / 100))
        };
        client.loans.push(newLoan);
        displayClients();
    }
}

function searchClient() {
    const searchName = document.getElementById('search-name').value.toLowerCase();
    const clientList = document.getElementById('client-list');
    clientList.innerHTML = '';

    const filteredClients = clients.filter(client => client.name.toLowerCase().includes(searchName));

    filteredClients.forEach(client => {
        const clientDiv = document.createElement('div');
        clientDiv.className = 'client';

        const today = new Date().toISOString().split('T')[0];
        const isLate = new Date(today) >= new Date(client.loans[0].paymentDate);

        clientDiv.innerHTML = `
            <h2 class="${isLate ? 'late' : ''}">${client.name}</h2>
            <p>Referência: ${client.reference}</p>
            <p>Telefone: ${client.phone}</p>
            <button onclick="newLoan(${client.id})">Novo Empréstimo</button>
        `;

        client.loans.forEach(loan => {
            const loanDiv = document.createElement('div');
            loanDiv.className = 'loan';
            loanDiv.innerHTML = `
                <p>Valor do Empréstimo: R$ ${loan.loanValue.toFixed(2)}</p>
                <p>Taxa de Juros: ${loan.interestRate}%</p>
                <p>Data do Empréstimo: ${loan.loanDate}</p>
                <p>Data do Pagamento: ${loan.paymentDate}</p>
                <p>Valor Total (com Juros): R$ ${loan.totalValue.toFixed(2)}</p>
            `;
            clientDiv.appendChild(loanDiv);
        });

        clientList.appendChild(clientDiv);
    });
}



