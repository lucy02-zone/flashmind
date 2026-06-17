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

import "../styles/auth.css";

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
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create account</h1>
        <p>Register now to start building summaries, flashcards, quizzes, and revision plans.</p>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">Register</button>
        </form>

        <div className="auth-link-row">
          <span>Already have an account?</span>
          <Link className="auth-link" to="/login">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );

};

export default RegisterPage;