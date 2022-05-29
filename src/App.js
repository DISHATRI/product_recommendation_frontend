import React, { Component } from "react";
import { Switch, Route, Link, MemoryRouter as Router } from "react-router-dom";

import AddProduct from "./components/AddProduct";
import Cart from "./components/Cart";
import Login from "./components/Login";

import FrontPage from "./components/FrontPage";

import Context from "./Context";

import axios from "axios";
import SmartBag from "./components/SmartBag";
import OrderHistory from "./components/OrderHistory";
import SignUp from "./components/SignUp";

import logo from './logo.png'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      cart: {},
      products: [],
    };
    this.routerRef = React.createRef();
  }
  async componentDidMount() {
    let user = localStorage.getItem("user");
    let cart = localStorage.getItem("cart");

    const products = await axios.get("https://shielded-sands-50569.herokuapp.com/api/frontpage/");
    console.log(products);
    user = user ? JSON.parse(user) : null;
    cart = cart ? JSON.parse(cart) : {};
    this.setState({ user, products: products.data, cart });
  }
  login = async (email, password) => {
    const res = await axios
      .post("https://shielded-sands-50569.herokuapp.com/api/login", { email, password })
      .catch((res) => {
        return { status: 401, message: "Unauthorized" };
      });

    if (res.status === 202) {
      let response = JSON.parse(res.config.data);
      const { email } = response.email;
      response = JSON.parse(res.request.response);
      console.log(response);
      const user_id = response.user_id;
      const newRes = await axios.get(
        `https://shielded-sands-50569.herokuapp.com/api/smartbag/${user_id}/`
      );
      const orderRes = await axios.get(
        `https://shielded-sands-50569.herokuapp.com/api/orders/${user_id}`
      );
      console.log(newRes.data, orderRes.data);
      const user = {
        user_id,
        email,
        smartbag: newRes.data,
        orderHis: orderRes.data,
        accessLevel: 1,
      };

      this.setState({ user });
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  };

  signup = async (email, password) => {
    const res = await axios
      .post("https://shielded-sands-50569.herokuapp.com/api/signup", {
        email,
        password,
      })
      .catch((res) => {
        return { status: 401, message: "Unauthorized" };
      });
    if (res.status === 201) {
      this.routerRef.current.history.push("/login");
      return true;
    } else {
      return false;
    }
  };

  logout = (e) => {
    e.preventDefault();
    this.routerRef.current.history.push("/products");
    this.setState({ user: null, cart: {}, smartbag: {} });
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
  };

  addToCart = (cartItem) => {
    let cart = this.state.cart;
    if (cart[cartItem.id]) {
      cart[cartItem.id].amount += cartItem.amount;
    } else {
      cart[cartItem.id] = cartItem;
    }
    if (cart[cartItem.id].amount > cart[cartItem.id].product.stock) {
      cart[cartItem.id].amount = cart[cartItem.id].product.stock;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  removeFromCart = (cartItemId) => {
    let cart = this.state.cart;
    delete cart[cartItemId];
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  clearCart = () => {
    let cart = {};
    localStorage.removeItem("cart");
    this.setState({ cart });
  };

  checkout = () => {
     if (!this.state.user) {
       this.routerRef.current.history.push("/login");                                                                                                                                                                              
       return;
     }

    // const cart = this.state.cart;

    // const products = this.state.products.map((p) => {
    //   if (cart[p.name]) {
    //     p.stock = p.stock - cart[p.name].amount;

    //     axios.put(`https://shielded-sands-50569.herokuapp.com/products/${p.id}`, { ...p });
    //   }
    //   return p;
    // });

    // this.setState({ products });
    // this.clearCart();
    this.setState({cart: {}})
  };

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          removeFromCart: this.removeFromCart,
          addToCart: this.addToCart,
          login: this.login,
          addProduct: this.addProduct,
          clearCart: this.clearCart,
          checkout: this.checkout,
          signup: this.signup,
        }}
      >
        <Router ref={this.routerRef}>
          <div className="App">
            <nav
              className="navbar container"
              role="navigation"
              aria-label="main navigation"
              style = {{
                maxHeight: "20rem",
                height: "10rem",
              }}
            >
              
              <div className="navbar-brand">
                <div className="navbar-start"> 
                  <Link className="navbar-item" to="/">
                    <img src={logo} alt="" style = {{height:"10rem",minHeight:"10rem"}}/>
                    <b className="navbar-item is-size-2 " style={{fontFamily:'Lobster Two',fontSize:'40px'}}>Bhanumati ka Pitara</b>
                  </Link>
                  <label
                    role="button"
                    className="navbar-burger burger"
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarBasicExample"
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({ showMenu: !this.state.showMenu });
                    }}
                  >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                  </label>
                </div>
              </div>
              <div
                className={`navbar-menu ${
                  this.state.showMenu ? "is-active" : ""
                }`}
              >
              <div className="navbar-end">
                <Link to="/products" className="navbar-item is-size-4">
                  Products
                </Link>
                {this.state.user && this.state.user.accessLevel < 1 && (
                  <Link to="/add-product" className="navbar-item is-size-4">
                    Add Product
                  </Link>
                )}
                {this.state.user && this.state.user.accessLevel >= 1 && (
                  <Link to="/smart-bag" className="navbar-item is-size-4">
                    Smart Bag
                  </Link>
                )}
                {this.state.user && this.state.user.accessLevel >= 1 && (
                  <Link to="/order-history" className="navbar-item is-size-4">
                    Order History
                  </Link>
                )}
                <Link to="/cart" className="navbar-item is-size-4">
                  Cart
                  <span
                    className="tag is-primary has-background-info"
                    style={{ marginLeft: "5px"}}
                  >
                    {Object.keys(this.state.cart).length}
                  </span>
                </Link>
                {!this.state.user ? (
                  <Link to="/login" className="navbar-item is-size-4">
                    Login
                  </Link>
                ) : (
                  <Link to="/" onClick={this.logout} className="navbar-item is-size-4">
                    Logout
                  </Link>
                )}
                {!this.state.user ? (
                  <Link to="/signup" className="navbar-item is-size-4">
                    Sign Up
                  </Link>
                ) : null}
              </div>
              </div>
            </nav>
            <Switch>
              <Route exact path="/" component={FrontPage} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/add-product" component={AddProduct} />
              <Route exact path="/products" component={FrontPage} />
              <Route exact path="/smart-bag" component={SmartBag} />
              <Route exact path="/order-history" component={OrderHistory} />
              <Route exact path="/signup" component={SignUp} />
            </Switch>
          </div>
        </Router>
      </Context.Provider>
    );
  }
}
