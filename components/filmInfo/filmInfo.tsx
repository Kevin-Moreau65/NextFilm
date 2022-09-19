import { Component, Fragment, MouseEventHandler } from 'react'
import Image from 'next/image';
import { FilmOrSerie } from '../film/film'
import { Genre } from '../film/filmInterface';
import styles from './filmInfo.module.css'
import { DureeH, NoteColor, Splitand, Titlesize } from './function';
import { Default, Mobile } from '../../global/reponsive/function';
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
function infoFilmTop(props: FilmOrSerie) {
    let Serie = (props.name ? true : false)
    let element: JSX.Element
    if (Serie) {
        element = <div className={styles.top}>
            <div>
                <Image alt="" src={"https://image.tmdb.org/t/p/w500/" + props.backdrop_path} layout="fill" />
            </div>
            <h2>{props.name}</h2>
        </div>
    } else {
        element = <div className={styles.top}>
            <div>
                <Image alt="" src={"https://image.tmdb.org/t/p/w500/" + props.backdrop_path} layout="fill" />
            </div>
            <h2>{props.title}</h2>
        </div>
    }
    return element
}
export default class GetInfo extends Component<{ content: FilmOrSerie, back: () => void }, { display: string }> {
    constructor(props: { content: FilmOrSerie, back: () => void }) {
        super(props)
        this.state = {
            display: "Résumé"
        }
        this.display = this.display.bind(this)
        this.changeDisplay = this.changeDisplay.bind(this)
    }
    changeDisplay(string: string) {
        this.setState({
            display: string
        })
    }
    display() {
        let element: JSX.Element
        switch (this.state.display) {
            case "Résumé":
                element = <div className={styles.resume}><p>{this.props.content.overview}</p></div>
                return element
            case "Genres":
                element = <div className={styles.divGenres}>{this.props.content.genres.map((content: Genre, index: number) => (Splitand(content.name, index)))}</div>
                return element
            case "Info":
                if (this.props.content.name !== undefined) {
                    element = <div className={styles.divInfo}><h2>Type</h2>
                        <h3>Série</h3>
                        <h2>Titre d&apos;origine</h2>
                        <h3 style={Titlesize(this.props.content.original_name)}>{this.props.content.original_name}</h3>
                        <h2>Date de sortie</h2>
                        <h3>{this.props.content.first_air_date}</h3>
                        <h2>Note</h2>
                        <h3 style={NoteColor(this.props.content.vote_average)}>{this.props.content.vote_average}/10</h3>
                        <h3>Noté par {this.props.content.vote_count} personne</h3>
                        <h2>Durée</h2>
                        <h3>Nombre d&apos;épisode : {this.props.content.number_of_episodes}</h3>
                        <h3>Durée par episode : {this.props.content.episode_run_time[0]} min</h3>
                        <h3>Saisons : {this.props.content.number_of_seasons}</h3></div>
                    return element
                } else {
                    element = <div className={styles.divInfo}><h2>Type</h2>
                        <h3>Film</h3>
                        <h2>Titre d&apos;origine</h2>
                        <h3 style={Titlesize(this.props.content.original_title)}>{this.props.content.original_title}</h3>
                        <h2>Date de sortie</h2>
                        <h3>{this.props.content.release_date}</h3>
                        <h2>Note</h2>
                        <h3 style={NoteColor(this.props.content.vote_average)}>{this.props.content.vote_average}/10</h3>
                        <h3>Noté par {this.props.content.vote_count} personne</h3>
                        <h2>Durée</h2>
                        <h3>{DureeH(this.props.content.runtime)}</h3></div>
                    return element
                }
        }
    }
    render() {
        return (<Fragment>
            <Default>
                <div id="Darken" className={styles.Darken}>
                    <div className={styles.infoFilm}>
                        {infoFilmLeft(this.props.content)}
                        {infoFilmRight(this.props.content, this.props.back)}
                    </div>
                </div>
            </Default>
            <Mobile>
                <Fragment>
                    <div className={styles.divMobile}>
                        {infoFilmTop(this.props.content)}
                        <div className={styles.bottom}>
                            <div className={styles.divButton}>
                                <h3 onClick={() => { this.changeDisplay("Résumé") }} className={this.state.display === "Résumé" ? styles.selected : undefined}>Résumé</h3>
                                <h3 onClick={() => { this.changeDisplay("Genres") }} className={this.state.display === "Genres" ? styles.selected : undefined}>Genres</h3>
                                <h3 onClick={() => { this.changeDisplay("Info") }} className={this.state.display === "Info" ? styles.selected : undefined}>Info</h3>
                            </div>
                        </div>
                        {this.display()}
                    </div>
                    <div className={styles.backBTN}><h3 onClick={this.props.back}>{"<"}</h3></div>
                </Fragment>
            </Mobile>
        </Fragment>)
    }
}