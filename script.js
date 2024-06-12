let clients = [];

function addClient() {
  const name = document.getElementById('name').value;
  const reference = document.getElementById('reference').value;
  const phone = document.getElementById('phone').value;
  const loanAmount = parseFloat(document.getElementById('loanAmount').value);
  const interestRate = parseFloat(document.getElementById('interestRate').value);
  const loanDate = document.getElementById('loanDate').value;
  const paymentDate = document.getElementById('paymentDate').value;

  const client = {
    name,
    reference,
    phone,
    loanAmount,
    interestRate,
    loanDate,
    paymentDate,
    loans: []
  };

  clients.push(client);
  updateClientList();
}

function updateClientList() {
  const listElement = document.getElementById('clients');
  listElement.innerHTML = '';

  clients.forEach(client => {
    const listItem = document.createElement('li');

    const clientInfo = document.createElement('div');
    clientInfo.textContent = `${client.name} - ${client.reference} - ${client.phone}`;
    listItem.appendChild(clientInfo);

    const loanInfo = document.createElement('div');
    client.loans.forEach(loan => {
      const loanAmountWithInterest = loan.amount * (1 + loan.interestRate / 100);
      const loanItem = document.createElement('p');
      loanItem.textContent = `Empréstimo: ${loan.amount} + Juros: ${loanAmountWithInterest.toFixed(2)} - Data: ${loan.date}`;
      loanInfo.appendChild(loanItem);
    });
    listItem.appendChild(loanInfo);

    if (new Date(client.paymentDate) <= new Date()) {
      listItem.classList.add('red');
    }

    const newLoanButton = document.createElement('button');
    newLoanButton.textContent = 'Novo Empréstimo';
    newLoanButton.onclick = () => addLoan(client);
    listItem.appendChild(newLoanButton);

    listElement.appendChild(listItem);
  });
}

function addLoan(client) {
  const amount = parseFloat(prompt('Valor do Empréstimo:'));
  const interestRate = parseFloat(prompt('Taxa de Juros (%):'));
  const date = prompt('Data do Empréstimo:');

  client.loans.push({ amount, interestRate, date });
  updateClientList();
}

function searchClient() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const filteredClients = clients.filter(client => client.name.toLowerCase().includes(query));
  clients = filteredClients;
  updateClientList();
}



