import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "@firebase/firestore";
import app from '../firebaseConfig';
import { Link } from "react-router-dom";

const db = getFirestore(app);

function Home() {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const productsCollection = collection(db, "products");
            const querySnapshot = await getDocs(productsCollection);
            const productsArray = querySnapshot.docs.map(doc => {
                return { id: doc.id, ...doc.data() };
            });

            setProducts(productsArray);
            setFilteredProducts(productsArray.slice(0, 4));
        };

        fetchProducts();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const filtered = products.filter(product =>
            product.Name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered.slice(0, 4));
    };

    return (
        <div className="home-container">
            <h2>Featured Products</h2>
            <form onSubmit={handleSearch} className="max-w-md mx-auto mb-4">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="What are you looking for?"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        required
                    />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Search
                    </button>
                </div>
            </form>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredProducts.map(product => (
                    <div key={product.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href={`/products/${product.id}`}>
                            <img className="rounded-t-lg" src={product.imageUrl} alt={product.Name} />
                        </a>
                        <div className="p-5">
                            <h3 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                <Link to={`/products/${product.id}`}>{product.Name}</Link>
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
            <Link to="/products" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                See More
            </Link>
        </div>
    );
}

export default Home;
