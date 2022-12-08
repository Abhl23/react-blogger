import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useToasts } from "react-toast-notifications";

import { auth } from "../firebase";
import styles from "../styles/navbar.module.scss";
import { useAuth } from "../hooks";

const Navbar = () => {
  const { user } = useAuth();

  const { addToast } = useToasts();

  return (
    <div className={`bg-primary ${styles.navbar}`}>
      <div className={styles.leftNav}>
        <ul className={styles.navLinks}>
          <li>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              Home
            </Link>
          </li>
          {user ? (
            <li>
              <Link
                to="/create-blog"
                style={{ color: "white", textDecoration: "none" }}
              >
                Create Blog
              </Link>
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
      <h2 className="text-light">BLOGGER</h2>
      <div className={styles.rightNav}>
        <ul className={styles.navLinks}>
          {user ? (
            <li
              onClick={() => {
                // firebase/auth function to sign out the user
                signOut(auth);
                addToast("Signed out successfully!", {
                  appearance: "success",
                });
              }}
            >
              Logout
            </li>
          ) : (
            <>
              <li>
                <Link
                  style={{ color: "white", textDecoration: "none" }}
                  to="/login"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  style={{ color: "white", textDecoration: "none" }}
                  to="/signup"
                >
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
