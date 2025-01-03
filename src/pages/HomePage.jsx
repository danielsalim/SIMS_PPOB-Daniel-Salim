import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchData } from '../services/api';
import { useNavigate } from 'react-router-dom';
import saldo from '../../public/Background Saldo.png'
import { Link } from "react-router-dom";

const HomePage = () => {
  const token = useSelector((state) => state.userState.token); // Access token from Redux store
  const [bannerData, setBannerData] = useState([]);
  const [servicesData, setServicesData] = useState([]);
  const [balanceData, setBalance] = useState('');
  const [isBalanceVisible, setIsBalanceVisible] = useState(false); // State to control balance visibility
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch banner data
        const banner = await fetchData('banner', token);
        setBannerData(banner.data);

        // Fetch services data
        const services = await fetchData('services', token);
        setServicesData(services.data);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white py-4 px-64 flex justify-between items-center shadow-sm">
        <div className="flex items-center">
          <img
            src='Logo.png' // Replace with your illustration URL
            alt="Logo"
            className="mr-2"
          />
          <h1 className="text-lg font-bold text-gray-800">SIMS PPOB</h1>
        </div>
        <nav className="space-x-4">
          <Link to="/topup" className="text-gray-800 hover:text-[#f42619]">Top Up</Link>
          <Link to="/transaction" className="text-gray-800 hover:text-[#f42619]">Transaction</Link>
          <Link to="/akun" className="text-gray-800 hover:text-[#f42619]">Akun</Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="px-64 py-6">
        <div className='flex flex-row justify-between'>
          <div className="flex flex-col mb-6">
            <img
              src='Profile Photo.png'
              className="w-24 h-24 rounded-full bg-gray-300 flex-shrink-0 mr-4 mb-4"
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
                <h3 className="text-3xl font-bold">Rp {balanceData}</h3> // Show balance if visible
              ) : (
                <h3 className="text-3xl font-bold">Rp ••••••••</h3> // Mask balance if not visible
              )}
              <button
                className="text-sm focus:outline-none mt-2"
                onClick={toggleBalanceVisibility} // Toggle visibility
              >
                {isBalanceVisible ? 'Sembunyikan Saldo' : 'Lihat Saldo'}
              </button>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-6">
          <div className="flex flex-row gap-4 mt-16 w-full flex-wrap">
            {servicesData.length > 0 ? (
              servicesData.map((service, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center w-32 h-32 p-4  hover:shadow-md cursor-pointer rounded-lg transition-all duration-300"
                >
                  <img
                    src={service.service_name + ".png"}
                    alt={service.service_name}
                    className="w-16 h-16 mb-3 object-contain"
                  />
                  <p className="w-32 text-xs text-gray-800 font-semibold text-center truncate">{service.service_name}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Loading services...</p>
            )}
          </div>
        </div>

        {/* Banner Section */}
        <div>
          <p className='mt-20 text-xl font-semibold'>Temukan promo menarik</p>
          <div className="flex space-x-4 overflow-x-auto mt-8">
            {bannerData.length > 0 ? (
              bannerData.map((banner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-64 h-32 bg-cover bg-center rounded-lg shadow-md"
                >
                  <img src={banner.banner_name + ".png"} alt={banner.banner_name} className="w-15 h-15 mb-2" />
                  <p className="text-sm text-gray-800 font-medium">{banner.name}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Loading banners...</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
