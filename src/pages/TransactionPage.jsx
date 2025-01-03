import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchData } from '../services/api';
import { useNavigate } from 'react-router-dom';
import saldo from '../../public/Background Saldo.png';
import { Link } from "react-router-dom";

const TransactionPage = () => {
  const token = useSelector((state) => state.userState.token); // Access token from Redux store
  const [balanceData, setBalance] = useState('');
  const [transactions, setTransactions] = useState([]); // State for transaction data
  const [isBalanceVisible, setIsBalanceVisible] = useState(false); // State to control balance visibility
  const [offset, setOffset] = useState(0); // Pagination offset
  const [limit] = useState(5); // Pagination limit
  const [hasMore, setHasMore] = useState(true); // Flag for more transactions
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch Balance
        const balance = await fetchData('balance', token);
        setBalance(balance.data.balance);

        // Fetch Initial Transactions
        await fetchTransactions(0);
      } catch (err) {
        navigate('/login');
        console.log(err);
      }
    };

    fetchInitialData();
  }, [token]);

  const fetchTransactions = async (currentOffset) => {
    try {
      const transactionData = await fetchData(
        `transaction/history?limit=${limit}&offset=${currentOffset}`,
        token
      );

      if (transactionData.data.transactions.length > 0) {
        setTransactions((prev) => [...prev, ...transactionData.data.transactions]);
        setOffset(currentOffset + limit);
      } else {
        setHasMore(false); // No more transactions to load
      }
    } catch (err) {
      console.log(err);
      alert('Gagal memuat data transaksi.');
    }
  };

  // Toggle balance visibility
  const toggleBalanceVisibility = () => {
    setIsBalanceVisible((prevState) => !prevState);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white py-4 px-64 flex justify-between items-center shadow-sm">
        <div className="flex items-center">
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

        {/* Transaction List */}
        <div>
          <p className="text-2xl font-semibold mt-8 mb-4">Semua Transaksi</p>
          <div className="space-y-4">
            {transactions.map((transaction, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-4"
              >
                <div>
                  <p
                    className={`text-xl font-semibold ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'
                      }`}
                  >
                    {transaction.amount > 0
                      ? `+ Rp${transaction.amount}`
                      : `- Rp${Math.abs(transaction.amount)}`}
                  </p>
                  <p className="text-sm text-gray-600">
                    {transaction.date} {transaction.time}
                  </p>
                </div>
                <p className="text-sm text-gray-800">{transaction.description}</p>
              </div>
            ))}
          </div>
          {hasMore && (
            <button
              onClick={() => fetchTransactions(offset)}
              className="mt-6 px-4 py-2 text-[#f42619] border border-[#f42619] rounded-lg"
            >
              Show more
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default TransactionPage;
