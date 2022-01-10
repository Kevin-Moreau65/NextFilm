import style from "./popup.module.css"
export default function Popup(props: { phrase?: string, error: boolean }): JSX.Element {
    let red = "rgb(187, 37, 37)"
    let green = "green"
    let color = props.error ? red : green
    return <div className={style.pop}><h3 style={{ backgroundColor: color }}>{props.phrase}</h3></div>
}