
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../firebaseConfig";

export const useUser = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("Current user:", currentUser); // Log user for debugging
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    return user;
};
