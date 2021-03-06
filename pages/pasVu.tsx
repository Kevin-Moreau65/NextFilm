/* eslint-disable @next/next/link-passhref */
import Head from 'next/head';
import Film, { FilmOrSerie } from "../components/film/film";
import styles from '../styles/indexfilm.module.css'
import { Component, Fragment } from 'react';
import opacity from '../components/filmInfo/opacity.module.css'
import GetInfo from '../components/filmInfo/filmInfo';
import { CSSTransition } from 'react-transition-group';
import { Mobile, Default, ClientOnly } from '../global/reponsive/function'
import Link from 'next/link'
import { MFilmPasVu } from '../global/db/schema';
import dbConnect from '../global/db/database';
class Indexfilm extends Component<{ arrayresult: FilmOrSerie[] }, { getInfo: boolean, info: FilmOrSerie }> {
    array: Array<FilmOrSerie>
    constructor(props: { arrayresult: FilmOrSerie[] }) {
        super(props)
        this.array = this.props.arrayresult
        this.state = {
            getInfo: false,
            info: this.array[0]
        }
        this.InfoFilm = this.InfoFilm.bind(this)
        this.back = this.back.bind(this)
    }
    InfoFilm(props: FilmOrSerie) {
        this.setState({
            getInfo: true,
            info: props
        })
    }
    back() {
        this.setState({
            getInfo: false
        })
    }
    render() {
        return (
            <div className={styles.body} key={"ORIGINAL"}>
                <Head>
                    <title>Film</title>
                </Head>
                <Mobile>
                    <ClientOnly>
                        <div className={styles.MobHeader}>
                            <div className={styles.MobBTN} style={{ left: "15px" }}>
                                <h3>+</h3>
                            </div>
                            <Link href="/indexfilm">
                                <div className={styles.MobBTN} style={{ right: "15px" }}>
                                    <h4>Pvu</h4>
                                </div>
                            </Link>
                        </div>
                    </ClientOnly>
                </Mobile>
                <h1 style={{ textAlign: "center" }} key={"H1"}>Recap des films <Link href="/"><a className={styles.seen}>pas vu</a></Link> avec la salopette</h1>
                <div className={styles.main} key={"MAIN"}>
                    {this.array.map((content: FilmOrSerie) => (
                        <Fragment key={content.id}>
                            {Film(content, this.InfoFilm)}
                        </Fragment>
                    ))}
                </div>
                <CSSTransition in={this.state.getInfo} classNames={opacity} timeout={200} unmountOnExit>
                    <GetInfo content={this.state.info} back={this.back}></GetInfo>
                </CSSTransition>
            </div>
        )
    }
}
export const getStaticProps = async () => {
    let arrayresult: Array<FilmOrSerie> = []
    await dbConnect()
    let films = await MFilmPasVu.find({})
    for await (let val of Object.values(films[0].film)) {
        const res = await fetch("https://api.themoviedb.org/3" +
            val +
            "?api_key=c8ba3cbfd981404e3c6a588adfbce2d5&language=fr-FR")
        const result: FilmOrSerie = await res.json()
        arrayresult.push(result)
    }
    return {
        props: {
            arrayresult
        },
        revalidate: 30
    }
}
export default Indexfilm