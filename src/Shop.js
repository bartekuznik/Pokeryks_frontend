import React from 'react'
import { Link } from "react-router-dom";
import NavBarr from "./components/NavBarr";
import "./App.css"
import Button from 'react-bootstrap/Button';

const Shop = () => {
    return (
        <div className='abc'>
            <NavBarr />
            <div className='new'>
                <div className='inner'>
                    <div className='more--inner'>   
                    </div>
                    <div className="d-grid gap-2">
                            <Button variant="success" type="submit">
                                Kup premium!
                            </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop