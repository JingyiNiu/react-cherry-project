import "./home.style.css";

const HomePage = (props) => {
  const { currentUser } = props;
  return (
    <div className='main-container'>
      {currentUser ? (
        <div className='center-div'>
          <h1>Welcome, {currentUser.userName}</h1>
        </div>
      ) : (
        <div className='center-div'>
          <h1>Here is a simple homepage</h1>
          <p>
            If you are not signed in, you cannot browse Products and Orders page
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
