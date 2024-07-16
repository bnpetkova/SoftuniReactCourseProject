import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  let { id } = useParams();
  return <h2>Product ID: {id}</h2>;
};

export default ProductDetail;
