
export function calculateAIScore(
    rsi,
    sma20,
    sma50
) {

    let score = 50;


    if (rsi > 70) {

        score -= 10;

    }
    else if (rsi > 60) {

        score += 20;

    }
    else if (rsi < 30) {

        score += 10;

    }
    else if (rsi < 40) {

        score -= 20;

    }


    if (sma20 > sma50) {

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


export function getSignal(
    sma20,
    sma50
) {

    if (sma20 > sma50) {

        return "BUY";

    }

    if (sma20 < sma50) {

        return "SELL";

    }

    return "WAIT";

}


export function getTrend(
    sma20,
    sma50
) {

    if (sma20 > sma50) {

        return "Bullish 📈";

    }

    if (sma20 < sma50) {

        return "Bearish 📉";

    }

    return "Sideways ➖";

}


export function generateComment(
    rsi,
    sma20,
    sma50,
    score
) {

    if (
        score >= 80 &&
        sma20 > sma50
    ) {

        return "Strong bullish momentum detected. Trend strength remains high and buyers currently control the market.";

    }

    if (
        score >= 60 &&
        sma20 > sma50
    ) {

        return "Moderately bullish conditions detected. Market structure remains positive but risk management is recommended.";

    }

    if (
        score >= 40 &&
        score < 60
    ) {

        return "Neutral market conditions detected. Waiting for confirmation before taking action may be reasonable.";

    }

    if (
        score < 40 &&
        sma20 < sma50
    ) {

        return "Bearish pressure remains dominant. Momentum is weak and sellers currently control the market.";

    }

    return "Market data is currently inconclusive. Continue monitoring price action.";

}