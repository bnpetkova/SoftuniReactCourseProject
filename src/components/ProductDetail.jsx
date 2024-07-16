import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

import { doc, getDoc, getFirestore } from "@firebase/firestore";
import app from '../firebaseConfig'
const db = getFirestore(app);

const ProductDetail = () => {
  let { id } = useParams();
  const [product, setProduct] = useState('');

  useEffect(() => {
    const singlefetchProduct = async () => {
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
    };

    singlefetchProduct();
  }, [id]);

  return (
    <>
      <h2>Product ID: {product.id}</h2>
      <div>Name: {product.Name}</div>
      <div>Description: {product.Description}</div>
    </>
  )
};

export default ProductDetail;
