import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { LogoutButton } from '../../components/ui/LogoutButton';
import { AuditFormData, NavigationProps } from '../../types';
import { useLogout } from '../../hooks/useLogout';
import { COLORS, SPACING, FONT_SIZES, PRIORITY_LEVELS } from '../../constants';

const { width } = Dimensions.get('window');

const AuditSummaryScreen: React.FC<NavigationProps> = ({
  navigation,
  route,
}) => {
  const auditData = route?.params?.auditData as AuditFormData;
  const { handleLogout } = useLogout();

  const handleGoToHistory = () => {
    navigation.navigate('AuditHistory');
  };

  const handleCreateNew = () => {
    navigation.navigate('AuditFormStep1');
  };

  const getRatingStars = (rating: number): string => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const getPriorityColor = (priority: string): string => {
    const priorityItem = PRIORITY_LEVELS.find(p => p.value === priority);
    return priorityItem?.color || COLORS.gray;
  };

  const getCheckedItemsCount = (): number => {
    return Object.values(auditData.checklistItems).filter(Boolean).length;
  };

  const getTotalItemsCount = (): number => {
    return Object.keys(auditData.checklistItems).length;
  };

  if (!auditData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No audit data available</Text>
          <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <View style={styles.titleSection}>
              <Text style={styles.title}>Audit Submitted Successfully!</Text>
              <Text style={styles.subtitle}>
                Your audit has been saved and is ready for review
              </Text>
            </View>
            <LogoutButton
              onPress={() => handleLogout(navigation)}
              style={styles.logoutButton}
            />
          </View>
        </View>

        <Card title="Audit Summary">
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Title:</Text>
            <Text style={styles.summaryValue}>{auditData.auditTitle}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Location:</Text>
            <Text style={styles.summaryValue}>{auditData.auditLocation}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Date:</Text>
            <Text style={styles.summaryValue}>{auditData.auditDate}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Type:</Text>
            <Text style={styles.summaryValue}>{auditData.auditType}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Created By:</Text>
            <Text style={styles.summaryValue}>{auditData.createdBy}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Priority:</Text>
            {auditData?.priority && (
              <View
                style={[
                  styles.priorityBadge,
                  { backgroundColor: getPriorityColor(auditData?.priority) },
                ]}
              >
                <Text style={styles.priorityText}>{auditData.priority}</Text>
              </View>
            )}
          </View>
        </Card>

        <Card title="Ratings Overview">
          <View style={styles.ratingRow}>
            <Text style={styles.ratingLabel}>Overall:</Text>
            <Text style={styles.ratingStars}>
              {getRatingStars(auditData.overallRating)}
            </Text>
            <Text style={styles.ratingValue}>
              ({auditData.overallRating}/5)
            </Text>
          </View>

          <View style={styles.ratingRow}>
            <Text style={styles.ratingLabel}>Compliance:</Text>
            <Text style={styles.ratingStars}>
              {getRatingStars(auditData.complianceRating)}
            </Text>
            <Text style={styles.ratingValue}>
              ({auditData.complianceRating}/5)
            </Text>
          </View>

          <View style={styles.ratingRow}>
            <Text style={styles.ratingLabel}>Safety:</Text>
            <Text style={styles.ratingStars}>
              {getRatingStars(auditData.safetyRating)}
            </Text>
            <Text style={styles.ratingValue}>({auditData.safetyRating}/5)</Text>
          </View>

          <View style={styles.ratingRow}>
            <Text style={styles.ratingLabel}>Quality:</Text>
            <Text style={styles.ratingStars}>
              {getRatingStars(auditData.qualityRating)}
            </Text>
            <Text style={styles.ratingValue}>
              ({auditData.qualityRating}/5)
            </Text>
          </View>
        </Card>

        <Card title="Checklist Summary">
          <Text style={styles.checklistSummary}>
            {getCheckedItemsCount()} of {getTotalItemsCount()} items completed
          </Text>

          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${
                    (getCheckedItemsCount() / getTotalItemsCount()) * 100
                  }%`,
                },
              ]}
            />
          </View>
        </Card>

        {auditData?.images && auditData.images.length > 0 && (
          <Card title="Supporting Images">
            <Text style={styles.imageCount}>
              {auditData.images.length} image(s) attached
            </Text>
            <View style={styles.imagesContainer}>
              {auditData.images.map((imageUri, index) => (
                <Image
                  key={index}
                  source={{ uri: imageUri }}
                  style={styles.thumbnail}
                />
              ))}
            </View>
          </Card>
        )}

        <View style={styles.buttonContainer}>
          <Button
            title="View History"
            onPress={handleGoToHistory}
            variant="outline"
            style={styles.historyButton}
          />
          <Button
            title="Create New Audit"
            onPress={handleCreateNew}
            style={styles.newAuditButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flexGrow: 1,
    padding: SPACING.md,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  titleSection: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
    color: COLORS.success,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  logoutButton: {
    alignSelf: 'flex-start',
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  summaryLabel: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: COLORS.text,
    flex: 1,
  },
  summaryValue: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    flex: 2,
    textAlign: 'right',
  },
  priorityBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs / 2,
    borderRadius: SPACING.sm,
  },
  priorityText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  ratingLabel: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: COLORS.text,
    width: 80,
  },
  ratingStars: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.warning,
    marginRight: SPACING.sm,
  },
  ratingValue: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  checklistSummary: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.light,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.success,
  },
  imageCount: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  thumbnail: {
    width: (width - SPACING.md * 6) / 3,
    height: (width - SPACING.md * 6) / 3,
    borderRadius: SPACING.sm,
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.lg,
  },
  historyButton: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  newAuditButton: {
    flex: 1,
    marginLeft: SPACING.sm,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.md,
  },
  errorText: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.danger,
    marginBottom: SPACING.md,
  },
});

export default AuditSummaryScreen;
