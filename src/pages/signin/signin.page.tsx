import SigninForm from "../../components/signin-and-register/signin-form";

const Signin = (props) => {
  const { setCurrentUser, setUserSignedIn } = props;
  return (
    <div className='main-container'>
      <SigninForm
        setCurrentUser={setCurrentUser}
        setUserSignedIn={setUserSignedIn}
      />
    </div>
  );
};

export default Signin;
