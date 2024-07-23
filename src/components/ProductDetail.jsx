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
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: id, ...docSnap.data() });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error getting document:", error);
      }
    };

    fetchProduct();
  }, [id]);

  async function handleDelete() {
    try {
      await deleteDoc(doc(db, "products", id));
      navigate('/products');
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  return product ? (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">{product.Name}</h1>
          <div className="flex gap-2">
            <Link to={`/products/edit/${product.id}`} className="text-blue-600 hover:underline">
              <FontAwesomeIcon icon={faEdit} /> Edit
            </Link>
            <button onClick={handleDelete} className="text-red-600 hover:underline">
              <FontAwesomeIcon icon={faTrash} /> Delete
            </button>
          </div>
        </div>
        {product.imageUrl && (
          <img className="w-full h-64 object-cover rounded-lg mb-4" src={product.imageUrl} alt={product.Name} />
        )}
        <p className="text-gray-700 mb-4">{product.Description}</p>
        <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
          <p className="text-lg font-semibold">Price: ${product.Price}</p>
        </div>
      </div>
    </div>
  ) : (
    <div className="container mx-auto p-4 text-center">
      <FontAwesomeIcon icon={faSpinner} spin size="2x" />
      <p>Loading...</p>
    </div>
  );
};

export default ProductDetail;
