import styles from './film.module.css'
import Image from 'next/image'
import { FilmInt } from './filmInterface'
import { SerieInt } from './serieInterface'
import { Fragment } from 'react'
import { Default, Mobile } from '../../global/reponsive/function'
import { ClientOnly } from '../../global/reponsive/function'
import ReactDOM from 'react-dom'
import GetInfo from '../filmInfo/filmInfo'
export type FilmOrSerie = FilmInt & SerieInt
function boutonLandscape(props: FilmOrSerie, func: any) {
    let Serie = props.name ? true : false
    return (<div id="Imagep2" className={styles.bouton} onClick={() => { func(props) }}>
        <Image src={"https://image.tmdb.org/t/p/w500" + props.backdrop_path} alt="" layout="fill" />
        <h2 id="BackTitlep2">{Serie ? props.name : props.title}</h2>
    </div>)
}
function boutonMobile(props: FilmOrSerie, func: any) {
    let Serie = props.name ? true : false
    return (<div id="Imagep2" className={styles.boutonMobile} onClick={() => { func(props) }}>
        <div className={styles.divH2}>
            <h4>{Serie ? props.name : props.title}</h4>
        </div>
        <Image src={"https://image.tmdb.org/t/p/w500" + props.poster_path} alt="" layout="fill" />
    </div>)
}
export function Film(props: FilmOrSerie, func: any) {
    return (<Fragment key={props.imdb_id} >
        <ClientOnly><Default>{boutonLandscape(props, func)}</Default>
            <Mobile>{boutonMobile(props, func)}</Mobile></ClientOnly>
    </Fragment >)
}
export default Film