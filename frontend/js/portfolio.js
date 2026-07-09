
const portfolio = [

    {
        coin: "BTC",
        allocation: 40
    },

    {
        coin: "ETH",
        allocation: 30
    },

    {
        coin: "SOL",
        allocation: 20
    },

    {
        coin: "BNB",
        allocation: 10
    }

];


export function calculatePortfolio(

    totalCapital = 10000

) {

    return portfolio.map(item => {

        return {

            coin:
                item.coin,

            allocation:
                item.allocation,

            value:

                (
                    totalCapital *

                    item.allocation

                    /

                    100

                ).toFixed(2)

        };

    });

}


export function getTotalValue(

    totalCapital = 10000

) {

    return totalCapital.toFixed(
        2
    );

}


export function updatePortfolioUI(

    portfolioData,
    totalValue

) {

    const container =
        document.getElementById(
            "portfolio"
        );

    if (!container) {

        return;

    }

    container.innerHTML = "";

    portfolioData.forEach(item => {

        container.innerHTML += `

            <div class="portfolio-item">

                <span>

                    ${item.coin}

                    (${item.allocation}%)

                </span>

                <span>

                    $${Number(
                        item.value
                    ).toLocaleString()}

                </span>

            </div>

        `;

    });

    container.innerHTML += `

        <div
            class="portfolio-total"
        >

            Total Value:

            $${Number(
                totalValue
            ).toLocaleString()}

        </div>

    `;

}