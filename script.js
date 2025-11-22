let trades = JSON.parse(localStorage.getItem("trades") || "[]");

function addTrade() {
    let pair = document.getElementById("pair").value;
    let buy = parseFloat(document.getElementById("buyPrice").value);
    let sell = parseFloat(document.getElementById("sellPrice").value);
    let stopLoss = document.getElementById("stopLoss").value;
    let date = document.getElementById("date").value;
    let notes = document.getElementById("notes").value;

    if (!pair || !buy || !sell || !date) return alert("Please fill all fields");

    let pl = (sell - buy).toFixed(2);

    let trade = { pair, buy, sell, pl, date, notes };

    trades.push(trade);
    localStorage.setItem("trades", JSON.stringify(trades));

    renderTable();
    updateStats();
}

function renderTable() {
    let table = document.getElementById("tradeTable");
    table.innerHTML = "";

    trades.forEach(t => {
        let row = `
            <tr>
                <td>${t.pair}</td>
                <td>$${t.buy}</td>
                <td>$${t.sell}</td>
                <td class="${t.pl >= 0 ? 'profit' : 'loss'}">$${t.pl}</td>
                <td>${t.date}</td>
                <td>${t.notes}</td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

function updateStats() {
    document.getElementById("totalTrades").innerText = trades.length;

    let wins = trades.filter(t => t.pl > 0).length;
    let winRate = trades.length ? ((wins / trades.length) * 100).toFixed(1) : 0;
    document.getElementById("winRate").innerText = winRate + "%";

    let totalProfit = trades.reduce((sum, t) => sum + parseFloat(t.pl), 0);
    document.getElementById("totalProfit").innerText = "$" + totalProfit.toFixed(2);
}

renderTable();
updateStats();