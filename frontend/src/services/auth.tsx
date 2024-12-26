import api from '../utils/api';

interface AuthStatusResponse {
  isAuthenticated: boolean;
}

 
export const checkAuthStatus = async (): Promise<boolean> => {
  try {
    const response = await api.get<AuthStatusResponse>('/user/status');  
    return response.data.isAuthenticated;
  } catch (error) {
    console.error('Failed to check auth status:', error);
    return false;
  }
};
