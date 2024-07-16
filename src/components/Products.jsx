import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore, addDoc } from "@firebase/firestore";
import { Link } from "react-router-dom";
import app from '../firebaseConfig';

const db = getFirestore(app);

function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const productsCollection = collection(db, "products")
            const querySnapshot = await getDocs(productsCollection);
            const productsArray = querySnapshot.docs.map(doc => {
                return { id: doc.id, ...doc.data() }
            });

            setProducts(productsArray);
        };

        fetchProducts();
    }, []);

    const addToWishlist = async (product) => {
        try {
            await addDoc(collection(db, "wishlist"), {
                productId: product.id,
                name: product.Name,
                description: product.Description
            });
            alert("Product added to wishlist!");
        } catch (error) {
            console.error("Error adding to wishlist: ", error);
        }
    };

    return (
        <div>
            <h2>Products <Link to="/create-product">New</Link></h2>
            {products.map(product => (
                <div key={product.id}>
                    <h3><Link to={`/products/${product.id}`}>{product.Name}</Link></h3>
                    <p>{product.Description}</p>
                    <button onClick={() => addToWishlist(product)}>Add to Wishlist</button>
                </div>
            ))}
        </div>
    );

}
export default Products;
