import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Nav />
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/products' component={ProductsPage} />
          <Route path='/orders' component={OrdersPage} />
          <Route path='/register' component={Register} />
          <Route path='/signin' component={Signin} />
        </Switch>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
