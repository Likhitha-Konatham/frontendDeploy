import React, { useState } from "react";
import styles from "./SignUpForm.module.css";

const InputField = ({ icon, placeholder, type, id }) => (
  <div className={styles.inputWrapper}>
    <div className={styles.inputContainer}>
      <div className={styles.inputContent}>
        <img loading="lazy" src={icon} alt="" className={styles.inputIcon} />
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className={styles.inputField}
          aria-label={placeholder}
        />
      </div>
    </div>
  </div>
);

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className={styles.container}>
      <section className={styles.formContainer}>
        <header className={styles.heading}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/dcec71a787283178befc8a965ccfb9ad6ec3224a467820ba81f1fccc87e6f9a9?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
            alt="Company Logo"
            className={styles.logo}
          />
          <h1 className={styles.introContent}>Let's get Started</h1>
        </header>
        <form className={styles.formContent}>
          <div className={styles.formInputContent}>
            <div className={styles.inputFields}>
              <InputField
                icon="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/fc2202c9d9a2d7ad5a197e302dfe1f2cf9eda0d0a72baa90f26e14a44fa3e5b2?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
                placeholder="Your Full Name"
                type="text"
                id="fullName"
              />
              <InputField
                icon="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/bd9391c90aa9a53d902ac81f4f7a2b10b6609c951df26073dc7fc09172d8b726?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
                placeholder="Your Email Address"
                type="email"
                id="email"
              />
              <div className={styles.passwordInputWrapper}>
                <div className={styles.passwordInputContainer}>
                  <div className={styles.passwordInputContent}>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/ede8020e672a2299ea3fabf45ccd38c9d1cfe12a49405db7bb34420b1a707bc9?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
                      alt=""
                      className={styles.passwordIcon}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Create a Strong Password"
                      className={styles.passwordField}
                      aria-label="Create a Strong Password"
                    />
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/3faf4e538f8849b6b6c9144cb99ec37a/d57736c3399a9f83672f928638bbd8483288335c39bb724d356308d362e5f519?apiKey=3faf4e538f8849b6b6c9144cb99ec37a&"
                      alt={showPassword ? "Hide password" : "Show password"}
                      className={styles.visibilityIcon}
                      onClick={togglePasswordVisibility}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          togglePasswordVisibility();
                        }
                      }}
                      tabIndex="0"
                      role="button"
                      aria-pressed={showPassword}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className={styles.loginLink}>
            Already have an account?{" "}
            <a href="#login" style={{ color: "#a63e71" }}>
              Login
            </a>
          </p>
        </form>
      </section>
      <button type="submit" className={styles.signUpButton}>
        Sign up
      </button>
    </main>
  );
};

export default SignUpForm;
