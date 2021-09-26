import { Component } from 'react'
import { unmountComponentAtNode } from 'react-dom';
import { FilmOrSerie } from '../film/film'
import styles from './filmInfo.module.css'
import { Splitand, Titlesize } from './function';
function GenreColor(Genre: string) {
    switch (Genre) {
        case "Comédie":
            return { color: "rgb( 255, 142, 0)" };
        case "Animation":
            return { color: "rgb(5, 176, 214)" }
        case "Romance":
            return { color: "rgb(179, 16, 83)" }
        case "Aventure":
            return { color: "rgb(201, 109, 0)" }
        case "Drame":
            return { color: "rgb(124, 7, 7)" }
        case "Action":
            return { color: "rgb(229, 60, 24)" }
        case "Science-Fiction":
            return { color: "rgb(37, 186, 4)" }
        case "Fantastique":
            return { color: "rgb(81, 50, 173)" }
        case "Western":
            return { color: "rgb(184, 108, 0)" }
        case "Crime":
            return { color: "rgb(82, 0, 0)" }
        case "Thriller":
            return { color: "rgb(59, 61, 85)" }
        case "Familial":
            return { color: "rgb(0, 203, 115)" }
        case "Guerre":
            return { color: "rgb(105, 192, 11)" }
        case "Musique":
            return { backgroundColor: "white", borderRadius: "2px" }
        case "Mystère":
            return { color: "rgb(22, 181, 115)" }
    }
}
function DureeH(heure: number) {
    let h, m;
    m = 0;
    h = Math.floor(heure / 60);
    m = heure - h * 60;
    return h + " h " + m + " min"
}
function infoFilmLeft(props: FilmOrSerie) {
    let Serie = (props.name ? true : false)
    let element: JSX.Element
    if (Serie) {
        element = (<div className={styles.left} style={{ backgroundImage: "url(https://image.tmdb.org/t/p/w400/" + props.poster_path + ")" }}>
            <h2>Type</h2>
            <h3>Série</h3>
            <h2>Titre d&apos;origine</h2>
            <h3 style={Titlesize(props.original_name)}>{props.original_name}</h3>
            <h2>Date de sortie</h2>
            <h3>{props.first_air_date}</h3>
            <h2>Note</h2>
            <h3>{props.vote_average}/10</h3>
            <h3>Noté par {props.vote_count} personne</h3>
            <h2>Durée</h2>
            <h3>Nombre d&apos;épisode : {props.number_of_episodes}</h3>
            <h3>Durée par episode : {props.episode_run_time[0]}</h3>
            <h3>Saisons : {props.number_of_seasons}</h3>
        </div>)
    } else {
        element = (<div className={styles.left} style={{ backgroundImage: "url(https://image.tmdb.org/t/p/w400/" + props.poster_path + ")" }}>
            <h2>Type</h2>
            <h3>Film</h3>
            <h2>Titre d&apos;origine</h2>
            <h3 style={Titlesize(props.original_title)}>{props.original_title}</h3>
            <h2>Date de sortie</h2>
            <h3>{props.release_date}</h3>
            <h2>Note</h2>
            <h3>{props.vote_average}/10</h3>
            <h3>Noté par {props.vote_count} personne</h3>
            <h2>Durée</h2>
            <h3>{DureeH(props.runtime)}</h3>
        </div>)
    }
    return element
}
export class GetInfo extends Component<{ content: FilmOrSerie }, any, {}> {
    title: string
    constructor(props: any) {
        super(props)
        this.state = {
            visible: true
        }
        this.back = this.back.bind(this);
        this.title = (props.content.title ? props.content.title : props.content.name)
    }
    back() {
        this.setState({
            visible: false
        })
    }
    render() {
        if (this.state.visible) {
            return <div id="Darken" className={styles.Darken}>
                <div className={styles.infoFilm}>
                    {infoFilmLeft(this.props.content)}
                    <div className={styles.right}>
                        <h2>{this.title}</h2>
                        <div className={styles.genre}>{this.props.content.genres.map((content: any, index: number) => (Splitand(content.name, index)))}
                        </div>
                        <p>
                            {this.props.content.overview}
                        </p>
                        <h3 className={styles.back} onClick={this.back}>Retour</h3>
                        <h4 className={styles.more}>{"<<"} En savoir plus</h4>
                    </div>
                </div></div>
        } else {
            return null
        }
    }
}