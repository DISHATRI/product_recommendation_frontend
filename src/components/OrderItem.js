import React from "react";

const OrderItem = props => {
  const { orderItem } = props;
  return (
    <div className="card is-half is-centered" style={{backgroundColor:"rgb(255,235,103)",margin:"10px 10px 10px 10px",width:"650px",height:"160px"}}>
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img
                src="https://bulma.io/images/placeholders/128x128.png"
                alt={orderItem.shortDesc}
              />
            </figure>
          </div>
          <div className="media-content">
            <b style={{ textTransform: "capitalize"}}>
            <span style={{fontFamily:'Comfortaa',fontSize:"20px"}}>{orderItem.name}</span><br/>
            <span className="tag is-primary" style= {{color: 'white',textDecoration: 'none'}}>
                <p><ins className = 'amount' style = {{color: 'white'}}>{orderItem.oprice}</ins></p>
            </span>
            </b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;