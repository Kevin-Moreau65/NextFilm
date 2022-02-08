import { Component, ReactNode } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Graph from "../../components/graph/graph";
import dbConnect from "../../global/db/database";
import { MStat, Statistiques } from "../../global/db/schema";
import { Default, Mobile } from "../../global/reponsive/function";
import styles from '../../styles/stats.module.css'

class Stats extends Component<{ stats: Statistiques, arrayGenre: Object[], arrayAnnee: Object[] }> {
    color: { film: string; serie: string; };
    constructor(props: { stats: Statistiques, arrayGenre: any[], arrayAnnee: Object[] }) {
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
                </Default>
                <Mobile>
                    <Graph title="Minute de film/série" type="pie" data={{ tout: [{ name: "film", value: this.props.stats.film.totalTime }, { name: "série", value: this.props.stats.serie.totalTime }] }} />
                    <Graph title="Nombre de film/série" type="pie" data={{ tout: [{ name: "film", value: this.props.stats.film.total }, { name: "série", value: this.props.stats.serie.total }] }} />
                    <Graph title="Nombre de film/série par genre" type="bar" data={{ tout: this.props.arrayGenre }} solo={true} modulable={true} nightMode={true} />
                    <Graph title="Nombre de film/série par année" type="bar" data={{ tout: this.props.arrayAnnee }} solo={true} modulable={true} nightMode={true} />
                </Mobile>
                {/*<Graph title="Nombre de film/série par année" solo={true}>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart
                            data={this.props.arrayGenre[0]}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid stroke="black" />
                            <XAxis dataKey="name" stroke="black" />
                            <YAxis stroke="black" />
                            <Tooltip cursor={false} />
                            <Bar dataKey="film" stackId="a" fill={this.color.film} />
                            <Bar dataKey="serie" stackId="a" fill={this.color.serie} />
                        </BarChart>
                    </ResponsiveContainer>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart
                            data={this.props.arrayGenre[1]}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid stroke="black" />
                            <XAxis dataKey="name" stroke="black" />
                            <YAxis stroke="black" />
                            <Tooltip cursor={false} />
                            <Bar dataKey="nombre" fill={this.color.film} />
                        </BarChart>
                    </ResponsiveContainer>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart
                            data={this.props.arrayGenre[2]}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid stroke="black" />
                            <XAxis dataKey="name" stroke="black" />
                            <YAxis stroke="black" />
                            <Tooltip cursor={false} />
                            <Bar dataKey="nombre" fill={this.color.serie} />
                        </BarChart>
                    </ResponsiveContainer>
                </Graph> */}
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
    return {
        props: {
            stats: stats,
            arrayGenre: arrayGenreAll,
            arrayAnnee: arrayAnneeAll
        },
        revalidate: 30
    }
}
export default Stats