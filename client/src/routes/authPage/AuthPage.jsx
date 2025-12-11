import "./authPage.css";
import { apiRequest } from "../../utils/fetch";
import ImageKit from "../../components/imageKit/ImageKit";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useAuthStore from "../../utils/authStore";

const AuthPage = () => {

  const [isRregister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {setCurrentUser}= useAuthStore()
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const res = await apiRequest.post(
        `/users/${isRregister ? "create" : "login"}`,
        data
      );
      const { message , user } = res.data;
      navigate("/");
      toast.success(message);
      setCurrentUser(user)
    } catch (err) {
      setError(err.response.data.message);
      toast.error(err.response.data.message);
    }
  }
  return (
    <div className="authPage">
      <div className="authContainer">
        <ImageKit src="general/logoBig.png" alt="big logo" />
        <h1>
          {isRregister ? "Create a new account" : "Login to your account"}
        </h1>

        {isRregister ? (
          <form key="register" onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                placeholder="Enter Your Email"
                id="email"
                name="email"
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="Username">Username</label>
              <input
                type="text"
                placeholder="Enter Your username"
                id="username"
                name="username"
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Enter Your Name"
                id="name"
                name="displayName"
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="Password">Password</label>
              <input
                type="password"
                placeholder="Enter Your Password"
                id="password"
                name="password"
                required
              />
            </div>
            <button type="submit">Register</button>
            <p>
              do you have an account ?{" "}
              <b onClick={() => setIsRegister(false)}>Login</b>
            </p>
            {error && <p className="error">{error}</p>}
          </form>
        ) : (
          <form key="login" className="authForm" onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                placeholder="Enter Your Email"
                id="email"
                name="email"
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="Password">Password</label>
              <input
                type="password"
                placeholder="Enter Your Password"
                id="password"
                name="password"
                required
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
