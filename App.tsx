/**
 * Internal Auditing App
 * A React Native mobile application for internal auditing workflows
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { RoleProvider } from './src/contexts/RoleContext';
import AppNavigation from './src/navigation/AppNavigation';

function App(): React.JSX.Element {
  return (
    <RoleProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <AppNavigation />
      </SafeAreaView>
    </RoleProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default App;
