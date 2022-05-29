import React from "react";
import ProductList from "./ProductList";
import withContext from "../withContext";
import {
  MemoryRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

const ProductType = (props) => {
  const { productList } = props;
  let { min } = useParams();
  let match = useRouteMatch();
  console.log(productList);
  return (
    <Router>
      <div className="hero is-primary" style={{backgroundColor:"#26a541"}}>
        <div className="hero-body container">
          <h4 className="title" style={{fontFamily:'Patrick Hand SC',fontSize:'40px'}}>Product Types</h4>
        </div>
      </div>
      <br />
      <div className="container">
        <div className="column columns is-multiline">
          {Object.keys(productList[min]).map((key) => (
            <Link className="card" to={`/${match.url}/${key}`} style={{backgroundColor:"#3e8ed0",margin:"10px 10px 10px 10px",width:"425px",color:"#f0f0f0"}}>
              <div className="card-content">
                <div className="title has-text-centered" style={{color:"#f0f0f0",fontSize : "2em",fontFamily: 'Gluten'}}>
                  {key
                    .toLowerCase()
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Switch>
        <Route path={`/${match.url}/:type`}>
          <ProductList productList={productList[min]} />
        </Route>
      </Switch>
    </Router>
  );
};

export default withContext(ProductType);
