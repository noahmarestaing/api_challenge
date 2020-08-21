import React, {useEffect} from 'react';
import { render } from 'react-dom';

import '../style/index.scss';
import ShoppingProvider from '../contexts/shoppingContext';
import EntryScreen from './entryScreen';
import TopBar from './topbar';
import { Redirect } from 'react-router'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import CategoryResults from './categoryResults';
import CartScreen from './cartScreen';

class App extends React.Component {
  getWelcomeText = () => {
    return 'Show Me a Category Page Please';
  }

  render() {
    const welcomeText = this.getWelcomeText();
    return (
      <div>
        
        <ShoppingProvider>
          
          
          <Router>
            {/* <Redirect to="flowers"></Redirect> */}
            <Route exact path="/" component={EntryScreen}></Route>
            <Route path="/flowers/all">
              <CategoryResults
                name = {"All"}
              />
            </Route>
            <Route path="/flowers/bouquet-bundles">
              <CategoryResults
                name = {"Bouquet Bundles"}
              />
              </Route>
            <Route path="/cart">
              <CartScreen/>
            </Route>
            <Route path="/flowers/popular">
              <CategoryResults
                name = {"Popular"}
              />
            </Route>
            <Route path="/flowers/summer">
              <CategoryResults
                name = {"Summer"}
              />
            </Route>
            <Route path="/flowers/callas">
              <CategoryResults
                name = {"Callas"}
              />
            </Route>
            <Route path="/flowers/daisies">
              <CategoryResults
                name = {"Daisies"}
              />
            </Route>
            <Route path="/flowers/lilies">
              <CategoryResults
                name = {"Lilies"}
              />
            </Route>
            <Route path="/flowers/ranunculus">
              <CategoryResults
                name = {"Ranunculus"}
              />
            </Route>
            <Route path="/flowers/roses">
              <CategoryResults
                name = {"Roses"}
              />
            </Route>
            <Route path="/flowers/succulents">
              <CategoryResults
                name = {"Succulents"}
              />
            </Route>
            <Route path="/flowers/sunflowers">
              <CategoryResults
                name = {"Sunflowers"}
              />
            </Route>
            <Route path="/flowers/tulips">
              <CategoryResults
                name = {"Tulips"}
              />
            </Route>
            <Route path="/flowers/anniversary">
              <CategoryResults
                name = {"Anniversary"}
              />
            </Route>
            <Route path="/flowers/birthday">
              <CategoryResults
                name = {"Birthday"}
              />
            </Route>
            <Route path="/flowers/congratulations">
              <CategoryResults
                name = {"Congratulations"}
              />
            </Route>
            <Route path="/flowers/sympathy">
              <CategoryResults
                name = {"Sympathy"}
              />
            </Route>
            <Route path="/flowers/thank-you">
              <CategoryResults
                name = {"Thank You"}
              />
            </Route>
          </Router>
         
        </ShoppingProvider>
      </div>
    );
  }
}

render(
  
  <App />,
  document.getElementById('app'),
);
