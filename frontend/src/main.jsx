// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import { AuthenticationContextAPiProvider } from './context_api/AuthenticationContextAPi.jsx';
import { FetchContextProvider } from './context_api/FetchContext.jsx';
import { SearchContextApiProvider } from './context_api/SearchContextApi.jsx';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <BrowserRouter>
    <AuthenticationContextAPiProvider>
      <FetchContextProvider>
        <SearchContextApiProvider>
          <App />
        </SearchContextApiProvider>
      </FetchContextProvider>
    </AuthenticationContextAPiProvider>
  </BrowserRouter>
  // </StrictMode>,
)
