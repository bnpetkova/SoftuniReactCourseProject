import { useNavigate, useParams } from 'react-router-dom';
import { collection, getFirestore, addDoc, doc, setDoc, getDoc } from "@firebase/firestore";
import app from '../firebaseConfig';
import { useUser } from '../contexts/hooks';
import { useState, useEffect } from 'react';

const db = getFirestore(app);

function CreateEditProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState({ Name: "", Description: "", Price: 0 });
    const [saving, setSaving] = useState(false);
    const currentUser = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            if (!id) return;

            try {
                const docRef = doc(db, "products", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProduct(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error getting document:", error);
            }
        }

        fetchData();
    }, [id]);

    function handleChange(e) {
        setProduct({ ...product, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);
        try {
            if (!currentUser) {
                alert("You must be logged in to perform this action.");
                return;
            }

            if (id) {
                // Update existing product
                await setDoc(doc(db, "products", id), { ...product });
            } else {
                // Create new product
                await addDoc(collection(db, "products"), { CreatedBy: currentUser.uid, ...product });
            }
            
            navigate('/products');
        } catch (error) {
            console.error("Error saving product: ", error);
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">{id ? "Edit Product" : "Add New Product"}</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input
                        name='Name'
                        value={product.Name}
                        onChange={handleChange}
                        placeholder='Name'
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <input
                        name='Description'
                        value={product.Description}
                        onChange={handleChange}
                        placeholder='Description'
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                    <input
                        name='Price'
                        type='number'
                        value={product.Price}
                        onChange={handleChange}
                        placeholder='Price'
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <button
                        type='submit'
                        disabled={saving}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        {id ? "Update" : "Create"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateEditProduct;
