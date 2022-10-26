import { useEffect, useState } from "react";
import LoginButton from "../components/LoginButton";
import UserForm from "../components/UserForm";
import VerticalDivider from "../components/VerticalDivider";

const Login = () => {
  const [authType, setAuthType] = useState("Sign In");
  useEffect(() => {
    document.title = "Lets Feast - Login";
  });
  const handleAuthType = (e: any) => {
    e.preventDefault();
    setAuthType(authType === "Sign In" ? "Sign Up" : "Sign In");
  };
  return (
    <div className="flex flex-col items-center justify-around md:justify-center h-screen">
      <div className="flex flex-col w-[80%] md:w-2/5">
        <p className="font-bold my-1">Welcome to Let's Eat 🥘</p>
        <p className="my-1">
          Let's Eat is a place for you to store all your favorite recipes, with
          features specially designed for you to organize and find your recipes
          faster! ⏰
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-around items-center h-3/5 w-[95%] md:w-4/5">
        <div className="flex flex-col md:w-2/5 md:flex-row items-center justify-center">
          <div className="w-[90%] p-4  rounded-md">
            <UserForm authType={authType} />
            <button
              onClick={(e) => {
                handleAuthType(e);
              }}
              className="underline italic"
            >
              {authType === "Sign Up" ? (
                <span>Already got an account? Sign in Here</span>
              ) : (
                <span>Don't have an account? Sign up Here</span>
              )}
            </button>
          </div>
        </div>
        <VerticalDivider />
        <div className="w-[90%] md:w-1/3 p-4 rounded-md my-2">
          <p className="font-semibold text-xl">Pick a Login Option</p>
          <LoginButton
            value={`${process.env.REACT_APP_API_URI}/auth/google`}
            service="Google"
          >
            Continue with Google
          </LoginButton>
          <LoginButton
            value={`${process.env.REACT_APP_API_URI}/auth/google`}
            service="Twitter"
          >
            Continue with Twitter
          </LoginButton>
          <LoginButton
            value={`${process.env.REACT_APP_API_URI}/auth/google`}
            service="Apple"
          >
            Continue with Apple
          </LoginButton>
        </div>
      </div>
    </div>
  );
};

export default Login;
