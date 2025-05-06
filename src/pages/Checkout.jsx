import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../styles/Checkout.module.css";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { increaseQuantity, decreaseQuantity } from "../redux/slices/cartSlice";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart?.cart || []);
  const fakePrice = 99;
  const total = cartItems.reduce((sum, item) => sum + (item.quantity || 1) * fakePrice, 0);
  const dispatch = useDispatch();

  
  const perfumeNames = cartItems.map(item => item.name).join(', ');
  const message = encodeURIComponent(
    `Hello, I would like to order the following perfumes: ${perfumeNames}`
  );
 
  const phone = "+6283159979459";
  const waLink = `https://wa.me/${phone}?text=${message}`;

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.checkoutCard}>
        <h2 className={styles.title}>Checkout</h2>
        {cartItems.length === 0 ? (
          <p style={{ textAlign: "center" }}>No items in cart.</p>
        ) : (
          <ul className={styles.cartList}>
            {cartItems.map((item) => (
              <li key={item.id} className={styles.cartItem}>
                <img src={item.image} alt={item.name} className={styles.cartImage} />
                <div className={styles.itemInfo}>
                  <p className={styles.itemName}>{item.name}</p>
                  <p className={styles.itemBrand}>{item.brand}</p>
                  <div className={styles.qtyControls}>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      type="button"
                      aria-label="Decrease"
                    >
                      <FaMinusCircle />
                    </button>
                    <span className={styles.qtyNum}>{item.quantity || 1}</span>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => dispatch(increaseQuantity(item.id))}
                      type="button"
                      aria-label="Increase"
                    >
                      <FaPlusCircle />
                    </button>
                  </div>
                </div>
                <span className={styles.itemPrice}>
                  {((item.quantity || 1) * fakePrice)} $
                </span>
              </li>
            ))}
          </ul>
        )}
        {cartItems.length > 0 && (
          <>
            <div className={styles.total}>
              Total: {total} $
            </div>
            <button
              className={styles.whatsappBtn}
              onClick={() => window.open(waLink, "_blank")}
            >
              Order via WhatsApp
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;