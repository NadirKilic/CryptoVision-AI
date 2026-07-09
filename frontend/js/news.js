/* =====================================
   AI NEWS GENERATOR
===================================== */

export function generateNews(

    coin,
    change,
    volume

) {

    const news = [];

    const shortCoin =
        coin.replace(
            "USDT",
            ""
        );

    if (change > 5) {

        news.push(
            `📰 ${shortCoin} surges as strong bullish momentum enters the market.`
        );

    }

    if (change > 0) {

        news.push(
            `📰 ${shortCoin} continues trading in positive territory during the current session.`
        );

    }

    if (change < 0) {

        news.push(
            `📰 ${shortCoin} faces selling pressure as traders secure profits.`
        );

    }

    if (
        volume >
        1000000000
    ) {

        news.push(
            `📰 Trading volume for ${shortCoin} has increased significantly.`
        );

    }

    news.push(
        `📰 CryptoVision AI continues monitoring market conditions in real time.`
    );

    return news;

}

/* =====================================
   UPDATE NEWS UI
===================================== */

export function updateNewsUI(

    news

) {

    const container =
        document.getElementById(
            "news-list"
        );

    if (!container) {

        return;

    }

    container.innerHTML = "";

    news.forEach(item => {

        container.innerHTML += `

            <div class="news-item">

                ${item}

            </div>

        `;

    });

}