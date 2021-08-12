import { Link } from "react-router-dom";
import { useHistory } from "react-router";

import "./nav.style.css";

const Nav = (props) => {
  const { currentUser, setCurrentUser, setNotify } = props;
  const history = useHistory();

  const signOut = (e) => {
    e.preventDefault();

    setNotify({
      isOpen: true,
      message: "Successfully Signed Out",
      type: "success",
    });

    setTimeout(function () {
      setCurrentUser(null);
      localStorage.removeItem("token");
      history.push("/signin");
    }, 1500);
  };

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
        <Link to='/orders' className='nav-item nav-link'>
          Orders
        </Link>
      </div>
      {currentUser ? (
        <div className='nav-right'>
          <Link to='/' className='nav-item nav-item-sm'>
            Hi, {currentUser.userName}
          </Link>
          <a href='/signin' className='nav-item nav-item-sm' onClick={signOut}>
            Sign Out
          </a>
        </div>
      ) : (
        <div className='nav-right'>
          <Link to='/register' className='nav-item nav-item-sm'>
            Register
          </Link>
          <Link to='/signin' className='nav-item nav-item-sm'>
            Sign in
          </Link>
        </div>
      )}
    </div>
  );
};

export default Nav;
