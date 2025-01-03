import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';  // Import Provider from react-redux
import './styles/index.css';
import App from './App.jsx';
import store from './states'; // Import your store

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>  {/* Wrap the App with Provider */}
            <App />
        </Provider>
    </StrictMode>
);
