import { createSlice } from "@reduxjs/toolkit";
//هذا هو الحالة الابتدائية (initial state) للـ Redux slice.
const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) || [],
};
//ينشئ الـ slice الخاص بالسلة.
const cartSlice = createSlice({
  //اسم الـ slice (بيظهر في Redux DevTools).
  name: "cartState",
  //يربطه بالحالة الابتدائية اللي فوق.
  initialState,
  //يحتوي على كل الدوال اللي تتحكم بسلوك السلة 
  reducers: {
    addToCart: (state, action) => {
      const existing = state.cart.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    increaseQuantity: (state, action) => {
      const item = state.cart.find(item => item.id === action.payload);
      if (item) {
        item.quantity = (item.quantity || 1) + 1;
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.cart.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem('cart');
    }
  }
});
//يصدر الدوال الجاهزة للاستخدام حتى تستخدميها في الـ components داخل dispatch.
export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
//يصدر الـ reducer الرئيسي حتى يتم ربطه في ملف store.js.
export default cartSlice.reducer;
