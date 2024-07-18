import { useNavigate, useParams } from 'react-router-dom';
import { collection, getFirestore, addDoc, doc, setDoc, getDoc } from "@firebase/firestore";
import app from '../firebaseConfig'
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
            }
            catch (error) {
                console.log("Error getting document:", error);
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
            let productId;
            if (id) {
                await setDoc(doc(db, "products", id), { ...product });
                productId = id;
            } else {
                const docRef = await addDoc(collection(db, "products"), { CreatedBy: currentUser.uid, ...product });
                productId = docRef.id;
            }
            navigate(`/products/${productId}`);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
        setSaving(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input name='Name'
                    value={product.Name} onChange={handleChange}
                    placeholder='Name' required />
            </div>
            <div>
                <input name='Description'
                    value={product.Description} onChange={handleChange}
                    placeholder='Description' required />
            </div>
            <div>
                <input name='Price'
                    type='number'
                    value={product.Price} onChange={handleChange}
                    placeholder='Price' required />


            </div>
            <div>
                <button type='submit' disabled={saving}>{id ? "Update" : "Create"}</button>
            </div>
        </form>
    );
}

export default CreateEditProduct;
