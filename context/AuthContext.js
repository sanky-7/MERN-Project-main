import { auth } from "../app/firebase";
import { useContext, createContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userID, setUserID] = useState("");
  const [isSeller, setIsSeller] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [phone, setPhone] = useState("");

  const signOutFromAccount = async () => {
    await signOut(auth).then( () => {
      setUserID("");
      window.location.reload(true);
    });
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetch("https://bike-showroom-backend-l81h.onrender.com/getRoute/get-customer-by-email/" + currentUser.email)
        .then(async (res) => {
          const resJson = await res.json();
          setUserID(resJson._id);
          setPhone(resJson.phone);
          setUserID(resJson._id);
          setIsSeller(false);
          setIsSigned(true);
          setIsLoading(false);
        })
        .catch(async () => {
          const res = await fetch("https://bike-showroom-backend-l81h.onrender.com/getRoute/get-seller-by-email/" + currentUser.email);
          const resJson = await res.json();
          setPhone(resJson.phone);
          setUserID(resJson._id);
          setIsSeller(true);
          setIsSigned(true);
          setIsLoading(false);
        })
      }
      else {
        setIsSigned(false);
        setIsLoading(false);
      }
    });
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, signOutFromAccount, isLoading, userID, isSeller, isSigned, phone}}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};