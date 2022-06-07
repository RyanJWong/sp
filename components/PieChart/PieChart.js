import * as React from "react";
import Paper from "@material-ui/core/Paper";
import {
    Chart,
    PieSeries,
    Title,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";

const data = [
    { tranche: "Phase 1", area: 10, color: "#000000" },
    { tranche: "Phase 2", area: 10, color: "#000000" },
    { tranche: "Phase 3", area: 20, color: "#000000" },
    { tranche: "Team", area: 20, color: "#000000" },
    { tranche: "Long Term & Pools", area: 40, color: "000000" },
];
export default class PieChart extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data,
        };
    }

    render() {
        const { data: chartData } = this.state;
       
        
        return (
            <Chart data={chartData}>
                <PieSeries
                    valueField="area"
                    argumentField="tranche"
                    innerRadius={0.6}
                />
                <Animation />
            </Chart>
        );
    }
}
