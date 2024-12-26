import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 
import Home from './components/Home';
import Auth from './components/Auth';
import ProtectedRoute from './components/ProtectedRoute';
import AddPost from './components/AddPost';
import EditPost from './components/EditPost';

const App = () => {
  return (
    <AuthProvider> 
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/posts/edit/:id"
            element={
              <ProtectedRoute>
                <EditPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts/add"
            element={
              <ProtectedRoute>
                <AddPost />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
