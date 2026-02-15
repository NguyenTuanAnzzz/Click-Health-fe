import { useDispatch, useSelector } from 'react-redux';
import { login, register, verifyEmail, logout, clearError, resetRegistration } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, isLoading, error, registrationStep, registeredEmail } = useSelector((state) => state.auth);

  const handleLogin = (email, password) => {
    return dispatch(login({ email, password }));
  };

  const handleRegister = (fullName, email, password, age, gender) => {
    return dispatch(register({ fullName, email, password, age, gender }));
  };

  const handleVerifyEmail = (email, code) => {
    return dispatch(verifyEmail({ email, code }));
  };

  const handleLogout = () => {
    return dispatch(logout());
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  const handleResetRegistration = () => {
    dispatch(resetRegistration());
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    registrationStep,
    registeredEmail,
    login: handleLogin,
    register: handleRegister,
    verifyEmail: handleVerifyEmail,
    logout: handleLogout,
    clearError: handleClearError,
    resetRegistration: handleResetRegistration,
  };
};

export default useAuth;