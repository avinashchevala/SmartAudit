/**
 * Audit History Screen
 * 
 * Displays a list of all completed audits with filtering and management capabilities.
 * Features:
 * - View audit history with sorting by creation date
 * - Role-based access control for viewing/deleting audits
 * - Pull-to-refresh functionality
 * - Navigation to detailed audit view
 * - Empty state handling
 * - Admin-only audit deletion
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { LogoutButton } from '../../components/ui/LogoutButton';
import { AuditFormData, NavigationProps } from '../../types';
import { COLORS, SPACING, FONT_SIZES, PRIORITY_LEVELS } from '../../constants';
import { StorageService } from '../../services/StorageService';
import { useLogout } from '../../hooks/useLogout';
import { useRole } from '../../hooks/useRole';

const AuditHistoryScreen: React.FC<NavigationProps> = ({ navigation }) => {
  // Hook to get current user and role information
  const { user } = useRole();
  // Hook to handle user logout functionality
  const { handleLogout } = useLogout();
  
  // State management for audit data and UI states
  const [audits, setAudits] = useState<AuditFormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  /**
   * Loads audit data from storage and sorts by creation date (newest first)
   * Also clears any draft data to ensure clean state
   */
  const loadAudits = async () => {
    await clearDraft();
    try {
      const auditData = await StorageService.getAudits();
      // Sort audits by creation date in descending order (newest first)
      setAudits(
        auditData.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ),
      );
    } catch (error) {
      console.error('Error loading audits:', error);
      Alert.alert('Error', 'Failed to load audit history');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  /**
   * Clears any draft audit data from storage
   * Ensures clean state when returning to history screen
   */
  const clearDraft = async () => {
    try {
      await StorageService.clearDraft();
    } catch (error) {
      console.error('Error clearing drafts:', error);
    }
  };

  // Load audits when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadAudits();
    }, []),
  );

  /**
   * Handles pull-to-refresh functionality
   */
  const handleRefresh = () => {
    setRefreshing(true);
    loadAudits();
  };

  /**
   * Handles audit deletion with role-based access control
   * Only Admins can delete audits with confirmation dialog
   * 
   * @param auditId - Unique identifier of the audit to delete
   * @param auditTitle - Title of the audit for confirmation dialog
   */
  const handleDeleteAudit = (auditId: string, auditTitle: string) => {
    // Check if user has admin permissions
    if (user?.role !== 'Admin') {
      Alert.alert('Access Denied', 'Only Admins can delete audits');
      return;
    }

    // Show confirmation dialog before deletion
    Alert.alert(
      'Delete Audit',
      `Are you sure you want to delete "${auditTitle}"? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await StorageService.deleteAudit(auditId);
              loadAudits(); // Refresh the list after deletion
              Alert.alert('Success', 'Audit deleted successfully');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete audit');
            }
          },
        },
      ],
    );
  };

  /**
   * Navigates to audit detail screen for viewing
   * 
   * @param audit - Complete audit data to display
   */
  const handleViewAudit = (audit: AuditFormData) => {
    navigation.navigate('AuditDetail', { audit });
  };

  /**
   * Formats timestamp for display in audit list
   * 
   * @param dateString - ISO date string to format
   * @returns Formatted date and time string
   */
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      ' ' +
      date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
  };

  /**
   * Gets the color associated with a priority level
   * 
   * @param priority - Priority level string
   * @returns Hex color code for the priority
   */
  const getPriorityColor = (priority: string): string => {
    const priorityItem = PRIORITY_LEVELS.find(p => p.value === priority);
    return priorityItem?.color || COLORS.gray;
  };

  /**
   * Generates star rating display string
   * 
   * @param rating - Rating value (1-5)
   * @returns String of filled and empty stars
   */
  const getRatingStars = (rating: number): string => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  /**
   * Checks if current user can delete audits
   * 
   * @returns True if user is Admin
   */
  const canDeleteAudit = (): boolean => {
    return user?.role === 'Admin';
  };

  /**
   * Checks if current user can view audit details
   * 
   * @returns True if user has any valid role
   */
  const canViewAudit = (): boolean => {
    return (
      user?.role === 'Admin' ||
      user?.role === 'Viewer' ||
      user?.role === 'Auditor'
    );
  };

  /**
   * Renders individual audit item in the list
   * Displays audit information with role-based action buttons
   * 
   * @param item - Audit data to render
   */
  const renderAuditItem = ({ item }: { item: AuditFormData }) => (
    <Card style={styles.auditCard}>
      <TouchableOpacity
        onPress={() => canViewAudit() && handleViewAudit(item)}
        disabled={!canViewAudit()}
      >
        {/* Audit header with title and priority badge */}
        <View style={styles.auditHeader}>
          <Text style={styles.auditTitle}>{item.auditTitle}</Text>
          <View
            style={[
              styles.priorityBadge,
              { backgroundColor: getPriorityColor(item.priority!) },
            ]}
          >
            <Text style={styles.priorityText}>{item.priority}</Text>
          </View>
        </View>

        {/* Location and date information */}
        <View style={styles.auditInfo}>
          <Text style={styles.auditLocation}>{item.auditLocation}</Text>
          <Text style={styles.auditDate}>{formatDate(item.createdAt)}</Text>
        </View>

        {/* Audit type and creator information */}
        <View style={styles.auditMeta}>
          <Text style={styles.auditType}>{item.auditType}</Text>
          <Text style={styles.auditCreator}>by {item.createdBy}</Text>
        </View>

        {/* Overall rating display */}
        <View style={styles.auditRating}>
          <Text style={styles.ratingLabel}>Overall Rating:</Text>
          <Text style={styles.ratingStars}>
            {getRatingStars(item.overallRating)}
          </Text>
          <Text style={styles.ratingValue}>({item.overallRating}/5)</Text>
        </View>

        {/* Admin-only delete button */}
        {canDeleteAudit() && (
          <View style={styles.actions}>
            <Button
              title="Delete"
              onPress={() => handleDeleteAudit(item.id, item.auditTitle)}
              variant="danger"
              size="small"
              style={styles.deleteButton}
            />
          </View>
        )}
      </TouchableOpacity>
    </Card>
  );

  /**
   * Renders empty state when no audits are available
   * Shows different messages based on user role
   */
  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>No Audits Found</Text>
      <Text style={styles.emptyMessage}>
        {user?.role === 'Auditor'
          ? 'Start by creating your first audit'
          : 'No audits have been submitted yet'}
      </Text>
      {/* Commented out - create button is in action bar instead */}
      {/* {user?.role === 'Auditor' && (
        <Button
          title="Create New Audit"
          onPress={() => navigation.navigate('AuditFormStep1')}
          style={styles.createButton}
        />
      )} */}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header section with title, logout button, and audit count */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Audit History</Text>
          <LogoutButton
            onPress={() => handleLogout(navigation)}
            style={styles.logoutButton}
          />
        </View>
        <Text style={styles.subtitle}>
          {audits.length} audit{audits.length !== 1 ? 's' : ''} found
        </Text>
      </View>

      {/* Action bar for Auditors to create new audits */}
      {user?.role === 'Auditor' && (
        <View style={styles.actionBar}>
          <Button
            title="New Audit"
            onPress={() => navigation.navigate('AuditFormStep1')}
            style={styles.newAuditButton}
          />
        </View>
      )}

      {/* Main audit list with pull-to-refresh */}
      <FlatList
        data={audits}
        renderItem={renderAuditItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
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
    paddingBottom: SPACING.sm,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
    flex: 1,
  },
  logoutButton: {
    alignSelf: 'flex-start',
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  actionBar: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.sm,
  },
  newAuditButton: {
    alignSelf: 'flex-end',
  },
  listContent: {
    padding: SPACING.md,
    paddingTop: 0,
  },
  auditCard: {
    marginBottom: SPACING.md,
  },
  auditHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  auditTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
    marginRight: SPACING.sm,
  },
  priorityBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs / 2,
    borderRadius: SPACING.sm,
  },
  priorityText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
  auditInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  auditLocation: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
  },
  auditDate: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  auditMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  auditType: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: '500',
  },
  auditCreator: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  auditRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  ratingLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    marginRight: SPACING.xs,
  },
  ratingStars: {
    fontSize: FONT_SIZES.md,
    color: COLORS.warning,
    marginRight: SPACING.xs,
  },
  ratingValue: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: SPACING.sm,
  },
  deleteButton: {
    minWidth: 80,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  emptyMessage: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.md,
  },
  createButton: {
    minWidth: 200,
  },
});

export default AuditHistoryScreen;
