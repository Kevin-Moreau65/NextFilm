import dataJSON from '../json/filmVu.json'
import Head from 'next/head';
import Film, { FilmOrSerie } from "../components/film/film";
import styles from '../styles/indexfilm.module.css'
import { Fragment } from 'react';
function indexfilm({ arrayresult }: any) {
    return (
        <div className={styles.body} key={"ORIGINAL"}>
            <Head>
                <title>Film</title>
            </Head>
            <h1 style={{ textAlign: "center" }} key={"H1"}>Recap des film vu avec la salopette</h1>
            <div className={styles.main} key={"MAIN"}>
                {arrayresult.map((content: FilmOrSerie) => (
                    <Fragment key={content.id}>
                        {Film(content)}
                    </Fragment>
                ))}
            </div>
            <div id="infoFilm"></div>
        </div>
    )
}
export const getStaticProps = async () => {
    let arrayresult: Array<FilmOrSerie> = []
    for await (let val of Object.values(dataJSON)) {
        const res = await fetch("https://api.themoviedb.org/3" +
            val +
            "?api_key=c8ba3cbfd981404e3c6a588adfbce2d5&language=fr-FR")
        const result: FilmOrSerie = await res.json()
        arrayresult.push(result)
    }
    return {
        props: {
            arrayresult,
        },
        revalidate: 30
    }
}
export default indexfilm