

export async function loadTopLosers() {

    try {

        const response =
            await fetch(
                "https://api.binance.com/api/v3/ticker/24hr"
            );

        const data =
            await response.json();

        const usdtPairs =
            data.filter(item =>

                item.symbol.endsWith(
                    "USDT"
                )

            );

        const sorted =
            usdtPairs.sort(

                (a, b) =>

                    Number(
                        a.priceChangePercent
                    )

                    -

                    Number(
                        b.priceChangePercent
                    )

            );

        const top5 =
            sorted.slice(0, 5);

        updateLosersUI(
            top5
        );

    }
    catch (error) {

        console.error(
            "Top Losers Error:",
            error
        );

    }

}



function updateLosersUI(
    losers
) {

    const container =
        document.getElementById(
            "losers-list"
        );

    if (!container) {

        return;

    }

    container.innerHTML = "";

    losers.forEach(coin => {

        const symbol =
            coin.symbol.replace(
                "USDT",
                ""
            );

        const percent =
            Number(
                coin.priceChangePercent
            ).toFixed(2);

        container.innerHTML += `

            <div class="market-item">

                <span>

                    ${symbol}

                </span>

                <span class="negative">

                    ${percent}%

                </span>

            </div>

        `;

    });

}