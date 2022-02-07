import { Component } from "react";
import styles from './graph.module.css'

export default class Graph extends Component<{ title: string, solo?: boolean }, { selected: string }> {
    color: { film: string; serie: string; };
    constructor(props: { title: string }) {
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
        if (Array.isArray(this.props.children)) {
            return <div>
                <p className={this.state.selected === "tout" ? styles.active : undefined} onClick={() => this.switchSelected("tout")}>Tout</p>
                <p className={this.state.selected === "film" ? styles.active : undefined} style={{ color: this.color.film }} onClick={() => this.switchSelected("film")}>Film</p>
                <p className={this.state.selected === "serie" ? styles.active : undefined} style={{ color: this.color.serie }} onClick={() => this.switchSelected("serie")}>Série</p>
            </div>
        }
    }
    displayGraph() {
        if (Array.isArray(this.props.children)) {
            switch (this.state.selected) {
                case "tout":
                    return this.props.children[0]
                case "film":
                    return this.props.children[1]
                case "serie":
                    return this.props.children[2]
            }
        }
        return this.props.children
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