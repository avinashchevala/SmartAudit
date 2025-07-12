import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Button } from '../../components/ui/Button';
import { LogoutButton } from '../../components/ui/LogoutButton';
import { NavigationProps } from '../../types';
import { useLogout } from '../../hooks/useLogout';
import { COLORS, SPACING, FONT_SIZES, POLICY_URL } from '../../constants';

const PolicyViewerScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const { handleLogout } = useLogout();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLoadStart = () => {
    setLoading(true);
    setError(null);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    setLoading(false);
    setError(
      'Failed to load policy document. Please check your internet connection.',
    );
    console.error('WebView error:', nativeEvent);
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
  };

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Unable to Load Policy</Text>
          <Text style={styles.errorMessage}>{error}</Text>
          <Button
            title="Retry"
            onPress={handleRetry}
            style={styles.retryButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>Audit Policy & Manual</Text>
            <Text style={styles.subtitle}>
              ISO 19011 - Guidelines for Auditing
            </Text>
          </View>
          <LogoutButton
            onPress={() => handleLogout(navigation)}
            style={styles.logoutButton}
          />
        </View>
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading policy document...</Text>
        </View>
      )}

      <WebView
        source={{ uri: POLICY_URL }}
        style={styles.webView}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        startInLoadingState={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsFullscreenVideo={true}
        mixedContentMode="compatibility"
        renderError={errorName => (
          <View style={styles.errorContainer}>
            <Text style={styles.errorTitle}>Error Loading Policy</Text>
            <Text style={styles.errorMessage}>
              {errorName || 'An unknown error occurred'}
            </Text>
            <Button
              title="Retry"
              onPress={handleRetry}
              style={styles.retryButton}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  titleSection: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  logoutButton: {
    alignSelf: 'flex-start',
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  webView: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    zIndex: 1,
  },
  loadingText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  errorTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.danger,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.lg,
    lineHeight: 20,
  },
  retryButton: {
    minWidth: 120,
  },
});

export default PolicyViewerScreen;
