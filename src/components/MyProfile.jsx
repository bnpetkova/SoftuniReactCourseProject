import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
} from "@firebase/firestore";
import { useUser } from "../contexts/hooks";
import app from "../firebaseConfig";

const db = getFirestore(app);

const MyProfile = () => {
  const currentUser = useUser();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const docRef = doc(db, "profiles", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfile({ id: currentUser.uid, ...docSnap.data() });
        } else {
          const docRef = await addDoc(collection(db, "profiles"), {
            id: currentUser.uid,
          });
          setProfile({
            id: docRef.id,
            name: "John Doe",
            email: "john.doe@gmail.com",
          });
        }
      } catch (error) {
        console.log("Error getting document:", error);
        setError(error);
      }
      setLoading(false);
    };

    fetchUserData();
  }, [currentUser]);

  return (
    <div className="profile-container p-4 max-w-4xl mx-auto">
      {loading && (
        <p className="text-center text-gray-500">
          Loading profile information...
        </p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}
      {profile && !loading ? (
        <>
          <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
          <div className="mb-6 p-4 border rounded-lg shadow-sm bg-white">
            <h3 className="text-xl font-medium mb-2">User Information:</h3>
            <p className="text-gray-700">
              <strong>Name:</strong> {profile.name || "N/A"}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {profile.email || "N/A"}
            </p>
          </div>
        </>
      ) : !loading ? (
        <p className="text-center text-gray-500">
          No profile information available.
        </p>
      ) : null}
    </div>
  );
};

export default MyProfile;
