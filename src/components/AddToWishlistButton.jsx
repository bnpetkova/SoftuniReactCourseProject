import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import useAddToWishlist from './useAddToWishlist';

const AddToWishlistButton = ({ product }) => {
    const { addToWishlist, error } = useAddToWishlist();

    return (
        <>
            <button onClick={() => addToWishlist(product)} className="btn-add">
                <FontAwesomeIcon icon={faHeart} /> Add to Wishlist
            </button>
            {error && <p className="error">{error}</p>}
        </>
    );
};

AddToWishlistButton.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.string.isRequired,
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string,
        imageUrl: PropTypes.string
    }).isRequired
};

export default AddToWishlistButton;
