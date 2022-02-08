import { Component } from "react";
import Graph from "../../components/graph/graph";
import SimpleStat from "../../components/graph/simpleStat";
import dbConnect from "../../global/db/database";
import { MStat, Statistiques } from "../../global/db/schema";
import { Default, Mobile } from "../../global/reponsive/function";
import styles from '../../styles/stats.module.css'

class Stats extends Component<{ stats: Statistiques, arrayGenre: Object[], arrayAnnee: Object[], note: any }> {
    color: { film: string; serie: string; };
    constructor(props: { stats: Statistiques, arrayGenre: any[], arrayAnnee: Object[], note: any }) {
        super(props)
        this.color = {
            film: "#485875",
            serie: "#944d4d"
        }
    }
    render() {
        return <div className={styles.main}>
            <h1 style={{ textAlign: "center" }}>Statistique</h1>
            <div className={styles.content}>
                <Default>
                    <Graph title="Minute de film/série" type="pie" data={{ tout: [{ name: "film", value: this.props.stats.film.totalTime }, { name: "série", value: this.props.stats.serie.totalTime }] }} />
                    <Graph title="Nombre de film/série" type="pie" data={{ tout: [{ name: "film", value: this.props.stats.film.total }, { name: "série", value: this.props.stats.serie.total }] }} />
                    <Graph title="Nombre de film/série par genre" type="bar" data={{ tout: this.props.arrayGenre }} solo={true} modulable={true} />
                    <Graph title="Nombre de film/série par année" type="bar" data={{ tout: this.props.arrayAnnee }} solo={true} modulable={true} />
                    <SimpleStat title="Film/série moins bien noté" data={this.props.note.moins} modulable={true} displayValue="Note :" comparison="-" />
                    <SimpleStat title="Film/série mieux noté" data={this.props.note.mieux} modulable={true} displayValue="Note :" comparison="+" />
                </Default>
                <Mobile>
                    <Graph title="Minute de film/série" type="pie" data={{ tout: [{ name: "film", value: this.props.stats.film.totalTime }, { name: "série", value: this.props.stats.serie.totalTime }] }} />
                    <Graph title="Nombre de film/série" type="pie" data={{ tout: [{ name: "film", value: this.props.stats.film.total }, { name: "série", value: this.props.stats.serie.total }] }} />
                    <Graph title="Nombre de film/série par genre" type="bar" data={{ tout: this.props.arrayGenre }} solo={true} modulable={true} nightMode={true} />
                    <Graph title="Nombre de film/série par année" type="bar" data={{ tout: this.props.arrayAnnee }} solo={true} modulable={true} nightMode={true} />
                    <SimpleStat title="Film/série moins bien noté" data={this.props.note.moins} modulable={true} displayValue="Note :" comparison="-" nightMode={true} />
                    <SimpleStat title="Film/série mieux noté" data={this.props.note.mieux} nightMode={true} modulable={true} displayValue="Note :" comparison="+" />
                </Mobile>
            </div>
        </div>
    }
}
export const getStaticProps = async () => {
    await dbConnect()
    let statistique: Statistiques[] = await MStat.find({})
    let string = JSON.stringify(statistique[0])
    let stats: Statistiques = JSON.parse(string)
    let arrayGenreAll: any[] = []
    let arrayAnneeAll: any[] = []
    for (let [key, value] of Object.entries(stats.film.genre)) {
        if (key === "ScienceFiction") {
            key = "SF"
        }
        let objectAll = { name: key, film: value }
        arrayGenreAll.push({ ...objectAll })
    }
    for (let [key, value] of Object.entries(stats.serie.genre)) {
        if (key === "ScienceFiction") {
            key = "SF"
        }
        let objectAll = { name: key, serie: value }
        if (!arrayGenreAll.find(x => x.name === key)) {
            arrayGenreAll.push({ ...objectAll })
        } else {
            arrayGenreAll.find(x => x.name === key).serie = value
        }
    }
    for (let [key, value] of Object.entries(stats.film.Annee)) {
        let objectAll = { name: key, film: value }
        arrayAnneeAll.push({ ...objectAll })
    }
    for (let [key, value] of Object.entries(stats.serie.Annee)) {
        let objectAll = { name: key, serie: value }
        if (!arrayAnneeAll.find(x => x.name === key)) {
            arrayAnneeAll.push({ ...objectAll })
        } else {
            arrayAnneeAll.find(x => x.name === key).serie = value
        }
    }
    let mieuxNote = { film: { titre: stats.film.mieuxNote.titre, value: stats.film.mieuxNote.note }, serie: { titre: stats.serie.mieuxNote.titre, value: stats.serie.mieuxNote.note } }
    let moinsNote = { film: { titre: stats.film.moinsNote.titre, value: stats.film.moinsNote.note }, serie: { titre: stats.serie.moinsNote.titre, value: stats.serie.moinsNote.note } }
    console.log(mieuxNote)
    return {
        props: {
            stats: stats,
            arrayGenre: arrayGenreAll,
            arrayAnnee: arrayAnneeAll,
            note: { moins: moinsNote, mieux: mieuxNote }
        },
        revalidate: 30
    }
}
export default Stats