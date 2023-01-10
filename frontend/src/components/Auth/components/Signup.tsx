import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import backgroundImage from "@Auth/assets/background.webp";
import logo from "@Auth/assets/logo.webp";

import imageParalex from "./helpers/imageParalax";

import "@Style/Auth/Login.scss";

import { useAuth } from "@Auth/context/AuthContext";

function Login() {
  const { currentUser, signUp } = useAuth()!;
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [emailCorrect, setEmailCorrect] = useState(false);
  const [username, setUsername] = useState("");
  const [animate, setAnimate] = useState(false);
  const [transform, setTransform] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    imageParalex();
  }, []);

  const navigate = useNavigate();
  function handleUsernameSubmit() {
    if (usernameRef.current?.value) {
      setUsername(usernameRef.current?.value);
      setAnimate(true);
      setTimeout(() => {
        setTransform(-200);
      }, 1);

      setTimeout(() => {
        setEmailCorrect(true);
        setAnimate(false);
      }, 1000);
    }
  }
  async function handleLogin() {
    try {
      await signUp(username, passwordRef.current?.value!);
      navigate("/");
    } catch (e: any) {
      setError(e.message);
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
              <img src={logo} alt="Logo" />
              {error && (
                <span style={{ display: "block", textAlign: "center" }}>
                  {error}
                </span>
              )}
              {(!emailCorrect || animate) && (
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
                    Sign up with username
                  </button>
                  <div className="signup-wrapper">
                    Already have an account? <a href="/login">Sign in</a> here!
                  </div>
                </div>
              )}
              {(emailCorrect || animate) && (
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
                    Sign up
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
