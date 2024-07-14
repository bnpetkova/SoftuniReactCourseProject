// src/ProductsList.jsx

import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "@firebase/firestore";
import app from './firebaseConfig'

const db = getFirestore(app);

function ProductsList() {
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

    return (
        <div>
            <h2>Products</h2>
            {products.map(product => (
                <div key={product.id}>
                    <h3>{product.Name}</h3>
                    <p>{product.Description}</p>
                </div>
            ))}
        </div>
    );
}

export default ProductsList;