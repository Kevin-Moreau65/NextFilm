import { Component, MouseEventHandler } from 'react'
import Image from 'next/image';
import { FilmOrSerie } from '../film/film'
import { Genre } from '../film/filmInterface';
import styles from './filmInfo.module.css'
import animate from './animate.module.css'
import { DureeH, NoteColor, Splitand, Titlesize } from './function';
function infoFilmLeft(props: FilmOrSerie) {
    let Serie = (props.name ? true : false)
    let element: JSX.Element
    if (Serie) {
        element = (<div className={styles.left} >
            <Image alt="" src={"https://image.tmdb.org/t/p/w500/" + props.poster_path} layout="fill" />
            <h2>Type</h2>
            <h3>Série</h3>
            <h2>Titre d&apos;origine</h2>
            <h3 style={Titlesize(props.original_name)}>{props.original_name}</h3>
            <h2>Date de sortie</h2>
            <h3>{props.first_air_date}</h3>
            <h2>Note</h2>
            <h3 style={NoteColor(props.vote_average)}>{props.vote_average}/10</h3>
            <h3>Noté par {props.vote_count} personne</h3>
            <h2>Durée</h2>
            <h3>Nombre d&apos;épisode : {props.number_of_episodes}</h3>
            <h3>Durée par episode : {props.episode_run_time[0]} min</h3>
            <h3>Saisons : {props.number_of_seasons}</h3>
        </div>)
    } else {
        element = (<div className={styles.left}>
            <Image alt="" src={"https://image.tmdb.org/t/p/w500/" + props.poster_path} layout="fill" />
            <h2>Type</h2>
            <h3>Film</h3>
            <h2>Titre d&apos;origine</h2>
            <h3 style={Titlesize(props.original_title)}>{props.original_title}</h3>
            <h2>Date de sortie</h2>
            <h3>{props.release_date}</h3>
            <h2>Note</h2>
            <h3 style={NoteColor(props.vote_average)}>{props.vote_average}/10</h3>
            <h3>Noté par {props.vote_count} personne</h3>
            <h2>Durée</h2>
            <h3>{DureeH(props.runtime)}</h3>
        </div>)
    }
    return element
}
function infoFilmRight(props: FilmOrSerie, back: MouseEventHandler) {
    let Serie = (props.name ? true : false)
    let element: JSX.Element
    if (Serie) {
        element = (<div className={styles.right}>
            <h2>{props.name}</h2>
            <div className={styles.genre}>{props.genres.map((content: Genre, index: number) => (Splitand(content.name, index)))}
            </div>
            <p>
                {props.overview}
            </p>
            <h3 className={styles.back} onClick={back}>Retour</h3>
            <h4 className={styles.more}>{"<<"} En savoir plus</h4>
        </div>)
    } else {
        element = (<div className={styles.right}>
            <h2>{props.title}</h2>
            <div className={styles.genre}>{props.genres.map((content: Genre, index: number) => (Splitand(content.name, index)))}
            </div>
            <p>
                {props.overview}
            </p>
            <h3 className={styles.back} onClick={back}>Retour</h3>
            <h4 className={styles.more}>{"<<"} En savoir plus</h4>
        </div>)
    }
    return element
}
export default class GetInfo extends Component<{ content: FilmOrSerie, back: any }> {
    render() {
        return (<div id="Darken" className={styles.Darken}>
            <div className={styles.infoFilm}>
                {infoFilmLeft(this.props.content)}
                {infoFilmRight(this.props.content, this.props.back)}
            </div>
        </div>)
    }
}