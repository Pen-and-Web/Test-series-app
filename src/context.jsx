import React from "react";
const ProductContext = React.createContext();

//provider
//consumer
class ProductProvider extends React.Component {
  state = {
    loginStatus: false,
    userName: "usama",
    email: "",
    password: "",
  };

  handleLoginStatus = (status) => {
    this.setState({
      loginStatus: status,
    });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          loginStatus: this.state.loginStatus,
          userName: this.state.userName,
          email: this.state.email,
          password: this.state.password,
          handleLoginStatus: this.handleLoginStatus,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
