import { Component } from 'react'
import { FilmOrSerie } from '../film/film'
import styles from './filmInfo.module.css'
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
function infoFilmRight(props: FilmOrSerie) {
    let Serie = (props.name ? true : false)
    let element: JSX.Element
    if (Serie) {
        element = (<div className={styles.right}>
            <h2>TYpe</h2>
            <h3>Série</h3>
            <h2>Titre d&apos;origine</h2>
            <h3>{props.original_name}</h3>
            <h2>Pays d&apos;origine</h2>
            <h3>{props.origin_country}</h3>
            <h2>Date de sortie</h2>
            <h3>{props.first_air_date}</h3>
            <h2>Note</h2>
            <h3>{props.vote_average}</h3>
            <h3>Noté par {props.vote_count} personne</h3>
            <h2>Durée</h2>
            {/* <h3>Durée par episode</h3> */}
            {/* <h3> Saisons</h3> */}
            {/* <h3> Nombre d'épisode</h3> */}
        </div>)
    }
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
                    <h2></h2>
                </div>
                <div className={styles.right}>
                    <h2>{this.title}</h2>
                    <div className={styles.genre}>{this.props.content.genres.map((content: any) => (
                        <h4 key={content.id} style={GenreColor(content.name)}>
                            {content.name}
                        </h4>
                    ))}</div>
                    <p>
                        {this.props.content.overview}
                    </p>
                </div></div></div>
    }
}