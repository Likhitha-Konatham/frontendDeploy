import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getToken} from '../storage/Storage'; // Import your storage functions

const ProtectedRoute = ({ element: Component }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); 
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const token = await getToken();
        if (token) {
          setIsAuthenticated(true); 

        } else {
          setIsAuthenticated(false); // Not authenticated
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false); // Stop loading after check
      }
    };

    checkAccess();
  });

  if (loading) {
    // Optionally, show a loading spinner or message while checking auth
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" />; // Redirect to sign-in page if not authenticated
  }

  return <Component />; // Render the component if authenticated and authorized
};

export default ProtectedRoute;
