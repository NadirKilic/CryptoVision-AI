let selectedCoin = "BTCUSDT";

let chartInstance;


async function getBTCData() {

    try {

        const response = await fetch(
            `https://api.binance.com/api/v3/ticker/24hr?symbol=${selectedCoin}`
        );

        const data = await response.json();

        const price =
            Number(data.lastPrice).toFixed(2);

        const change =
            Number(data.priceChangePercent).toFixed(2);

        document.getElementById("btc-price").innerText =
            "$" + price;

        document.getElementById("btc-change").innerText =
            change + "%";

        document.getElementById("coin-name").innerText =
            selectedCoin;

        if (Number(change) > 0) {

            document.getElementById("btc-change").style.color =
                "#10B981";

            document.getElementById("trend").innerText =
                "Bullish 📈";

        }
        else {

            document.getElementById("btc-change").style.color =
                "#EF4444";

            document.getElementById("trend").innerText =
                "Bearish 📉";

        }

    }
    catch (error) {

        console.error(error);

    }

}


function calculateRSI(prices, period = 14) {

    let gains = 0;
    let losses = 0;

    for (let i = 1; i <= period; i++) {

        const difference =
            prices[i] - prices[i - 1];

        if (difference >= 0) {

            gains += difference;

        }
        else {

            losses += Math.abs(difference);

        }

    }

    const averageGain =
        gains / period;

    const averageLoss =
        losses / period;

    if (averageLoss === 0) {

        return 100;

    }

    const rs =
        averageGain / averageLoss;

    const rsi =
        100 - (100 / (1 + rs));

    return rsi.toFixed(2);

}


function calculateSMA(prices, period) {

    if (prices.length < period) {

        return 0;

    }

    const recentPrices =
        prices.slice(-period);

    const sum =
        recentPrices.reduce(
            (acc, price) => acc + price,
            0
        );

    return (sum / period).toFixed(2);

}


function calculateAIScore(
    rsi,
    sma20,
    sma50
) {

    let score = 50;

    if (Number(rsi) > 60) {

        score += 20;

    }
    else if (Number(rsi) < 40) {

        score -= 20;

    }

    if (Number(sma20) > Number(sma50)) {

        score += 25;

    }
    else {

        score -= 25;

    }

    score = Math.max(
        0,
        Math.min(100, score)
    );

    return score;

}


async function loadChart() {

    try {

        const response = await fetch(
            `https://api.binance.com/api/v3/klines?symbol=${selectedCoin}&interval=1h&limit=60`
        );

        const data =
            await response.json();

        const labels = [];
        const prices = [];

        data.forEach(candle => {

            const date =
                new Date(candle[0]);

            labels.push(
                date.getHours() + ":00"
            );

            prices.push(
                Number(candle[4])
            );

        });

        const rsi =
            calculateRSI(prices);

        const sma20 =
            calculateSMA(prices, 20);

        const sma50 =
            calculateSMA(prices, 50);

        document.getElementById("rsi").innerText =
            rsi;

        document.getElementById("sma20").innerText =
            sma20;

        document.getElementById("sma50").innerText =
            sma50;


        if (Number(sma20) > Number(sma50)) {

            document.getElementById("signal").innerText =
                "BUY";

            document.getElementById("signal").style.color =
                "#10B981";

            document.getElementById("comment").innerText =
                "Bullish trend detected. SMA20 is above SMA50. Momentum remains strong.";

        }
        else if (Number(sma20) < Number(sma50)) {

            document.getElementById("signal").innerText =
                "SELL";

            document.getElementById("signal").style.color =
                "#EF4444";

            document.getElementById("comment").innerText =
                "Bearish trend detected. SMA20 is below SMA50. Momentum remains weak.";

        }
        else {

            document.getElementById("signal").innerText =
                "WAIT";

            document.getElementById("signal").style.color =
                "#F59E0B";

        }


        const score =
            calculateAIScore(
                rsi,
                sma20,
                sma50
            );

        const aiScoreElement =
            document.getElementById(
                "ai-score"
            );

        aiScoreElement.innerText =
            score + "/100";

        aiScoreElement.classList.remove(
            "score-high",
            "score-medium",
            "score-low"
        );

        if (score >= 75) {

            aiScoreElement.classList.add(
                "score-high"
            );

        }
        else if (score >= 50) {

            aiScoreElement.classList.add(
                "score-medium"
            );

        }
        else {

            aiScoreElement.classList.add(
                "score-low"
            );

        }


        const ctx =
            document.getElementById(
                "btcChart"
            );

        if (chartInstance) {

            chartInstance.destroy();

        }

        chartInstance = new Chart(ctx, {

            type: "line",

            data: {

                labels,

                datasets: [

                    {

                        label: selectedCoin,

                        data: prices,

                        borderColor:
                            "#3B82F6",

                        backgroundColor:
                            "rgba(59,130,246,0.1)",

                        borderWidth: 3,

                        tension: 0.4,

                        fill: true

                    }

                ]

            },

            options: {

                responsive: true,

                plugins: {

                    legend: {

                        labels: {

                            color: "#ffffff"

                        }

                    }

                },

                scales: {

                    x: {

                        ticks: {

                            color: "#94A3B8"

                        }

                    },

                    y: {

                        ticks: {

                            color: "#94A3B8"

                        }

                    }

                }

            }

        });

    }
    catch (error) {

        console.error(error);

    }

}


getBTCData();

loadChart();


document
    .getElementById("coinSelect")
    .addEventListener("change", (e) => {

        selectedCoin =
            e.target.value;

        getBTCData();

        loadChart();

    });


setInterval(() => {

    getBTCData();

    loadChart();

}, 30000);