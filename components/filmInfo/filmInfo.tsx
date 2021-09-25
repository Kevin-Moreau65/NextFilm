import { Component } from 'react'
import ReactDOM from 'react-dom'
import { useEffect } from 'react'
import { FilmOrSerie } from '../film/film'
import styles from './filmInfo.module.css'
export default function lol(props: FilmOrSerie) {
    ReactDOM.render(<div>{props.title ? props.title : props.name}</div>, document.getElementById("Darken"))
}
export class GetInfo extends Component<{ content: FilmOrSerie }, any, {}> {
    title: string
    constructor(props: any) {
        super(props)
        this.state = {
            title: props.content.id
        }
        this.title = (props.content.title ? props.content.title : props.content.name)
    }
    render() {
        return <div id="Darken" className={styles.Darken}>
            <div className={styles.infoFilm}>
                <div className={styles.left} style={{ backgroundImage: "url(https://image.tmdb.org/t/p/w500/" + this.props.content.poster_path + ")" }}>
                    <h2>Titre Original</h2>
                    <h3>{this.props.content.original_title ? this.props.content.original_title : this.props.content.original_name}</h3>
                </div>
                <div className={styles.right}>
                    <h2>{this.title}</h2>
                    <p>
                        {this.props.content.overview}
                    </p>
                </div></div></div>
    }
}