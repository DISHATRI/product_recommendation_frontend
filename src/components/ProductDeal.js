import React from "react";
import ProductItem from "./ProductItem";
import withContext from "../withContext";
import { useParams } from "react-router-dom";

const ProductDeal = (props) => {
  const { productList } = props;
  const { maj } = useParams();
  let products = productList[maj];

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
          {products && products.length ? (
            products.map((product) => (
              <ProductItem
                className="column is-one-third is-narrow"
                product={product}
                key={product.item_id}
                addToCart={props.context.addToCart}
              />
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

export default withContext(ProductDeal);
