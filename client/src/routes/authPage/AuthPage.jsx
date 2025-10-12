import "./authPage.css";
import ImageKit from "../../components/imageKit/ImageKit";
import { useState } from "react";
const AuthPage = () => {
  const [isRregister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  return (
    <div className="authPage">
      <div className="authContainer">
        <ImageKit src="general/logoBig.png"  alt="big logo" />
        <h1>
          {isRregister ? "Create a new account" : "Login to your account"}
        </h1>

        {isRregister ? (
          <form key='register'>
            <div className="formGroup">
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                placeholder="Enter Your Email"
                id="email"
                name="email"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="Username">Username</label>
              <input
                type="text"
                placeholder="Enter Your username"
                id="username"
                name="username"
              />
            </div><div className="formGroup">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Enter Your Name"
                id="name"
                name="name"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="Password">Password</label>
              <input
                type="password"
                placeholder="Enter Your Password"
                id="password"
                name="password"
              />
            </div>
            <button type="submit">Register</button>
            <p >
              do you have an account ? <b onClick={() => setIsRegister(false)}>Login</b>
            </p>
            {error && <p className="error">{error}</p>}
          </form>
        ) : (
          <form key='login' className="authForm">
            <div className="formGroup">
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                placeholder="Enter Your Email"
                id="email"
                name="email"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="Password">Password</label>
              <input
                type="password"
                placeholder="Enter Your Password"
                id="password"
                name="password"
              />
            </div>
            <button type="submit">Login</button>
            <p onClick={() => setIsRegister(true)}>
              don&apos;t have an account ? <b>Register</b>
            </p>
            {error && <p className="error">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
