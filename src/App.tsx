import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./components/nav/nav.component";
import Footer from "./components/footer/footer.component";

import Home from "./pages/home/home.page";
import Products from "./pages/products/products.page";
import Register from "./pages/register/register.page";
import Signin from "./pages/signin/signin.page";

import "./App.css";

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/products' component={Products} />
        <Route path='/register' component={Register} />
        <Route path='/signin' component={Signin} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
