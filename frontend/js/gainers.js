
export async function loadTopGainers() {

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
                        b.priceChangePercent
                    )

                    -

                    Number(
                        a.priceChangePercent
                    )

            );

        const top5 =
            sorted.slice(0, 5);

        updateGainersUI(
            top5
        );

    }
    catch (error) {

        console.error(
            "Top Gainers Error:",
            error
        );

    }

}


function updateGainersUI(
    gainers
) {

    const container =
        document.getElementById(
            "gainers-list"
        );

    if (!container) {

        return;

    }

    container.innerHTML = "";

    gainers.forEach(coin => {

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

                <span class="positive">

                    +${percent}%

                </span>

            </div>

        `;

    });

}