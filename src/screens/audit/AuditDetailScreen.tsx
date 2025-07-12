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
import { Card } from '../../components/ui/Card';
import { LogoutButton } from '../../components/ui/LogoutButton';
import { AuditFormData, NavigationProps } from '../../types';
import {
  COLORS,
  SPACING,
  FONT_SIZES,
  PRIORITY_LEVELS,
  CHECKLIST_ITEMS,
} from '../../constants';
import { useLogout } from '../../hooks/useLogout';

const { width } = Dimensions.get('window');

const AuditDetailScreen: React.FC<NavigationProps> = ({
  route,
  navigation,
}) => {
  const audit = route?.params?.audit as AuditFormData;
  const { handleLogout } = useLogout();

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      ' at ' +
      date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
  };

  const getPriorityColor = (priority: string): string => {
    const priorityItem = PRIORITY_LEVELS.find(p => p.value === priority);
    return priorityItem?.color || COLORS.gray;
  };

  const getRatingStars = (rating: number): string => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const getCheckedItems = (): string[] => {
    return Object.entries(audit.checklistItems)
      .filter(([_, checked]) => checked)
      .map(([item, _]) => item);
  };

  const getUncheckedItems = (): string[] => {
    return Object.entries(audit.checklistItems)
      .filter(([_, checked]) => !checked)
      .map(([item, _]) => item);
  };

  if (!audit) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Audit not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{audit.auditTitle}</Text>
            <LogoutButton
              onPress={() => handleLogout(navigation)}
              style={styles.logoutButton}
            />
          </View>
          <View
            style={[
              styles.priorityBadge,
              { backgroundColor: getPriorityColor(audit.priority!) },
            ]}
          >
            <Text style={styles.priorityText}>{audit.priority} Priority</Text>
          </View>
        </View>

        <Card title="Basic Information">
          <View style={styles.infoRow}>
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.value}>{audit.auditLocation}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Audit Date:</Text>
            <Text style={styles.value}>{audit.auditDate}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Type:</Text>
            <Text style={styles.value}>{audit.auditType}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Created By:</Text>
            <Text style={styles.value}>{audit.createdBy}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Created At:</Text>
            <Text style={styles.value}>{formatDate(audit.createdAt)}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Status:</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{audit.status}</Text>
            </View>
          </View>
        </Card>

        <Card title="Ratings">
          <View style={styles.ratingRow}>
            <Text style={styles.ratingLabel}>Overall Rating:</Text>
            <Text style={styles.ratingStars}>
              {getRatingStars(audit.overallRating)}
            </Text>
            <Text style={styles.ratingValue}>({audit.overallRating}/5)</Text>
          </View>

          <View style={styles.ratingRow}>
            <Text style={styles.ratingLabel}>Compliance:</Text>
            <Text style={styles.ratingStars}>
              {getRatingStars(audit.complianceRating)}
            </Text>
            <Text style={styles.ratingValue}>({audit.complianceRating}/5)</Text>
          </View>

          <View style={styles.ratingRow}>
            <Text style={styles.ratingLabel}>Safety:</Text>
            <Text style={styles.ratingStars}>
              {getRatingStars(audit.safetyRating)}
            </Text>
            <Text style={styles.ratingValue}>({audit.safetyRating}/5)</Text>
          </View>

          <View style={styles.ratingRow}>
            <Text style={styles.ratingLabel}>Quality:</Text>
            <Text style={styles.ratingStars}>
              {getRatingStars(audit.qualityRating)}
            </Text>
            <Text style={styles.ratingValue}>({audit.qualityRating}/5)</Text>
          </View>
        </Card>

        <Card title="Checklist Results">
          {getCheckedItems().length > 0 && (
            <View style={styles.checklistSection}>
              <Text style={styles.checklistTitle}>✅ Completed Items:</Text>
              {getCheckedItems().map((item, index) => (
                <Text key={index} style={styles.checklistItem}>
                  • {item}
                </Text>
              ))}
            </View>
          )}

          {getUncheckedItems().length > 0 && (
            <View style={styles.checklistSection}>
              <Text style={styles.checklistTitle}>❌ Incomplete Items:</Text>
              {getUncheckedItems().map((item, index) => (
                <Text key={index} style={styles.checklistItem}>
                  • {item}
                </Text>
              ))}
            </View>
          )}
        </Card>

        <Card title="Findings & Recommendations">
          <View style={styles.textSection}>
            <Text style={styles.sectionTitle}>Key Findings:</Text>
            <Text style={styles.sectionContent}>{audit.findings}</Text>
          </View>

          <View style={styles.textSection}>
            <Text style={styles.sectionTitle}>Recommendations:</Text>
            <Text style={styles.sectionContent}>{audit.recommendations}</Text>
          </View>

          {audit.actionItems && (
            <View style={styles.textSection}>
              <Text style={styles.sectionTitle}>Action Items:</Text>
              <Text style={styles.sectionContent}>{audit.actionItems}</Text>
            </View>
          )}
        </Card>

        {audit.images && audit.images.length > 0 && (
          <Card title="Supporting Images">
            <Text style={styles.imageCount}>
              {audit.images.length} image{audit.images.length !== 1 ? 's' : ''}{' '}
              attached
            </Text>
            <View style={styles.imagesContainer}>
              {audit.images.map((imageUri, index) => (
                <Image
                  key={index}
                  source={{ uri: imageUri }}
                  style={styles.image}
                />
              ))}
            </View>
          </Card>
        )}
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
    alignItems: 'center',
    width: '100%',
    marginBottom: SPACING.sm,
  },
  title: {
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    flex: 1,
  },
  logoutButton: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  priorityBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: SPACING.md,
  },
  priorityText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  label: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: COLORS.text,
    flex: 1,
  },
  value: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    flex: 2,
    textAlign: 'right',
  },
  statusBadge: {
    backgroundColor: COLORS.success,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs / 2,
    borderRadius: SPACING.sm,
  },
  statusText: {
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
    width: 100,
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
  checklistSection: {
    marginBottom: SPACING.md,
  },
  checklistTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  checklistItem: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    marginBottom: SPACING.xs,
    paddingLeft: SPACING.sm,
  },
  textSection: {
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  sectionContent: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    lineHeight: 20,
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
  image: {
    width: (width - SPACING.md * 6) / 2,
    height: (width - SPACING.md * 6) / 2,
    borderRadius: SPACING.sm,
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
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
  },
});

export default AuditDetailScreen;
