
import {
    getTickerData,
    getMarketData
}
from "./api.js";

import {
    calculateRSI,
    calculateSMA
}
from "./indicators.js";

import {
    calculateAIScore,
    getSignal,
    getTrend,
    generateComment
}
from "./ai.js";

import {
    createChart
}
from "./chart.js";

import {
    loadMarketOverview
}
from "./market.js";

import {
    loadFearGreed
}
from "./fearGreed.js";

import {
    generatePrediction,
    updatePredictionUI
}
from "./prediction.js";

import {
    generateSignals,
    updateSignalsUI
}
from "./signals.js";

import {
    loadTopGainers
}
from "./gainers.js";

import {
    loadTopLosers
}
from "./losers.js";

import {
    generateWhaleActivity,
    updateWhaleUI
}
from "./whale.js";

import {
    generateNews,
    updateNewsUI
}
from "./news.js";

import {
    calculatePortfolio,
    updatePortfolioUI,
    getTotalValue
}
from "./portfolio.js";


let selectedCoin = "BTCUSDT";


function updateTime() {

    const now =
        new Date();

    const element =
        document.getElementById(
            "last-update"
        );

    if (element) {

        element.innerText =
            "Last Update: " +
            now.toLocaleTimeString();

    }

}


async function loadDashboard() {

    try {


        const ticker =
            await getTickerData(
                selectedCoin
            );

        if (!ticker) return;

        const price =
            ticker.price;

        const change =
            ticker.change;

        document.getElementById(
            "coin-name"
        ).innerText =
            selectedCoin;

        document.getElementById(
            "btc-price"
        ).innerText =
            "$" +
            Number(price)
                .toLocaleString();

        const changeElement =
            document.getElementById(
                "btc-change"
            );

        changeElement.innerText =
            change.toFixed(2) +
            "%";

        changeElement.style.color =
            change >= 0
            ? "#10B981"
            : "#EF4444";

        const marketData =
            await getMarketData(
                selectedCoin
            );

        const prices =
            marketData.prices;

        const labels =
            marketData.labels;

        const rsi =
            calculateRSI(
                prices
            );

        const sma20 =
            calculateSMA(
                prices,
                20
            );

        const sma50 =
            calculateSMA(
                prices,
                50
            );

        document.getElementById(
            "rsi"
        ).innerText = rsi;

        document.getElementById(
            "sma20"
        ).innerText = sma20;

        document.getElementById(
            "sma50"
        ).innerText = sma50;

        const aiScore =
            calculateAIScore(
                rsi,
                sma20,
                sma50
            );

        document.getElementById(
            "ai-score"
        ).innerText =
            aiScore + "/100";

        const signal =
            getSignal(
                sma20,
                sma50
            );

        const trend =
            getTrend(
                sma20,
                sma50
            );

        document.getElementById(
            "signal"
        ).innerText =
            signal;

        document.getElementById(
            "trend"
        ).innerText =
            trend;

        document.getElementById(
            "comment"
        ).innerText =

            generateComment(
                rsi,
                sma20,
                sma50,
                aiScore
            );

        createChart(

            "btcChart",

            labels,

            prices,

            selectedCoin

        );

        const prediction =
            generatePrediction(

                price,

                rsi,

                sma20,

                sma50,

                aiScore

            );

        updatePredictionUI(
            prediction
        );

        const signals =
            generateSignals([

                {
                    coin: "BTC",
                    rsi,
                    sma20,
                    sma50
                },

                {
                    coin: "ETH",
                    rsi: 58,
                    sma20: 1,
                    sma50: 0.8
                },

                {
                    coin: "SOL",
                    rsi: 48,
                    sma20: 1,
                    sma50: 1.3
                },

                {
                    coin: "BNB",
                    rsi: 52,
                    sma20: 1,
                    sma50: 1
                }

            ]);

        updateSignalsUI(
            signals
        );

        await loadMarketOverview();

        await loadFearGreed();

        await loadTopGainers();

        await loadTopLosers();

        const whales =
            generateWhaleActivity(

                selectedCoin,

                price,

                ticker.volume || 0

            );

        updateWhaleUI(
            whales
        );

        const news =
            generateNews(

                selectedCoin,

                change,

                ticker.volume || 0

            );

        updateNewsUI(
            news
        );

        const portfolio =
            calculatePortfolio(
                10000
            );

        const totalValue =
            getTotalValue(
                10000
            );

        updatePortfolioUI(

            portfolio,

            totalValue

        );

        updateTime();

    }
    catch (error) {

        console.error(
            "Dashboard Error:",
            error
        );

    }

}

document
.getElementById(
    "coinSelect"
)
.addEventListener(
    "change",
    async (e) => {

        selectedCoin =
            e.target.value;

        await loadDashboard();

    }
);

loadDashboard();

setInterval(
    loadDashboard,
    30000
);