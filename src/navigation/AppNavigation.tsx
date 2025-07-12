import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, StyleSheet } from 'react-native';

// Import screens
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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Simple icon component since we don't have react-native-vector-icons
const TabIcon = ({ name, focused }: { name: string; focused: boolean }) => (
  <View style={styles.tabIcon}>
    <Text style={[styles.tabIconText, focused && styles.tabIconTextFocused]}>
      {name}
    </Text>
  </View>
);

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
      <Tab.Screen
        name="AuditHistory"
        component={AuditHistoryScreen}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ focused }) => <TabIcon name="📋" focused={focused} />,
        }}
      />

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
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        <>
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
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
          <Stack.Screen
            name="AuditSummary"
            component={AuditSummaryScreen}
            options={{
              title: 'Audit Summary',
              headerLeft: () => null, // Prevent going back
            }}
          />
          <Stack.Screen
            name="AuditDetail"
            component={AuditDetailScreen}
            options={{ title: 'Audit Details' }}
          />
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
