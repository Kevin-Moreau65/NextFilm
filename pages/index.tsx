/* eslint-disable @next/next/link-passhref */
import { MFilmVu } from '../global/db/schema';
import Head from 'next/head';
import Film, { FilmOrSerie } from "../components/film/film";
import styles from '../styles/indexfilm.module.css'
import { Component, Fragment } from 'react';
import opacity from '../components/filmInfo/opacity.module.css'
import GetInfo from '../components/filmInfo/filmInfo';
import { CSSTransition } from 'react-transition-group';
import { Mobile, Default, ClientOnly } from '../global/reponsive/function'
import Link from 'next/link'
import AddFilm from '../components/addFilm/addFilm';
import dbConnect from '../global/db/database';
import Popup from '../components/popup/popup';
class Indexfilm extends Component<{ arrayresult: FilmOrSerie[], resultTime: number }, { getInfo: boolean, info: FilmOrSerie, add: boolean, popup: { show: boolean, info?: string, error: boolean } }> {
    array: Array<FilmOrSerie>
    time: () => string
    constructor(props: { arrayresult: FilmOrSerie[], resultTime: number }) {
        super(props)
        this.time = () => {
            let j, h, m
            j = 0
            m = 0
            h = Math.floor(this.props.resultTime / 60)
            j = Math.floor(h / 24)
            m = this.props.resultTime - h * 60
            h = h - j * 24
            return j + " j " + h + " h " + m + " min"
        }
        this.array = this.props.arrayresult
        this.state = {
            getInfo: false,
            info: this.array[0],
            add: false,
            popup: {
                show: false,
                info: undefined,
                error: false
            }
        }
        this.InfoFilm = this.InfoFilm.bind(this)
        this.backInfo = this.backInfo.bind(this)
        this.addFilm = this.addFilm.bind(this)
        this.backAdd = this.backAdd.bind(this)
        this.popup = this.popup.bind(this)
    }
    InfoFilm(props: FilmOrSerie) {
        this.setState({
            getInfo: true,
            info: props
        })
    }
    popup(msg: string, error: boolean) {
        this.setState({
            popup: {
                show: true,
                info: msg,
                error: error
            }
        })
        setTimeout(() => {
            this.setState({
                popup: {
                    show: false,
                    error: error,
                    info: msg
                }
            })
        }, 5000)
    }
    backInfo() {
        this.setState({
            getInfo: false
        })
    }
    backAdd() {
        this.setState({
            add: false
        })
    }
    addFilm() {
        this.setState({
            add: true
        })
    }
    render() {
        return (
            <div className={styles.body} key={"ORIGINAL"}>
                <Head>
                    <title>Film</title>
                </Head>
                <CSSTransition in={this.state.popup.show} classNames={opacity} timeout={400} unmountOnExit>
                    <Popup phrase={this.state.popup.info} error={this.state.popup.error}></Popup>
                </CSSTransition>
                <Mobile>
                    <ClientOnly>
                        <div className={styles.MobHeader}>
                            <div className={styles.MobBTN} style={{ left: "15px" }}>
                                <h3 onClick={this.addFilm}>+</h3>
                            </div>
                            {/* <Link href="/indexfilm/pasVu">
                                <div className={styles.MobBTN} style={{ right: "15px" }}> */}
                                    <h4>Vu</h4>
                                {/* </div>
                            </Link> */}
                        </div>
                    </ClientOnly>
                </Mobile>
                <h1 style={{ textAlign: "center", padding: "0px 10px" }} key={"H1"}>Recap des films {/*<Link href="pasVu"><a className={styles.seen}>*/}vu{/*</a></Link>*/} avec la salopette</h1>
                <h1 style={{ textAlign: "center", padding: "0px 10px" }}><Link href="stats"><a className={styles.seen}>{this.time()}</a></Link> de contenu regardé !</h1>
                <Default><h2 onClick={this.addFilm}>Ajouter</h2></Default>
                <div className={styles.main} key={"MAIN"}>
                    {this.array.map((content: FilmOrSerie) => (
                        <Fragment key={content.id}>
                            {Film(content, this.InfoFilm)}
                        </Fragment>
                    ))}
                </div>
                <CSSTransition in={this.state.getInfo} classNames={opacity} timeout={200} unmountOnExit>
                    <GetInfo content={this.state.info} back={this.backInfo}></GetInfo>
                </CSSTransition>
                <CSSTransition in={this.state.add} classNames={opacity} timeout={200} unmountOnExit>
                    <AddFilm back={this.backAdd} popup={this.popup}></AddFilm>
                </CSSTransition>
            </div>
        )
    }
}
export const getStaticProps = async () => {
    let arrayresult: Array<FilmOrSerie> = []
    await dbConnect()
    let films = await MFilmVu.find({})
    let resultTime = 0
    for await (let val of Object.values(films[0].film)) {
        const res = await fetch("https://api.themoviedb.org/3" +
            val +
            "?api_key=c8ba3cbfd981404e3c6a588adfbce2d5&language=fr-FR")
        const result: FilmOrSerie = await res.json()
        arrayresult.push(result)
        const time = result.runtime ? result.runtime : result.episode_run_time[0] * result.number_of_episodes
        resultTime += time > 0 ? time : 0
    }
    return {
        props: {
            arrayresult,
            resultTime
        },
        revalidate: 30
    }
}
export default Indexfilm