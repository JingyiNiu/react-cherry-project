import SigninForm from "../../components/signin-and-register/signin-form";

const Signin = (props) => {
  const { currentUser, setCurrentUser } = props;
  return (
    <div className='main-container'>
      <SigninForm currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </div>
  );
};

export default Signin;
