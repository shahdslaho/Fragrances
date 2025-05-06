import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../styles/Sidebar.module.css";
import { removeFromCart } from "../redux/slices/cartSlice";
import { removeFromFavorites } from "../redux/slices/favoritesSlice";
import { FaTrash } from "react-icons/fa"; // <-- Add this import
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, onClose, activeTab }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart?.cart || []);
  const favoriteItems = useSelector((state) => state.favorites?.favorites || []);
  const dataToRender = activeTab === "cart" ? cartItems : favoriteItems;
  const navigate = useNavigate();

  const handleRemove = (id) => {
    if (activeTab === "cart") {
      dispatch(removeFromCart(id));
    } else {
      dispatch(removeFromFavorites(id));
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
            </ul>
            {/* Checkout Button: only show in cart tab */}
            {activeTab === "cart" && (
              <button
                className={styles["checkout-btn"]}
                onClick={() => navigate("/checkout")}
              >
                Checkout
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
