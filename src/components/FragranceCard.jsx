import React from 'react';
import styles from '../styles/FragranceCard.module.css';
import { FaHeart, FaRegHeart, FaCartPlus, FaInfoCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { addToFavorites } from '../redux/slices/favoritesSlice';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const FragranceCard = ({ fragrance, reverse = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const cart = useSelector(state => state.cart?.cart || []);
  const favorites = useSelector(state => state.favorites?.favorites || []);

  const isInCart = cart.find(item => item.id === fragrance.id);
  const isFavorite = favorites.find(item => item.id === fragrance.id);
  const { isAuthenticated } = useSelector(state => state.auth);
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!isInCart) {
      dispatch(addToCart(fragrance));
    }
   
  };
  
  const handleAddToFavorites = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;}
    if (!isFavorite) {
      dispatch(addToFavorites(fragrance));
    }
    
  };
  
  return (
    <div className={`${styles.cardHorizontal} ${reverse ? styles.reverse : ''}`}>
      <img
        src={fragrance.image || 'https://via.placeholder.com/150'}
        alt={fragrance.name}
      />
      <div className={styles.cardContent}>
        <h2>{fragrance.name}</h2>
        <p className={styles.title}>{fragrance.brand}</p>
        <p className={styles.desc}>{fragrance.perfume || 'No description available.'}</p>

        <div className={styles.actions}>
          <button onClick={handleAddToFavorites} title="Add to Favorites">
            {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
          </button>
          <button onClick={handleAddToCart} title="Add to Cart">
            <FaCartPlus />
          </button>
          <Link to={`/fragrance/${fragrance.id}`} className={styles.detailsButton}>
            <FaInfoCircle />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FragranceCard;
