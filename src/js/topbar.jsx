import React from 'react'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default function TopBar (props) {
    return (
        <div id="TopBarDiv">
            <div id = "TopBarText">{props.title}</div>
            <Link to="/cart"><div id = "CartIcon"><ShoppingCartIcon style = {{fontSize: 30}}/></div></Link>


        </div>
    )
}