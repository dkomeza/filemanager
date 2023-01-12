import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import backgroundImage from "@Auth/assets/background.webp";
import logo from "@Auth/assets/logo.webp";

import imageParalex from "./helpers/imageParalax";

import "@Style/Auth/Login.scss";

import { useAuth } from "@Auth/context/AuthContext";

function Login() {
  const { currentUser, logIn } = useAuth()!;
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState("");
  const [animate, setAnimate] = useState(false);
  const [transform, setTransform] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);
      navigate("/");
      return;
    }
    imageParalex();
  }, []);

  function handleUsernameSubmit() {
    if (usernameRef.current?.value) {
      setAnimate(true);
      setTimeout(() => {
        setTransform(-200);
      }, 1);

      setTimeout(() => {
        setUsername(usernameRef.current?.value!);
        setAnimate(false);
      }, 1000);
    }
  }
  async function handleLogin() {
    try {
      await logIn(username, passwordRef.current?.value!);
      navigate("/");
    } catch (e: any) {
      setError(e.message);
      setAnimate(true);
      setTimeout(() => {
        setTransform(0);
      }, 1);

      setTimeout(() => {
        setAnimate(false);
        setUsername("");
      }, 1000);

      setTimeout(() => {
        setError("");
      }, 2000);
    }
  }
  return (
    <>
      {!currentUser && (
        <main className="login-page">
          <div className="background-image-container">
            <img
              className="background-image"
              src={backgroundImage}
              alt="Background Image"
            />
          </div>
          <div className="login-container">
            <div className="login-wrapper">
              {error && (
                <span style={{ display: "block", textAlign: "center" }}>
                  {error}
                </span>
              )}
              <img src={logo} alt="Logo" />
              {(!username || animate) && (
                <div
                  style={{ transform: `translateX(${transform}%)` }}
                  className="email-container form-container"
                >
                  <div className="input-wrapper">
                    <label htmlFor="email">username</label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      ref={usernameRef}
                    />
                  </div>
                  <button
                    type="submit"
                    onClick={handleUsernameSubmit}
                    className="login-button"
                  >
                    Sign in with username
                  </button>
                  <div className="signup-wrapper">
                    Don't have an account? <Link to="/signup">Sign up</Link>{" "}
                    here!
                  </div>
                </div>
              )}
              {(username || animate) && (
                <div
                  className="password-container form-container"
                  style={{ transform: `translateX(${200 + transform}%)` }}
                >
                  <div className="input-wrapper">
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      ref={passwordRef}
                    />
                  </div>
                  <button
                    type="submit"
                    onClick={handleLogin}
                    className="login-button"
                  >
                    Sign in
                  </button>
                </div>
              )}
              <div className="placeholder">
                <div className="input-wrapper">
                  <input type="text" name="placeholder" id="placeholder" />
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default Login;
