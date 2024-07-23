import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { onAuthStateChanged } from "firebase/auth";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchWishlist(user.uid);
      } else {
        setUser(null);
        setWishlist([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchWishlist = async (userId) => {
    setLoading(true);
    try {
      const wishlistCollection = collection(db, `users/${userId}/wishlist`);
      const querySnapshot = await getDocs(wishlistCollection);
      const wishlistArray = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setWishlist(wishlistArray);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setError("Failed to load wishlist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    try {
      if (user) {
        await deleteDoc(doc(db, `users/${user.uid}/wishlist`, id));
        setWishlist(wishlist.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Error removing item:", error);
      setError("Failed to remove item. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <FontAwesomeIcon icon={faSpinner} spin size="2x" />
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p>Please log in to view your wishlist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlist.length > 0 ? (
          wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
            >
              {item.imageUrl && (
                <img
                  className="w-full h-48 object-cover"
                  src={item.imageUrl}
                  alt={item.name}
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
                <p className="text-gray-700 mb-4">{item.description}</p>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-600 hover:underline flex items-center"
                >
                  <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
}

export default Wishlist;

