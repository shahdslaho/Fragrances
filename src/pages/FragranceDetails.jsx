import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { fetchFragrancesData } from '../api/fragranceApi';
import styles from '../styles/FragranceDetails.module.css';
import { FaHeart, FaRegHeart, FaCartPlus, FaInfoCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { addToFavorites } from '../redux/slices/favoritesSlice';
import stylesButton from '../styles/FragranceCard.module.css';


const FragranceDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [fragrance, setFragrance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const cart = useSelector(state => state.cart?.cart || []);
  const favorites = useSelector(state => state.favorites?.favorites || []);
  const { isAuthenticated } = useSelector(state => state.auth);
  
  // Move these checks after we confirm fragrance exists
  const isInCart = fragrance && cart.find(item => item.id === fragrance.id);
  const isFavorite = fragrance && favorites.find(item => item.id === fragrance.id);

  useEffect(() => {
    const getFragranceDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchFragrancesData({ pageParam: 1 });
        
        // Convert id to string for comparison
        const fragranceId = id.toString();
        
        // Find the specific fragrance from recommendations
        const foundFragrance = data.recommendations.find(item => item.id.toString() === fragranceId);
        
        if (foundFragrance) {
          setFragrance(foundFragrance);
        } else if (data.perfume && data.perfume.id.toString() === fragranceId) {
          setFragrance(data.perfume);
        } else {
          setError(true);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching fragrance details:", err);
        setError(true);
        setLoading(false);
      }
    };

    getFragranceDetails();
  }, [id]);

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
      return;
    }
    if (!isFavorite) {
      dispatch(addToFavorites(fragrance));
    }
  };
  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error || !fragrance) return <div className={styles.error}>Error loading fragrance details.</div>;

  console.log("fragrance details:", fragrance); // أضف هذا السطر هنا

  return (
    <div className={styles.container}>
   
      <div className={styles.detailsContainer}>
        <div className={styles.imageContainer}>
          <img 
            src={fragrance.image || 'https://via.placeholder.com/300'} 
            alt={fragrance.name} 
          />
         <div className={stylesButton.actions}>
      <button 
        className={styles.backButton}
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />
      </button>
          <button  className={styles.backButton} onClick={handleAddToFavorites} title="Add to Favorites">
            {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
          </button>
          <button  className={styles.backButton} onClick={handleAddToCart} title="Add to Cart">
            <FaCartPlus />
          </button>
        </div>
          </div>
        
        
        <div className={styles.infoContainer}>
          <h1>{fragrance.name}</h1>
          <h2 className={styles.brand}>{fragrance.brand}</h2>
          
          {/* Notes Section */}
          <div className={styles.notesSection}>
            <h3 className={styles.sectionTitle}>Notes</h3>
            <p className={styles.notesList}>
              {fragrance.notes && fragrance.notes.length > 0
                ? fragrance.notes.join(', ')
                : 'No notes available'}
            </p>
          </div>
        
         
          
          <div className={styles.description}>
            <h3>Description</h3>
            <p>
              {fragrance.description || 'No description available for this fragrance.'}
            </p>
          </div>
            {/* Accords Section */}
         <div className={styles.accordsSection}>
            <h3 className={styles.sectionTitle}>Accords</h3>
            <div className={styles.accordsList}>
              {fragrance.accords && fragrance.accords.length > 0
                ? fragrance.accords.map((accord, idx) => (
                    <span key={idx} className={styles.accordTag}>
                      {accord}
                    </span>
                  ))
                : <span className={styles.noAccords}>No accords available</span>
              }
            </div>
          
        </div>
     
        </div>
      </div>
      </div>
  );
};

export default FragranceDetails;
