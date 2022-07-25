import {
  createUserDocumentFromAuth,
  onAuthStateChangeListener
} from "../utils/firebase/firebase.utils";

const { createContext, useState, useEffect } = require("react");

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener((user) => {
      if (user) createUserDocumentFromAuth(user);
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
