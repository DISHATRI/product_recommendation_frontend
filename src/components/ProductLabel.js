import React from "react";
import ProductType from "./ProductType";
import withContext from "../withContext";
import {
  MemoryRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

const ProductLabel = (props) => {
  const { productList } = props;
  let { maj } = useParams();
  let match = useRouteMatch();
  console.log(productList);
  return (
    <Router>
      <div className="hero is-primary" style={{backgroundColor:"#26a541"}}>
        <div className="hero-body container">
          <h4 className="title" style={{fontFamily:'Patrick Hand SC'
          ,fontSize:'44px'}}>Minor Categories</h4>
        </div>
      </div>
      <br />
      <div className="container">
        <div className="column columns is-multiline">
          {Object.keys(productList[maj]).map((key) => (
            <Link className="card " to={`/${match.url}/${key}`} style={{backgroundColor:"#3e8ed0",margin:"10px 10px 10px 10px",width:"425px",color:"#f0f0f0"}}>
              <div className="card-content ">
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
        <Route exact path={`/${match.url}/:min`}>
          <ProductType productList={productList[maj]} />
        </Route>
      </Switch>
    </Router>
  );
};

export default withContext(ProductLabel);
