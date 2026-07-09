/* =====================================
   AI PREDICTION ENGINE
===================================== */

export function generatePrediction(

    currentPrice,
    rsi,
    sma20,
    sma50,
    aiScore

) {

    let probability = 50;

    /* RSI FACTOR */

    if (rsi > 70) {

        probability -= 15;

    }
    else if (rsi > 60) {

        probability += 10;

    }
    else if (rsi < 30) {

        probability += 20;

    }

    /* SMA FACTOR */

    if (sma20 > sma50) {

        probability += 20;

    }
    else {

        probability -= 20;

    }

    /* AI SCORE FACTOR */

    probability +=
        (aiScore - 50) * 0.5;

    /* LIMIT */

    probability =
        Math.max(
            0,
            Math.min(
                100,
                Math.round(
                    probability
                )
            )
        );

    let direction =
        "Neutral";

    if (probability >= 60) {

        direction =
            "Bullish 📈";

    }
    else if (
        probability <= 40
    ) {

        direction =
            "Bearish 📉";

    }

    /* TARGET PRICE */

    let targetPrice =
        currentPrice;

    if (
        direction ===
        "Bullish 📈"
    ) {

        targetPrice =
            currentPrice * 1.03;

    }
    else if (
        direction ===
        "Bearish 📉"
    ) {

        targetPrice =
            currentPrice * 0.97;

    }

    return {

        probability,

        direction,

        targetPrice:
            targetPrice.toFixed(2)

    };

}

/* =====================================
   UPDATE UI
===================================== */

export function updatePredictionUI(

    prediction

) {

    const probabilityElement =
        document.getElementById(
            "prediction-probability"
        );

    const directionElement =
        document.getElementById(
            "prediction-direction"
        );

    const targetElement =
        document.getElementById(
            "target-price"
        );

    if (
        !probabilityElement ||
        !directionElement ||
        !targetElement
    ) {

        return;

    }

    probabilityElement.innerText =
        prediction.probability +
        "%";

    directionElement.innerText =
        prediction.direction;

    targetElement.innerText =
        "$" +
        Number(
            prediction.targetPrice
        ).toLocaleString();

}