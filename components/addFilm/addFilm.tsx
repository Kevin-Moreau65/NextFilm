import { Component } from "react";
import { Default } from "../../global/reponsive/function";
import styles from './addFilm.module.css'
export default class GetInfo extends Component<{}, { display: boolean, vu: boolean }> {
    constructor(props: { vu: boolean }) {
        super(props)
        this.state = {
            display: false,
            vu: true
        }
    }
    render() {
        return <Default>
            <div className={styles.popup}>
                <h2>
                    Ajouter un film {this.state.vu ? "vu" : "pas vu"}
                </h2>
                <input type="text" id="inputTitle" />
                <input type="text" id="inputURL" />
                <input type="text" id="inputPWD" />
            </div>
        </Default>
    }
}