import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../styles/Sidebar.module.css";
//استخدام الدوال من ال slice
import { removeFromCart,clearCart } from "../redux/slices/cartSlice";
import { removeFromFavorites,clearFavorites } from "../redux/slices/favoritesSlice";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, onClose, activeTab }) => {
  //الوصول لحالة cart و favorites من الـ Redux.
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart?.cart || []);
  const favoriteItems = useSelector((state) => state.favorites?.favorites || []);
  const dataToRender = activeTab === "cart" ? cartItems : favoriteItems;
  

  const handleRemove = (id) => {
    if (activeTab === "cart") {
      dispatch(removeFromCart(id));
    } else {
      dispatch(removeFromFavorites(id));
    }
  };
  const handleCleare = () => {
    if (activeTab === "cart") {
      dispatch(clearCart());
    } else {
      dispatch(clearFavorites());
    }
  };


  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <button className={styles["close-btn"]} onClick={onClose}>✖</button>
      <h2>{activeTab === "cart" ? "Cart" : " Favorites"}</h2>

      <div className={styles["sidebar-content"]}>
        {dataToRender.length === 0 ? (
          <p>No items added yet.</p>
        ) : (
          <>
            <ul>
              {dataToRender.map((item) => (
                
                <li key={item.id} className={styles.item}>
                  <img src={item.image} alt={item.name} className={styles["item-img"]} />
                  <div className={styles["item-info"]}>
                    <p>{item.name}</p>
                    <p>{item.brand}</p>
                    
                  </div>
                  <button
                    className={styles["remove-btn"]}
                    onClick={() => handleRemove(item.id)}
                    title="Remove"
                  >
                    <FaTrash />
                  </button>
                  
                </li>
                
              ))}
                
                  <button className={styles["checkout-btn"]}
                    
                    onClick={() => handleCleare()}
                    title="Remove"
                  >
                    <FaTrash />
                  </button>
                  {activeTab === "cart" && (
                  <button
                    className={styles["checkout-btn"]}
                    onClick={() => navigate("/checkout")}
                  >
                    Checkout
                  </button>
                  )}
                 
            </ul>
           
        
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
