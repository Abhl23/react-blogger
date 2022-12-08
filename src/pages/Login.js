import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import { auth } from "../firebase";
import styles from "../styles/login.module.scss";
import { useAuth, useFormInput } from "../hooks";

const Login = () => {
  const email = useFormInput("");
  const password = useFormInput("");
  // boolean state maintained to disable the login button
  const [loggingIn, setLoggingIn] = useState(false);

  const {user}=useAuth();

  const { addToast } = useToasts();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoggingIn(true);

    try {
      // firebase/auth function to sign-in a user
      await signInWithEmailAndPassword(auth, email.value, password.value);

      navigate("/");
    } catch (error) {
      setLoggingIn(false);

      addToast(error, {
        appearance: "error",
      });
    }

    // // dispatches an action to reset the global chat state
    // dispatch({
    //   type: "RESET_USER",
    // });

    setLoggingIn(false);

    addToast("Logged in successfully!", {
      appearance: "success",
    });
  };

  if(user){
    return <Navigate replace to="/" />;
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <span className={`text-primary ${styles.logo}`}>React Blogger</span>
        <span className={`text-primary ${styles.heading}`}>Sign In</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" {...email} />
          <input type="password" placeholder="password" {...password} />
          <button style={{ marginTop: 10 }} disabled={loggingIn}>
            {loggingIn ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
