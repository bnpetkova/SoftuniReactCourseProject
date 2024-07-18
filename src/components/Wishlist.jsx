import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from '../firebaseConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function Wishlist() {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        return <p className="loading">Loading...</p>;
    }

    if (error) {
        return <p className="error">{error}</p>;
    }

    return (
        <div className="wishlist-container">
            <h1>Wishlist</h1>
            <ul>
                {wishlist.map(item => (
                    <li key={item.id}>
                        {item.name} - {item.description}
                        <button onClick={() => handleRemove(item.id)} className="btn-remove">
                        <FontAwesomeIcon icon={faTrashAlt}/>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Wishlist;
