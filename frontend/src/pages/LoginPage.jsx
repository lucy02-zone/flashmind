import {
  useState
} from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import {
  loginUser,
  getProfile
} from "../services/authService";

import {
  useAuth
} from "../contexts/AuthContext";

const LoginPage = () => {

  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const [formData,
    setFormData] =
    useState({
      email: "",
      password: ""
    });

  const [error,
    setError] =
    useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
      e.target.value
    });

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await loginUser(
            formData
          );

        const token =
          response.token;

        const profile =
          await getProfile(
            token
          );

        login(
          profile.user,
          token
        );

        navigate("/");

      } catch (err) {

        setError(
          "Invalid credentials"
        );

      }

    };

  return (
    <div>

      <h1>Login</h1>

      {error && (
        <p>{error}</p>
      )}

      <form
        onSubmit={
          handleSubmit
        }
      >

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={
            formData.email
          }
          onChange={
            handleChange
          }
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={
            formData.password
          }
          onChange={
            handleChange
          }
        />

        <button
          type="submit"
        >
          Login
        </button>

      </form>

      <p>

        No account?

        <Link
          to="/register"
        >
          Register
        </Link>

      </p>

    </div>
  );

};

export default LoginPage;