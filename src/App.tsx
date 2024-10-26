import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { MyReceipts } from './pages/MyReceipts';
import { ErrorBoundary } from './components/ErrorBoundary';

// Development helper to log render cycles
const withDevTools = (WrappedComponent: React.ComponentType<any>) => {
  if (process.env.NODE_ENV === 'development') {
    return (props: any) => {
      console.log(`[Dev] Rendering ${WrappedComponent.name}`, { props });
      return <WrappedComponent {...props} />;
    };
  }
  return WrappedComponent;
};

const WrappedLogin = withDevTools(Login);
const WrappedMyReceipts = withDevTools(MyReceipts);

function App() {
  // Temporarily set to true to bypass authentication
  const isAuthenticated = true;

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={isAuthenticated ? <Navigate to="/receipts" /> : <WrappedLogin />} 
          />
          <Route 
            path="/receipts" 
            element={isAuthenticated ? <WrappedMyReceipts /> : <Navigate to="/" />} 
          />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;