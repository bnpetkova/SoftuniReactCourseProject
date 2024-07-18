import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { deleteDoc, doc, getDoc, getFirestore } from "@firebase/firestore";
import app from '../firebaseConfig'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons';

const db = getFirestore(app);


const ProductDetail = () => {
  let { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const singlefetchProduct = async () => {

      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setProduct({ id: id, ...docSnap.data() });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error getting document:", error);
      }
    };

    singlefetchProduct();
  }, [id]);

  async function handleDelete() {
    try {
      await deleteDoc(doc(db, "products", id));
      console.log(`Deleted product: ${id}`);
      navigate('/products');
    }
    catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  return <>
    {product ? <>
      <h3>Product ID: {product.id} <Link to={`/products/edit/${product.id}`}>
        <FontAwesomeIcon icon={faEdit} />Edit</Link></h3>
      <div>Name: {product.Name}</div>
      <div>Description: {product.Description}</div>
      <div>Price: {product.Price}</div>

      <div><button onClick={handleDelete}>
        <FontAwesomeIcon icon={faTrash} /> Delete</button></div>
    </> : <div>
      <FontAwesomeIcon icon={faSpinner} spin />Loading...</div>}
  </>;
};

export default ProductDetail;
