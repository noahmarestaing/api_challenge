import React, { useEffect, useState } from 'react'
import { useShoppingContext } from '../contexts/shoppingContext'
import CategoryOptions from './categoryOptions'
import TopBar from './topbar'

export default function EntryScreen () {
    const shoppingContext = useShoppingContext()

    useEffect(() => {
        shoppingContext.getCatalog()
    }, [])

    

    return (
        <div>
            <TopBar
                title = {"Categories"}
            />
            <CategoryOptions/>
        </div>
    )
}