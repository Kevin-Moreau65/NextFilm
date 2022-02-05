import { Component, ReactNode } from "react";
import { BarChart } from "recharts";

export default class MyBarChart extends Component<{ title: string, data: object[] }> {
    render() {
        return <BarChart data={this.props.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        </BarChart>
    }
}