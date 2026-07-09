
export async function loadFearGreed() {

    try {

        const response =
            await fetch(
                "https://api.alternative.me/fng/"
            );

        const data =
            await response.json();

        const index =
            Number(
                data.data[0].value
            );

        const element =
            document.getElementById(
                "fear-greed"
            );

        let text = "";

        if (index <= 20) {

            text =
                `😨 Extreme Fear (${index})`;

            element.style.color =
                "#EF4444";

        }
        else if (index <= 40) {

            text =
                `😟 Fear (${index})`;

            element.style.color =
                "#F97316";

        }
        else if (index <= 60) {

            text =
                `😐 Neutral (${index})`;

            element.style.color =
                "#F59E0B";

        }
        else if (index <= 80) {

            text =
                `🙂 Greed (${index})`;

            element.style.color =
                "#10B981";

        }
        else {

            text =
                `🚀 Extreme Greed (${index})`;

            element.style.color =
                "#22C55E";

        }

        element.innerText =
            text;

    }
    catch (error) {

        console.error(
            "Fear & Greed Error:",
            error
        );

        const element =
            document.getElementById(
                "fear-greed"
            );

        if (element) {

            element.innerText =
                "Unavailable";

            element.style.color =
                "#EF4444";

        }

    }

}