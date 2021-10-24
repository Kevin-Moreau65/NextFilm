import { Component } from "react";
import { Default } from "../../global/reponsive/function";
import styles from './addFilm.module.css'
import { postFilm } from './function'
export default class AddFilm extends Component<{ back: () => void }, { display: boolean, vu: boolean, title: string, url: string, pwd: string }> {
    constructor(props: any) {
        super(props)
        this.state = {
            display: false,
            vu: true,
            title: "",
            url: "",
            pwd: ""
        }
        this.switch = this.switch.bind(this)
        this.addFilm = this.addFilm.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    switch() {
        this.setState({
            vu: !this.state.vu
        })
    }
    handleChange(event: any) {
        const id = event.target.id
        switch (id) {
            case "inputTitle":
                this.setState({
                    title: event.target.value
                })
                break
            case "inputURL":
                this.setState({
                    url: event.target.value
                })
                break
            case "inputPWD":
                this.setState({
                    pwd: event.target.value
                })
                break
        }
    }
    addFilm() {
        postFilm(this.state.title, this.state.url, this.state.pwd, this.state.vu)
    }
    render() {
        return <Default>
            <div className={styles.Darken}>
                <div className={styles.popup}>
                    <h2 onClick={this.switch}>
                        Ajouter un film <span style={{ textDecoration: "underline", cursor: "pointer" }}>{this.state.vu ? "vu" : "pas vu"}</span>
                    </h2>
                    <label htmlFor="title">Titre du film</label>
                    <input type="text" value={this.state.title} name="title" id="inputTitle" onChange={this.handleChange} placeholder="Titre du film" />
                    <label htmlFor="url">url (themoviedb.org)</label>
                    <input type="text" value={this.state.url} id="inputURL" name="url" onChange={this.handleChange} placeholder="Url du film (tmdb)" />
                    <label htmlFor="pwd">Mot de passe</label>
                    <input type="password" value={this.state.pwd} name="pwd" id="inputPWD" onChange={this.handleChange} placeholder="Mot de passe" />
                    <div className={styles.divBTN}>
                        <h3 onClick={this.props.back}>Annuler</h3>
                        <h3 onClick={this.addFilm}>Ajouter</h3>
                    </div>
                </div>
            </div>
        </Default>
    }
}