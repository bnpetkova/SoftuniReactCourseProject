import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { collection, getFirestore, addDoc } from "@firebase/firestore";
import app from '../firebaseConfig'
const db = getFirestore(app);

function CreateProduct() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    const handleSave = () => {
        const productCollection = collection(db, 'products');
        addDoc(productCollection, {
            Name: name,
            Description: description
        }).then(() => {
            console.log('Data saved successfully!');
            navigate('/products');
        }).catch((error) => {
            console.error('Error saving data:', error);
        });
    };

    return (
        <div>
            <h2>New product</h2>
            <label>Name</label>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <label>Description</label>
            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <button onClick={handleSave}>Save</button>
        </div>
    );
}

export default CreateProduct;