import { useState } from "react";
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

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Nav currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/products'>
            {!currentUser ? <Redirect to='/signin' /> : <ProductsPage />}
          </Route>
          <Route path='/orders'>
            {!currentUser ? <Redirect to='/signin' /> : <OrdersPage />}
          </Route>
          <Route path='/register' component={Register} />
          <Route path='/signin'>
            <Signin currentUser={currentUser} setCurrentUser={setCurrentUser} />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
