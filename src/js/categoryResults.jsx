import React, {useState, useEffect} from 'react'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useShoppingContext } from '../contexts/shoppingContext';
import TopBar from './topbar';
import CategoryOptions from './categoryOptions';
import CloseIcon from '@material-ui/icons/Close';


export default function CategoryResults (props) {
    const shoppingContext = useShoppingContext()
    
    const [resultsContent, setResultsContent] = useState(null)
    const [results, setResults] = useState([])
    const [currentProductModal, setCurrentProductModal] = useState([])

    const [currentProduct, setCurrentProduct] = useState({
        display: false,
        description: "default",
        name: "default",
        price: 0.00,
        manufacturerName: "default",
        location: "los, angeles",
        imageUrl: "any",
    })

    function addToCart () {
        shoppingContext.updateCart(currentProduct)
        exitProductModal()
    }

    function exitProductModal() {
        let tmpProduct = currentProduct;
        tmpProduct.display = false;
        setCurrentProduct(tmpProduct);
        setCurrentProductModal(<div></div>)
        
    }
    

    function renderCurrentProductModal() {
        if (currentProduct.display === true) {
            return (
                <div id="ProductModalDiv">
                <div id="ProductModalBackground" onClick={exitProductModal}> </div>
                <div id="ProductModal">
                    <div id="ProductModalTop">{currentProduct.name} <div id="CloseIcon" onClick={exitProductModal}><CloseIcon/></div></div>
                    <div id="ProductModalText">Description: {currentProduct.description}</div>
                    <div id="ProductModalText">Manufacturer: {currentProduct.manufacturerName}</div>
                    <div id="ProductModalText">Location: {currentProduct.location}</div>
                    <div id="AddToCartButton" onClick={addToCart}>Add to Cart</div>
                </div>
                </div>
            )
        }
        else {
            return(<div></div>)
        }
    }

    

    function updateCurrentProductModal(display, description, name, price, manufacturerName, location, imageUrl) {
        setCurrentProduct ({
            display: true,
            description: description,
            name: name,
            price: price,
            manufacturerName: manufacturerName,
            location: location,
            imageUrl: imageUrl,
        })
    }


    useEffect(() => {
        for (let i = 0; i < shoppingContext.items.length; i++) {
            if (shoppingContext.items[i].name === props.name) {
                setResultsContent(shoppingContext.items[i])
                console.log(shoppingContext.items[i])
            }
        }
        
    }, [])

    //get the minimum price variant id 
    function lowPrice(variants) {
        let minID = 0;
        for (let i = 0; i < variants.length; i++) {
            if (Math.round(variants[i].prices.regular) < Math.round(variants[minID].prices.regular)) minID = i
        }
        return minID
    }

    //get the id of the image url
    function thumbnailID(product) {
        let minId = lowPrice(product.variants)
        let variantName = product.variants[minId].name
        let imageID = 0
        for (let i = 0; i < product.images.length; i++) {
            if (product.images[i].option === variantName) {
                imageID = i
            }
        }
        return imageID
    }

    

    useEffect(() => {
        let newResults = []
        if (resultsContent != null) {
            for (let i = 0; i < resultsContent.products.length; i++) {
                let minID = lowPrice(resultsContent.products[i].variants)
                let url = resultsContent.products[i].images[thumbnailID(resultsContent.products[i])].url
                newResults.push(
                    <div id="CategoryResult" onClick={() =>updateCurrentProductModal(
                        true,
                        resultsContent.products[i].description,
                        resultsContent.products[i].name,
                        Math.round(resultsContent.products[i].variants[minID].prices.regular),
                        resultsContent.products[i].manufacturer.name,
                        resultsContent.products[i].manufacturer.location,
                        url
                    )}>
                        <img src = {url} id="CategoryResultImage"/>
                        <div id ="CategoryResultText">
                            <div id="CategoryResultTextLeft">{resultsContent.products[i].name}</div>
                            <div id="CategoryResultTextRight">${Math.round(resultsContent.products[i].variants[minID].prices.regular)}</div>
                        </div>
                    </div>
                )
            }
        }
        setResults(newResults)
    }, [resultsContent])

    

    return (
        <div>
            <TopBar 
                title = {props.name}
            />
            {renderCurrentProductModal()}
            <CategoryOptions/>
            <div id= "CategoryResultsDiv">{results}</div>
       </div>
    )
}