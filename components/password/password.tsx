import { Component } from "react";
import { Default } from "../../global/reponsive/function";
import { callAPI } from "./function";
import styles from './password.module.css'
export default class AddFilm extends Component<{ back: () => void, api: string, vu: boolean, title: string }, { display: boolean, pwd: string }> {
    constructor(props: any) {
        super(props)
        this.state = {
            display: false,
            pwd: ""
        }
        this.confirm = this.confirm.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    confirm() {
        if (this.state.pwd === "") {
            alert("Veuillez entrer un mot de passe")
        } else {
            callAPI(this.props.title, this.props.api, this.state.pwd, this.props.vu)
        }
    }
    handleChange(event: any) {
        this.setState({
            pwd: event.target.value
        })
    }
    render() {
        return <Default>
            <div className={styles.darken}>
                <div className={styles.popup}>
                    <h2>Veuillez entrer le mot de passe</h2>
                    <label htmlFor="pwd">Mot de passe</label>
                    <input type="password" name="pwd" onChange={this.handleChange} />
                    <div className={styles.divBTN}>
                        <h3 onClick={this.confirm}>Confirmer</h3>
                        <h3 onClick={this.props.back}>Annuler</h3>
                    </div>
                </div>
            </div>
        </Default>
    }
}