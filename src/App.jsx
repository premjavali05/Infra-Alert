import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import AuthLogin from './pages/AuthLogin';
import AuthRegister from './pages/AuthRegister';
import Main from './pages/Main';
import UserDashboard from './pages/UserDashboard';
import AuthDashboard from './pages/AuthDashboard';
import ComplaintForm from './pages/ComplaintForm';
import ViewInProgress from './pages/ViewInProgress';
import ViewSolved from './pages/ViewSolved';
import ViewRejected from './pages/ViewRejected';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { isAuthenticated, userType } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/auth-login" element={<AuthLogin />} />
        <Route path="/auth-register" element={<AuthRegister />} />
        
        {/* Protected routes - User */}
        <Route 
          path="/main" 
          element={
            <ProtectedRoute isAllowed={isAuthenticated && userType === 'user'}>
              <Main />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user-dashboard" 
          element={
            <ProtectedRoute isAllowed={isAuthenticated && userType === 'user'}>
              <UserDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/complaint-form/:category" 
          element={
            <ProtectedRoute isAllowed={isAuthenticated && userType === 'user'}>
              <ComplaintForm />
            </ProtectedRoute>
          } 
        />
        
        {/* Protected routes - Authority */}
        <Route 
          path="/auth-dashboard" 
          element={
            <ProtectedRoute isAllowed={isAuthenticated && userType === 'authority'}>
              <AuthDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/view-inprogress" 
          element={
            <ProtectedRoute isAllowed={isAuthenticated && userType === 'authority'}>
              <ViewInProgress />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/view-solved" 
          element={
            <ProtectedRoute isAllowed={isAuthenticated && userType === 'authority'}>
              <ViewSolved />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/view-rejected" 
          element={
            <ProtectedRoute isAllowed={isAuthenticated && userType === 'authority'}>
              <ViewRejected />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;