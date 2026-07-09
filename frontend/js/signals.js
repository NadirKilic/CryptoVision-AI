/* =====================================
   SIGNAL ENGINE
===================================== */

function calculateSignal(
    rsi,
    sma20,
    sma50
) {

    /* STRONG BUY */

    if (
        sma20 > sma50 &&
        rsi > 50 &&
        rsi < 70
    ) {

        return {
            signal: "BUY",
            color: "#10B981"
        };

    }

    /* STRONG SELL */

    if (
        sma20 < sma50 &&
        rsi < 50
    ) {

        return {
            signal: "SELL",
            color: "#EF4444"
        };

    }

    /* HOLD */

    return {
        signal: "HOLD",
        color: "#F59E0B"
    };

}

/* =====================================
   CREATE SIGNAL CARD
===================================== */

function createSignalCard(
    coin,
    signalData
) {

    return `

        <div class="signal-item">

            <span class="signal-coin">

                ${coin}

            </span>

            <span
                class="signal-badge"
                style="color:${signalData.color};"
            >

                ${signalData.signal}

            </span>

        </div>

    `;

}

/* =====================================
   UPDATE UI
===================================== */

export function updateSignalsUI(
    signals
) {

    const container =
        document.getElementById(
            "signals-container"
        );

    if (!container) {

        return;

    }

    container.innerHTML = "";

    signals.forEach(signal => {

        container.innerHTML +=
            createSignalCard(

                signal.coin,

                signal.data

            );

    });

}

/* =====================================
   BUILD SIGNAL LIST
===================================== */

export function generateSignals(

    marketData

) {

    const signals = [];

    marketData.forEach(item => {

        const signal =
            calculateSignal(

                item.rsi,

                item.sma20,

                item.sma50

            );

        signals.push({

            coin:
                item.coin,

            data:
                signal

        });

    });

    return signals;

}