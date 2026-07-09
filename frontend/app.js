async function getBTCData() {

    try {

        const response = await fetch(
            "https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT"
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

        if (change > 0) {

            document.getElementById("trend").innerText =
                "Bullish 📈";

        }
        else {

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

async function loadChart() {

    try {

        const response = await fetch(
            "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1h&limit=60"
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

            document.getElementById("comment").innerText =
                "Bullish trend detected. SMA20 is above SMA50.";

        }
        else if (Number(sma20) < Number(sma50)) {

            document.getElementById("signal").innerText =
                "SELL";

            document.getElementById("comment").innerText =
                "Bearish trend detected. SMA20 is below SMA50.";

        }
        else {

            document.getElementById("signal").innerText =
                "WAIT";

        }

        const ctx =
            document.getElementById("btcChart");

        new Chart(ctx, {

            type: "line",

            data: {

                labels,

                datasets: [

                    {
                        label: "BTC Price",
                        data: prices,
                        borderWidth: 3,
                        tension: 0.3
                    }

                ]

            }

        });

    }

    catch (error) {

        console.error(error);

    }

}

getBTCData();
loadChart();