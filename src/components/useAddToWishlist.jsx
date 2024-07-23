import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

const useAddToWishlist = () => {
    const [error, setError] = useState(null);

    const addToWishlist = async (product) => {
        try {
            const user = auth.currentUser;
            if (user) {
                await addDoc(collection(db, `users/${user.uid}/wishlist`), {
                    productId: product.id,
                    name: product.Name,
                    description: product.Description,
                    imageUrl: product.imageUrl 
                });
                alert("Product added to wishlist!");
            } else {
                alert("You need to be logged in to add to the wishlist.");
            }
        } catch (error) {
            console.error("Error adding to wishlist: ", error);
            setError("Failed to add product to wishlist.");
        }
    };

    return { addToWishlist, error };
};

export default useAddToWishlist;
