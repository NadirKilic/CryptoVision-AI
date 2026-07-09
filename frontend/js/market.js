
const MARKET_COINS = [

    "BTCUSDT",
    "ETHUSDT",
    "SOLUSDT",
    "BNBUSDT"

];


export async function loadMarketOverview() {

    try {

        const table =
            document.getElementById(
                "marketTable"
            );

        if (!table) {

            return;

        }

        table.innerHTML = "";

        for (const symbol of MARKET_COINS) {

            const response =
                await fetch(

                    `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`

                );

            const data =
                await response.json();

            const price =
                Number(
                    data.lastPrice
                ).toFixed(2);

            const change =
                Number(
                    data.priceChangePercent
                ).toFixed(2);

            const row =
                document.createElement(
                    "tr"
                );

            row.innerHTML = `

                <td>${symbol.replace("USDT","")}</td>

                <td>$${price}</td>

                <td class="${
                    change >= 0
                    ? "positive"
                    : "negative"
                }">

                    ${change}%

                </td>

            `;

            table.appendChild(
                row
            );

        }

    }
    catch (error) {

        console.error(
            "Market Overview Error:",
            error
        );

    }

}