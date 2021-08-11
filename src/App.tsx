import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Nav from "./components/nav/nav.component";
import Footer from "./components/footer/footer.component";

import HomePage from "./pages/home/home.page";
import ProductsPage from "./pages/products/products.page";
import OrdersPage from "./pages/orders/orders.page";

import Register from "./pages/register/register.page";
import Signin from "./pages/signin/signin.page";

import Test from "./components/test";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import "./App.css";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins",
  },
});

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [logIn, setLogIn] = useState(false);

  useEffect(() => {
    getTokenFromLocalStorage();
    console.log("currentUser at App", currentUser);
  });

  const getTokenFromLocalStorage = () => {
    const tokenString = localStorage.getItem("token");
    if (!tokenString) {
      return null;
    }
    const token = JSON.parse(tokenString);
    console.log("token", token);
    console.log("logIn", logIn);

    // if (token) {
    //   setLogIn(true);
    //   setCurrentUser(currentUser);
    // }
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Nav currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/test' exact component={Test} />
          <Route path='/products'>
            {currentUser ? <ProductsPage /> : <Redirect to='/signin' />}
          </Route>
          <Route path='/orders'>
            {currentUser ? <OrdersPage /> : <Redirect to='/signin' />}
          </Route>
          <Route path='/register' component={Register} />
          <Route path='/signin'>
            <Signin setCurrentUser={setCurrentUser} />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
