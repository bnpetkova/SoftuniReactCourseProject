import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

import { deleteDoc, doc, getDoc, getFirestore } from "@firebase/firestore";
import app from '../firebaseConfig'
const db = getFirestore(app);


const ProductDetail = () => {
  let { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const singlefetchProduct = async () => {

      setTimeout(() => {
        const docRef = doc(db, "products", id);

        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setProduct({ id: id, ...docSnap.data() });
          } else {
            console.log("No such document!");
          }
        }).catch((error) => {
          console.log("Error getting document:", error);
        });
      }, 100);
    };

    singlefetchProduct();
  }, [id]);

  function handleDelete() {
    deleteDoc(doc(db, "products", id))
      .then(() => {
        console.log(`Deleted product: ${id}`);
        navigate('/products');
      })
      .catch((error) => { console.log(`Error: ${error}`) });

  }

  return <>
    {product ? <>
      <h2>Product ID: {product.id}</h2>
      <div>Name: {product.Name}</div>
      <div>Description: {product.Description}
      </div>
      <div><button onClick={handleDelete}>Delete</button></div>
    </> : <div>Loading...</div>}
  </>;
};

export default ProductDetail;
