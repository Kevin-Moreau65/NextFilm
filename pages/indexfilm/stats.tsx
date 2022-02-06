import { Component, ReactNode } from "react";
import Graph from "../../components/graph/graph";
import styles from '../../styles/stats.module.css'

class Stats extends Component<{}> {
    render() {
        return <div >
            <h1 style={{ textAlign: "center" }}>Statistique</h1>
            <div className={styles.content}>
                <Graph title="Test">
                    <div>Yo</div>
                </Graph>
                <Graph title="Test2">
                    <div>Tout</div>
                    <div>Serie</div>
                    <div>Film</div>
                </Graph>
            </div>
        </div>
    }
}
export default Stats