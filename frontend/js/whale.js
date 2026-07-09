/* =====================================
   WHALE ACTIVITY ENGINE
===================================== */

export function generateWhaleActivity(

    symbol,
    currentPrice,
    volume

) {

    const activities = [];

    if (volume > 1000000000) {

        activities.push(
            `🐋 Large ${symbol.replace("USDT","")} accumulation detected`
        );

    }

    if (volume > 5000000000) {

        activities.push(
            `🐋 Institutional buying pressure increasing`
        );

    }

    if (currentPrice > 0) {

        activities.push(
            `🐋 Smart money activity observed`
        );

    }

    if (activities.length === 0) {

        activities.push(
            "🐋 No significant whale activity detected"
        );

    }

    return activities;

}

/* =====================================
   UPDATE UI
===================================== */

export function updateWhaleUI(

    activities

) {

    const container =
        document.getElementById(
            "whale-activity"
        );

    if (!container) {

        return;

    }

    container.innerHTML = "";

    activities.forEach(item => {

        container.innerHTML += `

            <div class="whale-item">

                ${item}

            </div>

        `;

    });

}