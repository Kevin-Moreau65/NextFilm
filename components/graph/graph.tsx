import { Component } from "react";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer, Cell, Pie, PieChart } from "recharts";
import styles from './graph.module.css'

export default class Graph extends Component<{ title: string, solo?: boolean, type: string, data: any, modulable?: boolean, nightMode?: boolean }, { selected: string }> {
    color: { film: string; serie: string;[key: string]: string; };
    constructor(props: { title: string, solo?: boolean, type: string, data: any, modulable?: boolean, nightMode: boolean }) {
        super(props)
        this.state = {
            selected: "tout"
        }
        this.color = {
            film: "#485875",
            serie: "#750000"
        }
        this.switchSelected = this.switchSelected.bind(this)
        this.displaybtn = this.displaybtn.bind(this)
        this.displayGraph = this.displayGraph.bind(this)
    }
    displaybtn() {
        if (this.props.modulable) {
            return <div>
                <p className={this.state.selected === "tout" ? styles.active : undefined} onClick={() => this.switchSelected("tout")}>Tout</p>
                <p className={this.state.selected === "film" ? styles.active : undefined} style={{ color: this.color.film }} onClick={() => this.switchSelected("film")}>Film</p>
                <p className={this.state.selected === "serie" ? styles.active : undefined} style={{ color: this.color.serie }} onClick={() => this.switchSelected("serie")}>Série</p>
            </div>
        }
    }
    displayGraph() {
        // if (Array.isArray(this.props.children)) {
        //     switch (this.state.selected) {
        //         case "tout":
        //             return this.props.children[0]
        //         case "film":
        //             return this.props.children[1]
        //         case "serie":
        //             return this.props.children[2]
        //     }
        if (this.props.type === "pie") {
            return <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={this.props.data[this.state.selected]}
                        outerRadius={100}
                        fill="#8884d8"
                        label
                        stroke="none"
                    >
                        <Cell key={`cell-0`} fill={this.color.film} />
                        <Cell key={`cell-1`} fill={this.color.serie} />
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        } else if (this.props.type === "bar") {
            return <ResponsiveContainer width="100%" height={200}>
                <BarChart
                    data={this.props.data.tout}
                >
                    <CartesianGrid stroke={this.props.nightMode ? "grey" : "black"} />
                    <XAxis dataKey="name" stroke={this.props.nightMode ? "grey" : "black"} tick={this.props.nightMode && Object.keys(this.props.data.tout).length > 6 ? false : true} />
                    <YAxis stroke={this.props.nightMode ? "grey" : "black"} />
                    <Tooltip cursor={false} />
                    {this.state.selected !== "tout" ? <Bar dataKey={this.state.selected} stackId="a" fill={this.color[this.state.selected]} /> : <><Bar dataKey="film" stackId="a" fill={this.color.film} />
                        <Bar dataKey="serie" stackId="a" fill={this.color.serie} /></>}
                </BarChart>
            </ResponsiveContainer>
        }
    }
    switchSelected(select: string) {
        this.setState({
            selected: select
        })
    }
    render() {
        return <div className={styles.graph} style={this.props.solo ? { gridColumn: "1 / -1" } : undefined}>
            <div className={styles.header}>
                <h2>{this.props.title}</h2>
                {this.displaybtn()}
            </div>
            <div className="content">
                {this.displayGraph()}
            </div>
        </div>
    }
}