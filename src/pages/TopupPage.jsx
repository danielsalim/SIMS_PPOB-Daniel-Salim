import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchData, submitTopUp } from '../services/api';
import { useNavigate } from 'react-router-dom';
import saldo from '../../public/Background Saldo.png';
import { Link } from "react-router-dom";

const TopupPage = () => {
  const token = useSelector((state) => state.userState.token); // Access token from Redux store
  const [balanceData, setBalance] = useState('');
  const [isBalanceVisible, setIsBalanceVisible] = useState(false); // State to control balance visibility
  const [topUpAmount, setTopUpAmount] = useState(''); // State for entered top-up amount
  const [isSubmitting, setIsSubmitting] = useState(false); // State for submission status
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch Balance
        const balance = await fetchData('balance', token);
        setBalance(balance.data.balance);
      } catch (err) {
        navigate('/login');
        console.log(err);
      }
    };

    fetchAllData();
  }, [token]);

  // Toggle balance visibility
  const toggleBalanceVisibility = () => {
    setIsBalanceVisible((prevState) => !prevState);
  };

  // Handle top-up submission
  const handleTopUp = async () => {
    if (!topUpAmount || isNaN(topUpAmount) || Number(topUpAmount) <= 0) {
      alert('Masukkan nominal yang valid.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await submitTopUp(Number(topUpAmount), token);
      alert('Top-up berhasil!');
      setBalance(response.data.newBalance);
      setTopUpAmount('');
    } catch (err) {
      console.log(err);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white py-4 px-64 flex justify-between items-center shadow-sm">
        <div className="flex items-center" >
          <img
            src="Logo.png" // Replace with your illustration URL
            alt="Logo"
            className="mr-2"
          />
          <Link to="/home" className="text-lg font-bold text-gray-800">SIMS PPOB</Link>
        </div>
        <nav className="space-x-4">
          <Link to="/topup" className="text-gray-800 hover:text-[#f42619]">Top Up</Link>
          <Link to="/transaction" className="text-gray-800 hover:text-[#f42619]">Transaction</Link>
          <Link to="/akun" className="text-gray-800 hover:text-[#f42619]">Akun</Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="px-64 py-6">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col mb-6">
            <img
              src="Profile Photo.png"
              className="w-24 h-24 rounded-full bg-gray-300 flex-shrink-0 mr-4 mb-4"
              alt="Profile"
            />
            <div>
              <p className="text-3xl text-gray-600 mb-2">Selamat datang,</p>
              <h2 className="text-5xl font-semibold text-gray-800">Kristanto Wibowo</h2>
            </div>
          </div>

          {/* Balance Card */}
          <div
            className="p-6 text-white rounded-lg mb-6 flex flex-col w-[45%] justify-between shadow-lg bg-cover bg-center"
            style={{ backgroundImage: `url(${saldo})` }}
          >
            <div>
              <p className="text-base mt-8">Saldo anda</p>
              {isBalanceVisible ? (
                <h3 className="text-3xl font-bold">Rp {balanceData}</h3>
              ) : (
                <h3 className="text-3xl font-bold">Rp ••••••••</h3>
              )}
              <button
                className="text-sm focus:outline-none mt-2"
                onClick={toggleBalanceVisibility}
              >
                {isBalanceVisible ? 'Sembunyikan Saldo' : 'Lihat Saldo'}
              </button>
            </div>
          </div>
        </div>

        {/* Top-Up Section */}
        <div className="mb-6">
          <p className="mt-20 text-xl font-normal">Silakan masukkan</p>
          <p className="text-4xl font-semibold">Nominal Top Up</p>

          <div className="mt-6 flex flex-col items-start space-y-4">
            <input
              type="text"
              value={topUpAmount}
              onChange={(e) => setTopUpAmount(e.target.value)}
              placeholder="Masukkan nominal Top Up"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full text-gray-800"
            />

            <div className="flex space-x-4">
              {[10000, 20000, 50000, 100000, 250000, 500000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setTopUpAmount(amount.toString())}
                  className="bg-gray-200 text-gray-800 hover:bg-[#f42619] hover:text-white rounded-lg px-6 py-2"
                >
                  Rp{amount.toLocaleString()}
                </button>
              ))}
            </div>

            <button
              onClick={handleTopUp}
              disabled={isSubmitting}
              className={`mt-6 px-6 py-3 text-white font-bold rounded-lg ${isSubmitting ? 'bg-gray-400' : 'bg-[#f42619] hover:bg-[#d11b14]'
                }`}
            >
              {isSubmitting ? 'Memproses...' : 'Top Up'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TopupPage;
