
import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, query, where } from "@firebase/firestore";
import { useUser } from "../contexts/hooks"; 
import app from '../firebaseConfig';

const db = getFirestore(app);

const MyProfile = () => {
    const currentUser = useUser();
    const [wishlist, setWishlist] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (currentUser) {
                try {
                    const userRef = collection(db, "users");
                    const q = query(userRef, where("uid", "==", currentUser.uid));
                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        const userDoc = querySnapshot.docs[0];
                        setUserInfo(userDoc.data());
                    } else {
                        console.log("No user information found.");
                        setUserInfo(null);
                    }

                    const wishlistRef = collection(db, `users/${currentUser.uid}/wishlist`);
                    const wishlistSnapshot = await getDocs(wishlistRef);
                    const wishlistArray = wishlistSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setWishlist(wishlistArray);

                } catch (error) {
                    console.error("Error fetching data:", error);
                    setError("Failed to fetch data. Please try again.");
                } finally {
                    setLoading(false);
                }
            } else {
                console.log("No current user found.");
                setLoading(false);
            }
        };

        fetchUserData();
    }, [currentUser]);

    return (
        <div className="profile-container p-4 max-w-4xl mx-auto">
            {loading && <p className="text-center text-gray-500">Loading profile information...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            {userInfo && !loading ? (
                <>
                    <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
                    <div className="mb-6 p-4 border rounded-lg shadow-sm bg-white">
                        <h3 className="text-xl font-medium mb-2">User Information:</h3>
                        <p className="text-gray-700"><strong>Name:</strong> {userInfo.name || 'N/A'}</p>
                        <p className="text-gray-700"><strong>Email:</strong> {userInfo.email || 'N/A'}</p>
                    </div>
                    <div className="p-4 border rounded-lg shadow-sm bg-white">
                        <h3 className="text-xl font-medium mb-2">My Wishlist:</h3>
                        {wishlist.length > 0 ? (
                            <ul className="list-disc pl-5">
                                {wishlist.map(item => (
                                    <li key={item.id} className="mb-2 text-gray-700">{item.name}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No items in wishlist.</p>
                        )}
                    </div>
                </>
            ) : !loading ? (
                <p className="text-center text-gray-500">No profile information available.</p>
            ) : null}
        </div>
    );
};

export default MyProfile;
