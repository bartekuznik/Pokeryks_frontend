import React from "react"
import "../App.css"

export default function RankRecord(props){
    return(
        <div className="rank--record">
            <p>{props.e.player}</p>
            <p>{props.e.win_number}</p>
        </div>
    )
}