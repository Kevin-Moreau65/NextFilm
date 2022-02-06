import { Component } from "react";
import styles from './graph.module.css'

export default class Graph extends Component<{ title: string }, { selected: string }> {
    constructor(props: { title: string }) {
        super(props)
        this.state = {
            selected: "tout"
        }
        this.switchSelected = this.switchSelected.bind(this)
        this.displaybtn = this.displaybtn.bind(this)
        this.displayGraph = this.displayGraph.bind(this)
    }
    displaybtn() {
        if (Array.isArray(this.props.children)) {
            return <div>
                <p className={this.state.selected === "tout" ? styles.active : undefined} onClick={() => this.switchSelected("tout")}>Tout</p>
                <p className={this.state.selected === "serie" ? styles.active : undefined} onClick={() => this.switchSelected("serie")}>Série</p>
                <p className={this.state.selected === "film" ? styles.active : undefined} onClick={() => this.switchSelected("film")}>Film</p>
            </div>
        }
    }
    displayGraph() {
        if (Array.isArray(this.props.children)) {
            switch (this.state.selected) {
                case "tout":
                    return this.props.children[0]
                case "serie":
                    return this.props.children[1]
                case "film":
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
        return <div className={styles.graph}>
            <div className={styles.header}>
                <h1>{this.props.title}</h1>
                {this.displaybtn()}
                <div className="content">
                </div>
            </div>
            {this.displayGraph()}
        </div>
    }
}