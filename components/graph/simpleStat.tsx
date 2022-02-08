import { Component } from "react";
import styles from './graph.module.css'

export default class SimpleStat extends Component<{ title: string, solo?: boolean, data: any, modulable?: boolean, nightMode?: boolean, comparison: string, displayValue: string }, { selected: string }> {
    color: { film: string; serie: string;[key: string]: string; };
    constructor(props: { title: string, solo?: boolean, data: any, modulable?: boolean, nightMode?: boolean, comparison: string, displayValue: string }) {
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
        let categorie
        if (this.state.selected !== "tout") {
            categorie = this.props.data[this.state.selected]
        } else {
            if (this.props.comparison === "-") {
                categorie = this.props.data.film.value > this.props.data.serie.value ? this.props.data.serie : this.props.data.film
            } else {
                categorie = this.props.data.film.value < this.props.data.serie.value ? this.props.data.serie : this.props.data.film
            }
        }
        return <div>
            <p><span style={{ textDecoration: "underline" }}>Titre :</span> {categorie.titre}</p>
            <p><span style={{ textDecoration: "underline" }}>{this.props.displayValue}</span> {categorie.value}</p>
        </div>
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
            <div className={styles.content}>
                {this.displayGraph()}
            </div>
        </div>
    }
}