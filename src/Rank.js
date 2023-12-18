import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import NavBarr from './components/NavBarr';
import RankRecord from './components/RankRecord';
import "./App.css"

const Rank = () => {
    const [ranks, setRanks] = useState([])

    useEffect(() =>{
        fetch('http://127.0.0.1:8000/ranks/')
        .then(res => {
            return res.json()
        })
        .then((data)=>{
            setRanks(data)
        }) 
    }, [])

    const dataElement = ranks.map(e => {
        return <RankRecord key={e.id} e={e}/>
    })

    console.log(dataElement)

    return (
        <div>
            <NavBarr />
            <div className='rank--outer'>
                <div className='rank--div'>
                    <h1>This is the rank page</h1>
                    {dataElement}
                </div>
            </div>
        </div>
    )
}

export default Rank