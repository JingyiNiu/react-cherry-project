import { Link } from "react-router-dom";

import "./nav.style.css";

const Nav = () => {
  return (
    <div className='navbar'>
      <div className='nav-left'>
        <div className='nav-item nav-logo'>🍒 Cherry 🍒</div>
        <Link to='/' className='nav-item nav-link'>
          Home
        </Link>
        <Link to='/products' className='nav-item nav-link'>
          Products
        </Link>
      </div>
      <div className='nav-right'>
        <Link to='/' className='nav-item nav-link'>
          Register
        </Link>
        <Link to='/' className='nav-item nav-link'>
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default Nav;
