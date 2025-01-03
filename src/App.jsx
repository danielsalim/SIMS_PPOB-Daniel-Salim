import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import HomePage from './pages/HomePage';
import TopupPage from './pages/TopupPage';
import TransactionPage from './pages/TransactionPage';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* Define your routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/topup" element={<TopupPage />} />
          <Route path="/transaction" element={<TransactionPage />} />
          <Route path="/" element={<LoginPage />} /> {/* Redirect default to LoginPage */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;