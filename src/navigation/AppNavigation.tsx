/**
 * App Navigation Configuration
 * 
 * Main navigation setup for the SmartAudit application using React Navigation.
 * Implements a hybrid navigation pattern with stack and tab navigators.
 * 
 * Features:
 * - Role-based navigation (different tabs based on user role)
 * - Stack navigation for multi-step audit forms
 * - Tab navigation for main app sections
 * - Consistent styling and theming
 * - Authentication-aware routing
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, StyleSheet } from 'react-native';

// Import all screen components
import Login from '../screens/auth/Login';
import AuditFormStep1 from '../screens/audit/AuditFormStep1';
import AuditFormStep2 from '../screens/audit/AuditFormStep2';
import AuditFormStep3 from '../screens/audit/AuditFormStep3';
import AuditSummaryScreen from '../screens/audit/AuditSummaryScreen';
import AuditHistoryScreen from '../screens/audit/AuditHistoryScreen';
import AuditDetailScreen from '../screens/audit/AuditDetailScreen';
import PolicyViewerScreen from '../screens/policy/PolicyViewerScreen';

import { COLORS, FONT_SIZES } from '../constants';
import { useRole } from '../hooks/useRole';

// Create navigation instances
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * Simple tab icon component using emoji
 * Used as placeholder since vector icons are not configured
 */
const TabIcon = ({ name, focused }: { name: string; focused: boolean }) => (
  <View style={styles.tabIcon}>
    <Text style={[styles.tabIconText, focused && styles.tabIconTextFocused]}>
      {name}
    </Text>
  </View>
);

/**
 * Main tab navigator component
 * Shows different tabs based on user role
 */
const MainTabs = () => {
  const { user } = useRole();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: COLORS.border,
        },
      }}
    >
      {/* History tab - available to all authenticated users */}
      <Tab.Screen
        name="AuditHistory"
        component={AuditHistoryScreen}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ focused }) => <TabIcon name="📋" focused={focused} />,
        }}
      />

      {/* New Audit tab - only visible to Auditors */}
      {user?.role === 'Auditor' && (
        <Tab.Screen
          name="AuditFormStep1"
          component={AuditFormStep1}
          options={{
            tabBarLabel: 'New Audit',
            tabBarIcon: ({ focused }) => (
              <TabIcon name="➕" focused={focused} />
            ),
          }}
        />
      )}

      {/* Policy tab - available to all authenticated users */}
      <Tab.Screen
        name="PolicyViewer"
        component={PolicyViewerScreen}
        options={{
          tabBarLabel: 'Policy',
          tabBarIcon: ({ focused }) => <TabIcon name="📖" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
};

/**
 * Main app navigation component
 * Handles authentication flow and main app navigation
 */
const AppNavigation = () => {
  const { user } = useRole();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {/* Login screen - entry point for unauthenticated users */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        {/* Main app screens - available after authentication */}
        <>
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          
          {/* Multi-step audit creation flow */}
          <Stack.Screen
            name="AuditFormStep1"
            component={AuditFormStep1}
            options={{ title: 'New Audit - Step 1' }}
          />
          <Stack.Screen
            name="AuditFormStep2"
            component={AuditFormStep2}
            options={{ title: 'New Audit - Step 2' }}
          />
          <Stack.Screen
            name="AuditFormStep3"
            component={AuditFormStep3}
            options={{ title: 'New Audit - Step 3' }}
          />
          
          {/* Audit summary and detail screens */}
          <Stack.Screen
            name="AuditSummary"
            component={AuditSummaryScreen}
            options={{
              title: 'Audit Summary',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AuditDetail"
            component={AuditDetailScreen}
            options={{ title: 'Audit Details' }}
          />
          
          {/* Additional screens accessible from tabs */}
          <Stack.Screen
            name="AuditHistory"
            component={AuditHistoryScreen}
            options={{ title: 'Audit History' }}
          />
          <Stack.Screen
            name="PolicyViewer"
            component={PolicyViewerScreen}
            options={{ title: 'Policy & Manual' }}
          />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconText: {
    fontSize: FONT_SIZES.lg,
  },
  tabIconTextFocused: {
    color: COLORS.primary,
  },
});

export default AppNavigation;
