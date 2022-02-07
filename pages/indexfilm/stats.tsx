import { Component, ReactNode } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Graph from "../../components/graph/graph";
import { CalcStatsRegen } from "../../global/db/CalcStat";
import dbConnect from "../../global/db/database";
import { MStat, Statistiques } from "../../global/db/schema";
import { Default, Mobile } from "../../global/reponsive/function";
import styles from '../../styles/stats.module.css'

class Stats extends Component<{ stats: Statistiques, arrayGenre: any[] }> {
    color: { film: string; serie: string; };
    constructor(props: { stats: Statistiques, arrayGenre: any[] }) {
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
                <Graph title="Minute de film/série">
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={[{ name: "Film", value: this.props.stats.film.totalTime }, { name: "Série", value: this.props.stats.serie.totalTime }]}
                                outerRadius={100}
                                fill="#8884d8"
                                label
                                stroke="none"
                            >
                                <Cell key={`cell-0`} fill={this.color.film} />
                                <Cell key={`cell-1`} fill={this.color.serie} />
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </Graph>
                <Graph title="Nombre de film/série">
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={[{ name: "Film", value: this.props.stats.film.total }, { name: "Série", value: this.props.stats.serie.total }]}
                                outerRadius={100}
                                fill="#8884d8"
                                label
                                stroke="none"
                            >
                                <Cell key={`cell-0`} fill={this.color.film} />
                                <Cell key={`cell-1`} fill={this.color.serie} />
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </Graph>
                <Graph title="Nombre de film/série par genre" solo={true}>
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
                </Graph>
                <Graph title="Nombre de film/série par année" solo={true}>
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
                </Graph>
            </div>
        </div>
    }
}
export const getStaticProps = async () => {
    await dbConnect()
    let statistique: Statistiques[] = await MStat.find({})
    let string = JSON.stringify(statistique[0])
    let stats: Statistiques = JSON.parse(string)
    let arrayGenre = []
    let arrayGenreAll: any[] = []
    let arrayGenreFilm = []
    let arrayGenreSerie = []
    for (let [key, value] of Object.entries(stats.film.genre)) {
        if (key === "ScienceFiction") {
            key = "SF"
        }
        let object = { name: key, nombre: value }
        let objectAll = { name: key, film: value }
        arrayGenreAll.push({ ...objectAll })
        arrayGenreFilm.push({ ...object })
    }
    for (let [key, value] of Object.entries(stats.serie.genre)) {
        if (key === "ScienceFiction") {
            key = "SF"
        }
        let object = { name: key, nombre: value }
        let objectAll = { name: key, serie: value }
        if (!arrayGenreAll.find(x => x.name === key)) {
            arrayGenreAll.push({ ...objectAll })
        } else {
            arrayGenreAll.find(x => x.name === key).serie = value
        }
        arrayGenreSerie.push(object)
    }
    arrayGenre.push(arrayGenreAll)
    arrayGenre.push(arrayGenreFilm)
    arrayGenre.push(arrayGenreSerie)
    console.log(stats.serie.total)
    return {
        props: {
            stats: stats,
            arrayGenre: arrayGenre
        },
        revalidate: 30
    }
}
export default Stats