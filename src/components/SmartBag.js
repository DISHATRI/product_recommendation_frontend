import React from "react";
import ProductDeal from "./ProductDeal";
import withContext from "../withContext";
import {
  MemoryRouter as Router,
  Route,
  Switch,
  Link,
} from "react-router-dom";

const ProductList = props => {
  const { user } = props.context;
  console.log(user.smartbag)
  const keys = Object.keys(user.smartbag);
  //const products = user.smartbag['top'];
  console.log(user.smartbag)
  return (
    <Router>
      <div className="hero is-primary" style={{backgroundColor:"#26a541"}}>
        <div className="hero-body container">
          <h4 className="title" style={{fontFamily:'Patrick Hand SC',fontSize:'48px'}}>Smart Bag</h4>
        </div>
      </div>
      <br />
      <div className="container">
        <div className="column columns is-multiline">
      {keys.map((key) => {
          key
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
           return (
            <Link className="card " to={`/smartbag/${key}`} style={{backgroundColor:"#3e8ed0",margin:"10px 10px 10px 10px",width:"425px",color:"#f0f0f0"}}>
              <div className="card-content ">
                <div className="title has-text-centered" style={{color:"#f0f0f0",fontSize : "2em",fontFamily: 'Gluten'}}>
                  {key}
                </div>
              </div>
            </Link>
        )})}
        </div>
        </div>
      <Switch>
        <Route path={`/smartbag/:maj`}>
            <ProductDeal productList={user.smartbag} />
        </Route>
      </Switch>
    </Router>
  );
};

export default withContext(ProductList);