import React from "react";
import OrderTable from "./OrderTable";
import withContext from "../withContext";
import {
  MemoryRouter as Router,
  Route,
  Switch,
  Link,
} from "react-router-dom";


const Cart = props => {
  const { user } = props.context;
  const orderHis = user.orderHis;
  const keys = Object.keys(orderHis || {});
  console.log(orderHis)
  return (
    <Router>
      <div className="hero is-primary" style={{backgroundColor:"#26a541"}}>
        <div className="hero-body container">
          <h4 className="title" style={{fontFamily:'Patrick Hand SC',fontSize:'48px'}}>Order History</h4>
        </div>
      </div>
      <br />
      <div className="container">
        <div className="column columns is-multiline">
      {keys.map((key) => {
           return (
            <Link className="card " to={`/orderHis/${key}`} style={{backgroundColor:"#3e8ed0",margin:"10px 10px 10px 10px",width:"425px",color:"#f0f0f0"}}>
              <div className="card-content ">
                <div className="title has-text-centered" style={{color:"#f0f0f0",fontSize : "2em",fontFamily: 'Gluten'}}>
                  Order Id: {key}
                </div>
              </div>
            </Link>
        )})}
        </div>
        </div>
      <Switch>
        <Route path={`/orderHis/:key`}>
            <OrderTable orderList={user.orderHis} />
        </Route>
      </Switch>
    </Router>
  );
};

export default withContext(Cart);