
const BINANCE_API =
    "https://api.binance.com/api/v3";


export async function getTickerData(
    symbol
) {

    try {

        const response =
            await fetch(
                `${BINANCE_API}/ticker/24hr?symbol=${symbol}`
            );

        const data =
            await response.json();

        return {

            symbol:
                data.symbol,

            price:
                Number(
                data.lastPrice
            ),

            change:
                Number(
                data.priceChangePercent
            ),

            volume:
                Number(
                data.quoteVolume
            )

    };

    }
    catch (error) {

        console.error(
            "Ticker Error:",
            error
        );

        return null;

    }

}


export async function getKlineData(
    symbol,
    interval = "1h",
    limit = 60
) {

    try {

        const response =
            await fetch(

                `${BINANCE_API}/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`

            );

        const data =
            await response.json();

        return data;

    }
    catch (error) {

        console.error(
            "Kline Error:",
            error
        );

        return [];

    }

}


export async function getPrices(
    symbol
) {

    const klines =
        await getKlineData(
            symbol
        );

    return klines.map(
        candle =>
            Number(
                candle[4]
            )
    );

}


export async function getLabels(
    symbol
) {

    const klines =
        await getKlineData(
            symbol
        );

    return klines.map(
        candle => {

            const date =
                new Date(
                    candle[0]
                );

            return (
                date.getHours() +
                ":00"
            );

        }
    );

}


export async function getMarketData(
    symbol
) {

    const ticker =
        await getTickerData(
            symbol
        );

    const prices =
        await getPrices(
            symbol
        );

    const labels =
        await getLabels(
            symbol
        );

    return {

        ticker,

        prices,

        labels

    };

}