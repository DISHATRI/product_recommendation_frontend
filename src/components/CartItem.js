import React from "react";

const CartItem = props => {
  const { cartItem, cartKey } = props;

  const { product, amount } = cartItem;
  return (
    <div className=" card is-half" style={{backgroundColor:"rgb(255,235,103)",margin:"10px 10px 10px 10px",width:"650px",height:"160px"}}>
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img
                src="https://bulma.io/images/placeholders/128x128.png"
                alt={product.shortDesc}
              />
            </figure>
          </div>
          <div className="media-content">
            <b style={{ textTransform: "capitalize" ,fontFamily:'Comfortaa'}}>
              <span style={{fontFamily:'Comfortaa',fontSize:"20px"}}>{product.name}</span>{" "}<br/>
              <span className="tag is-primary">{product.dprice}</span>
            </b>
            <div>{product.shortDesc}</div>
            <small>{`${amount} in cart`}</small>
          </div>
          <div
            className="media-right"
            onClick={() => props.removeFromCart(cartKey)}
          >
            <span className="delete is-large has-background-info"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;