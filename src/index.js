
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ErrorBoundary from './components/Errors/ErrorBoundary';
import { AuthProvider } from './contexts/AuthContext';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { LogOutDialogProvider } from './contexts/LogoutDialogContext';
import { MyPhotosProvider } from './contexts/MyPhotos';
import { AppDataProvider } from './contexts/AppDataContext';
import { PublicPhotoProvider } from './contexts/PublicPhotoContext';
ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <LogOutDialogProvider>
          <MyPhotosProvider>
            <AppDataProvider>
              <PublicPhotoProvider>
                <App />
              </PublicPhotoProvider>
            </AppDataProvider>
          </MyPhotosProvider>
        </LogOutDialogProvider>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode >,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
