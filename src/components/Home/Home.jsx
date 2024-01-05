import React from 'react'
import Products from '../ProductsPage/Products'
import GetUserRecipe from '../UserRecipe/GetUserRecipe/GetUserRecipe'
import YourRecipe from '../UserRecipe/YourRecipe/YourRecipe'

const Home = () => {
    return (
        <>
            <Products />
            <GetUserRecipe />
            <YourRecipe />
        </>
    )
}

export default Home;