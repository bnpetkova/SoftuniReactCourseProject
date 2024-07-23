import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore, addDoc } from "@firebase/firestore";
import { Link } from "react-router-dom";
import app, { auth } from '../firebaseConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button, Card } from 'flowbite-react'; // Import Flowbite components

const db = getFirestore(app);

function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const productsCollection = collection(db, "products");
            const querySnapshot = await getDocs(productsCollection);
            const productsArray = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProducts(productsArray);
        };

        fetchProducts();
    }, []);

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
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">
                Products
                <Link to="/products/new" className="ml-4 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center">
                    <FontAwesomeIcon icon={faPlus} /> New
                </Link>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map(product => (
                    <Card key={product.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        {product.imageUrl && (
                            <img className="rounded-t-lg" src={product.imageUrl} alt={product.Name} />
                        )}
                        <div className="p-5">
                            <h3 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                <Link to={`/products/${product.id}`}>{product.Name}</Link>
                            </h3>
                            <p className="text-gray-700 dark:text-gray-400">{product.Description}</p>
                            <Button onClick={() => addToWishlist(product)} className="mt-4 w-full">
                                <FontAwesomeIcon icon={faHeart} /> Add to Wishlist
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Products;
