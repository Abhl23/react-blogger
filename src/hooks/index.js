import { useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase";
import { AuthContext } from "../providers/AuthProvider";

// returns the global auth state
export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [authUser, setAuthUser] = useState({});

  useEffect(() => {
    // this listener gets the currently signed-in user
    const unsub = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return {
    user: authUser,
  };
};

// customHook created to take and handle form inputs
export const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange: handleChange,
  };
};
