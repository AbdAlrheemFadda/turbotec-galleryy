/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CarInventory from './pages/CarInventory';
import Rent from './pages/Rent';
import Motorcycles from './pages/Motorcycles';
import Checkout from './pages/Checkout';
import CarDetail from './pages/CarDetail';
import Auth from './pages/Auth';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/car" element={<CarInventory />} />
          <Route path="/car/:id" element={<CarDetail />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/motorcycles" element={<Motorcycles />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Layout>
    </Router>
  );
}
