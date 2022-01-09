import style from "./popup.module.css"
export default function Popup(phrase: string) {
    console.log("uo")
    return <div className={style.pop}><h3>{phrase}</h3></div>
}