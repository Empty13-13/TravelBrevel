let dataStatistic = {
  "ticketsFound": 1300,
  "boughtTickets": 100,
  "savingsPurchasedTickets": 1000000,
  "satisfiedCustomers": 1
}
let url = `https://tb.vps.webdock.io/api/info/statistic_useful`

replaceData();

async function replaceData() {
  try {
    const ticketsFound = await document.querySelectorAll('#ticketsFound')[0]
    const boughtTickets = await document.querySelectorAll('#boughtTickets')[0]
    const savingsPurchased_tickets = await document.querySelectorAll('#savingsPurchased_tickets')[0]
    const satisfiedCustomers = await document.querySelectorAll('#satisfiedCustomers')[0]

    const dataStatistic = await fetchData(url)

    ticketsFound.innerHTML = dataStatistic.ticketsFound.toLocaleString();
    boughtTickets.innerHTML = dataStatistic.boughtTickets.toLocaleString();
    savingsPurchased_tickets.innerHTML = dataStatistic.savingsPurchasedTickets.toLocaleString() + " ₽";
    satisfiedCustomers.innerHTML = dataStatistic.satisfiedCustomers.toLocaleString();

  } catch (error) {
    console.error(error);
  } finally {
    console.log(`Запрос завершен`);
  }
}

