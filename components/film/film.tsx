import styles from './film.module.css'
import Image from 'next/image'
import { FilmInt } from './filmInterface'
import { SerieInt } from './serieInterface'
import { useMediaQuery } from 'react-responsive'
import { Fragment } from 'react'
export type FilmOrSerie = FilmInt & SerieInt
import { useEffect, useState } from 'react';

interface Props {
    children: any;
}

const ClientOnly: React.FC<Props> = ({ children }) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    return children;
};
const Mobile = ({ children }: any) => {
    const isMobile = useMediaQuery({ maxWidth: 768 })
    return isMobile ? children : null
}
const Default = ({ children }: any) => {
    const isDesktop = useMediaQuery({ minWidth: 769 })
    return isDesktop ? children : null
}
function boutonLandscape(props: FilmOrSerie) {
    let Serie = props.name ? true : false
    return (<div id="Imagep2" className={styles.bouton}>
        <Image src={"https://image.tmdb.org/t/p/w500" + props.backdrop_path} alt="" layout="fill" />
        <h2 id="BackTitlep2">{Serie ? props.name : props.title}</h2>
    </div>)
}
function boutonMobile(props: FilmOrSerie) {
    let Serie = props.name ? true : false
    return (<div id="Imagep2" className={styles.boutonMobile}>
        <div className={styles.divH2}>
            <h4>{Serie ? props.name : props.title}</h4>
        </div>
        <Image src={"https://image.tmdb.org/t/p/w500" + props.poster_path} alt="" layout="fill" />
    </div>)
}
export function Film(props: FilmOrSerie) {
    return (<Fragment key={props.imdb_id}>
        <ClientOnly><Default>{boutonLandscape(props)}</Default>
            <Mobile>{boutonMobile(props)}</Mobile></ClientOnly>
    </Fragment >)
}
export default Film