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
import PageNotFound from "./pages/404/404.page";

import Register from "./pages/register/register.page";
import Signin from "./pages/signin/signin.page";

import Test from "./components/test";
import Notification from "./components/notification";
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
  const [userSignedIn, setUserSignedIn] = useState(
    localStorage.getItem("token") !== null
  );

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    removeTokenAfterExpiry();
    const token = getTokenFromLocalStorage();
    if (token !== null) {
      setCurrentUser(token);
      console.log("current user exists");
    } else {
      setCurrentUser(null);
      console.log("no user");
    }
  }, []);

  const removeTokenAfterExpiry = () => {
    const tokenString = localStorage.getItem("token");
    if (tokenString) {
      const token = JSON.parse(tokenString);
      const now = new Date().getTime();
      const tokenExpiry = token.expireAt;
      if (now > tokenExpiry) {
        localStorage.removeItem("token");
      }
    }
  };

  const getTokenFromLocalStorage = () => {
    const tokenString = localStorage.getItem("token");
    if (!tokenString) {
      return null;
    }
    const token = JSON.parse(tokenString);
    return token;
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Nav
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          setUserSignedIn={setUserSignedIn}
          setNotify={setNotify}
        />
        <Switch>
          <Route path='/' exact>
            <HomePage currentUser={currentUser} />
          </Route>
          <Route path='/test' exact component={Test} />
          <Route path='/products'>
            {userSignedIn ? <ProductsPage /> : <Redirect to='/signin' />}
          </Route>
          <Route path='/orders'>
            {userSignedIn ? <OrdersPage /> : <Redirect to='/signin' />}
          </Route>
          <Route path='/register' component={Register} />
          <Route path='/signin' exact>
            {currentUser ? (
              <Redirect to='/' />
            ) : (
              <Signin
                setCurrentUser={setCurrentUser}
                setUserSignedIn={setUserSignedIn}
              />
            )}
          </Route>
          {/* <Route path='/signin' exact>
            <Signin setCurrentUser={setCurrentUser} />
          </Route> */}
          <Route path='*' component={PageNotFound} />
        </Switch>
        <Footer />
      </Router>

      {/* Notification */}
      <Notification notify={notify} setNotify={setNotify} />
    </ThemeProvider>
  );
}

export default App;
