import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginImg from "../../assets/images/login/login.svg";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

const Login = () => {
  const { userSignIn } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    userSignIn(email, password)
      .then((result) => {
        const user = result.user;
        form.reset();

        const currentUser = {
          email: user.email,
        };
        console.log(currentUser);

        // get jwt token
        fetch("http://localhost:5000/jwt", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(currentUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);

            // local storage is easiest  not the best place to store jwt token
            localStorage.setItem("genius-car-token", data.token);
          });
        navigate(from, { replace: true });
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="hero w-full my-20 ">
      <div className="hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <img className="w-3/4" src={loginImg} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100  py-20">
          <h1 className="text-4xl text-center font-semibold">Login</h1>
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <input type="submit" className="btn btn-primary" value="Login" />
            </div>
          </form>
          <p className="text-center">
            New to Genius Car{" "}
            <Link to="/signup" className="text-orange-600 font-bold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
