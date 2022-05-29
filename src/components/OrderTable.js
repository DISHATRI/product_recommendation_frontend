import React from "react";
import OrderItem from "./OrderItem";
import withContext from "../withContext";
import { useParams } from "react-router-dom";

const OrderTable = (props) => {
  const { orderList } = props;
  const { key } = useParams();
  let orders = orderList[key].pro_det;
console.log(orderList)
  return (
    <>
      <div className="hero is-primary" style={{backgroundColor:"#26a541"}}>
        <div className="hero-body container">
          <h4 className="title" style={{fontFamily:'Patrick Hand SC',fontSize:'46px'}}>Products</h4>
        </div>
      </div>
      <br />
      <div className="container">
        <div className="columns is-multiline">
          {orders && orders.length ? (
            orders.map((order) => (
              <OrderItem orderItem={order}/>
            ))
          ) : (
            <div className="column">
              <span className="title has-text-grey-light">
                No products found!
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default withContext(OrderTable);