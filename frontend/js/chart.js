/* =====================================
   CHART INSTANCE
===================================== */

let chartInstance = null;

/* =====================================
   DESTROY OLD CHART
===================================== */

function destroyChart() {

    if (chartInstance) {

        chartInstance.destroy();

        chartInstance = null;

    }

}

/* =====================================
   CREATE CHART
===================================== */

export function createChart(

    canvasId,
    labels,
    prices,
    symbol

) {

    destroyChart();

    const canvas =
        document.getElementById(
            canvasId
        );

    if (!canvas) {

        console.error(
            "Canvas not found:",
            canvasId
        );

        return;

    }

    const ctx =
        canvas.getContext("2d");

    chartInstance =
        new Chart(ctx, {

            type: "line",

            data: {

                labels,

                datasets: [

                    {

                        label:
                            symbol,

                        data:
                            prices,

                        borderColor:
                            "#3B82F6",

                        backgroundColor:
                            "rgba(59,130,246,0.12)",

                        borderWidth:
                            3,

                        tension:
                            0.4,

                        fill:
                            true,

                        pointRadius:
                            0,

                        pointHoverRadius:
                            5

                    }

                ]

            },

            options: {

                responsive:
                    true,

                maintainAspectRatio:
                    false,

                interaction: {

                    intersect:
                        false,

                    mode:
                        "index"

                },

                plugins: {

                    legend: {

                        labels: {

                            color:
                                "#ffffff"

                        }

                    }

                },

                scales: {

                    x: {

                        ticks: {

                            color:
                                "#94A3B8"

                        },

                        grid: {

                            color:
                                "rgba(255,255,255,0.05)"

                        }

                    },

                    y: {

                        ticks: {

                            color:
                                "#94A3B8"

                        },

                        grid: {

                            color:
                                "rgba(255,255,255,0.05)"

                        }

                    }

                }

            }

        });

}

/* =====================================
   UPDATE CHART
===================================== */

export function updateChart(

    labels,
    prices,
    symbol

) {

    if (!chartInstance) {

        return;

    }

    chartInstance.data.labels =
        labels;

    chartInstance.data.datasets[0].data =
        prices;

    chartInstance.data.datasets[0].label =
        symbol;

    chartInstance.update();

}

/* =====================================
   GET INSTANCE
===================================== */

export function getChartInstance() {

    return chartInstance;

}