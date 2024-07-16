import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from '../firebaseConfig'; // Import db from firebaseConfig

function Wishlist() {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true); // To handle loading state
    const [error, setError] = useState(null); // To handle errors

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const wishlistCollection = collection(db, 'wishlist');
                const querySnapshot = await getDocs(wishlistCollection);
                const wishlistArray = querySnapshot.docs.map(doc => {
                    return { id: doc.id, ...doc.data() }
                });

                setWishlist(wishlistArray);
            } catch (error) {
                console.error("Error fetching wishlist:", error);
                setError("Failed to load wishlist. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, []);

    const handleRemove = async (id) => {
        try {
            await deleteDoc(doc(db, 'wishlist', id));
            setWishlist(wishlist.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error removing item:', error);
            setError("Failed to remove item. Please try again.");
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Wishlist</h1>
            <ul>
                {wishlist.map(item => (
                    <li key={item.id}>
                        {item.name} - {item.description}
                        <button onClick={() => handleRemove(item.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Wishlist;
