import React from "react";
import { Chart, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement );

const data = {
    labels: ["Red", "Green", "Yellow"],
    datasets: [
        {
            data: [40, 40, 20],
            backgroundColor: ["#46408C", "#655cc9", "#867FD4"],
            hoverBackgroundColor: ["#5049A0", "#746CCE", "#918AD8"],
        },
    ],
};

// const config = {
//     type: "doughnut",
//     data,
//     options: {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: "top",
//             },
//             title: {
//                 display: true,
//                 text: "Chart.js Doughnut Chart",
//             },
//         },
//     },
// };

export default () => (
    <>
        <h2>Doughnut Example</h2>
        <Doughnut data={data} width={400} height={400} />
    </>
);
