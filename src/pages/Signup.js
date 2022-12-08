import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import { auth, db } from "../firebase";
import { useFormInput } from "../hooks";
import styles from "../styles/login.module.scss";

const Signup = () => {
  const username = useFormInput("");
  const email = useFormInput("");
  const password = useFormInput("");

  const [signingUp, setSigningUp] = useState(false);

  const navigate = useNavigate();

  //   const { dispatch } = useChat();

  const { addToast } = useToasts();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSigningUp(true);

    // check for input fields
    if (!username.value || !email.value || !password.value) {
      setSigningUp(false);

      return addToast("Fields cannot be left empty!", {
        appearance: "error",
      });
    } else if (password.value.length < 6) {
      setSigningUp(false);

      return addToast("Password must be at least 6 characters!", {
        appearance: "error",
      });
    }

    try {
      // creates a new user in firebase
      const response = await createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );

      await updateProfile(response.user, {
        displayName: username.value,
      });

      // creates a document in users collection
      await setDoc(doc(db, "users", response.user.uid), {
        uid: response.user.uid,
        displayName: username.value,
        email: email.value,
      });

      navigate("/");
    } catch (error) {
      setSigningUp(false);

      addToast(error, {
        appearance: "error",
      });
    }

    // // dispatches an action to reset the global chat state
    // dispatch({
    //   type: "RESET_USER",
    // });

    setSigningUp(false);

    addToast("Signed up successfully!", {
      appearance: "success",
    });
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <span className={styles.logo}>React Blogger</span>
        <span className={styles.heading}>Sign Up</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="username" {...username} />
          <input type="email" placeholder="email" {...email} />
          <input type="password" placeholder="password" {...password} />
          <button disabled={signingUp}>
            {signingUp ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
