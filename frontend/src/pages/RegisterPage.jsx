import {
  useState
} from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import {
  registerUser
} from "../services/authService";

const RegisterPage = () => {

  const navigate =
    useNavigate();

  const [formData,
    setFormData] =
    useState({
      name: "",
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

        await registerUser(
          formData
        );

        navigate(
          "/login"
        );

      } catch (err) {

        setError(
          "Registration failed"
        );

      }

    };

  return (
    <div>

      <h1>Register</h1>

      {error && (
        <p>{error}</p>
      )}

      <form
        onSubmit={
          handleSubmit
        }
      >

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={
            formData.name
          }
          onChange={
            handleChange
          }
        />

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
          Register
        </button>

      </form>

      <p>

        Already have account?

        <Link
          to="/login"
        >
          Login
        </Link>

      </p>

    </div>
  );

};

export default RegisterPage;