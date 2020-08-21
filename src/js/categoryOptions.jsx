import React, { useEffect, useState } from 'react'
import { useShoppingContext } from '../contexts/shoppingContext'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default function CategoryOptions (props) {
    const shoppingContext = useShoppingContext()
    const [categoryOptions, setCategoryOptions] = useState([<div></div>])

    function renderCategoryOption(name, path) {
        return (
            
            <Link to={path} id="CategoryOptionElement">
            <div id="CategoryOptionText">
                {name}
            </div>
            </Link>
            
        )
        
    }

    useEffect(() => {
        let newCategoryOptions = []
        for (let i = 0; i < shoppingContext.categories.length; i++) {
            newCategoryOptions.push(
                <div>
                   {renderCategoryOption(shoppingContext.categories[i].name, shoppingContext.categories[i].path)}
                
                </div>
            )
        }
        setCategoryOptions(newCategoryOptions)
    }, [shoppingContext.categoriesIsDirty])


    return (
        <div id="CategoryOptionsDiv">
           {categoryOptions}
        </div>
    )


}