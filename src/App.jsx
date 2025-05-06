import React from 'react';
import { Routes, Route } from 'react-router-dom'; // إزالة Router
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';  // استيراد QueryClient و QueryClientProvider

import Navbar from './components/Navbar';
import Home from './pages/Home';
import FragranceList from './pages/FragranceList'; // استيراد FragranceList
import FragranceDetails from './pages/FragranceDetails';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Checkout from './pages/Checkout';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}> {/* لف التطبيق بـ QueryClientProvider */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/shop" element={<FragranceList/>} />
        {/* <Route path="/shop" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} /> */}
      
        <Route path="/fragrance/:id" element={<FragranceDetails/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
