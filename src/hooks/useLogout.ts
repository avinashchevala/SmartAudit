/**
 * useLogout Hook
 * 
 * Custom hook that provides logout functionality with confirmation dialog.
 * Handles user logout process including navigation reset and error handling.
 * 
 * Features:
 * - Confirmation dialog before logout
 * - Automatic navigation to login screen
 * - Error handling for logout failures
 */

import { Alert } from 'react-native';
import { useRole } from './useRole';

/**
 * Hook that provides logout functionality
 * 
 * @returns Object with handleLogout function
 */
export const useLogout = () => {
  const { logout } = useRole();

  /**
   * Handles user logout with confirmation dialog
   * Shows confirmation alert and navigates to login screen on success
   * 
   * @param navigation - React Navigation object for screen navigation
   */
  const handleLogout = (navigation: any) => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            // Clear user session data
            await logout();
            
            // Reset navigation stack to login screen
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          } catch (error) {
            console.error('Logout error:', error);
            Alert.alert('Error', 'Failed to logout. Please try again.');
          }
        },
      },
    ]);
  };

  return { handleLogout };
};
