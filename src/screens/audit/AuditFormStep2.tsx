import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Checkbox } from '../../components/ui/FormControls';
import { AuditStep1Data, AuditStep2Data, NavigationProps } from '../../types';
import { COLORS, SPACING, FONT_SIZES, CHECKLIST_ITEMS } from '../../constants';
import { StorageService } from '../../services/StorageService';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  label: string;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange, label }) => {
  return (
    <View style={styles.ratingContainer}>
      <Text style={styles.ratingLabel}>{label}</Text>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => onRatingChange(star)}
            style={styles.star}
          >
            <Text style={[styles.starText, star <= rating && styles.starActive]}>
              ★
            </Text>
          </TouchableOpacity>
        ))}
        <Text style={styles.ratingValue}>({rating}/5)</Text>
      </View>
    </View>
  );
};

const AuditFormStep2: React.FC<NavigationProps> = ({ navigation, route }) => {
  const step1Data = route?.params?.step1Data as AuditStep1Data;
  
  const [formData, setFormData] = useState<AuditStep2Data>({
    overallRating: 3,
    complianceRating: 3,
    safetyRating: 3,
    qualityRating: 3,
    checklistItems: {},
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDraft();
  }, []);

  const loadDraft = async () => {
    try {
      const draft = await StorageService.getDraft();
      if (draft && draft.overallRating) {
        setFormData(prev => ({ ...prev, ...draft }));
      }
    } catch (error) {
      console.error('Error loading draft:', error);
    }
  };

  const handleChecklistChange = (item: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      checklistItems: {
        ...prev.checklistItems,
        [item]: checked,
      },
    }));
  };

  const handleNext = async () => {
    setLoading(true);

    try {
      const combinedData = { ...step1Data, ...formData };
      await StorageService.saveDraft(combinedData);
      
      navigation.navigate('AuditFormStep3', { 
        step1Data,
        step2Data: formData 
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to save data. Please try again.');
      console.error('Save error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  if (!step1Data) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No data from Step 1</Text>
          <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Audit Assessment</Text>
          <Text style={styles.subtitle}>Step 2 of 3: Ratings & Checklist</Text>
        </View>

        <Card title="Ratings">
          <StarRating
            label="Overall Rating"
            rating={formData.overallRating}
            onRatingChange={(rating) => setFormData(prev => ({ ...prev, overallRating: rating }))}
          />
          
          <StarRating
            label="Compliance Rating"
            rating={formData.complianceRating}
            onRatingChange={(rating) => setFormData(prev => ({ ...prev, complianceRating: rating }))}
          />
          
          <StarRating
            label="Safety Rating"
            rating={formData.safetyRating}
            onRatingChange={(rating) => setFormData(prev => ({ ...prev, safetyRating: rating }))}
          />
          
          <StarRating
            label="Quality Rating"
            rating={formData.qualityRating}
            onRatingChange={(rating) => setFormData(prev => ({ ...prev, qualityRating: rating }))}
          />
        </Card>

        <Card title="Checklist Items">
          <Text style={styles.checklistDescription}>
            Please check all items that apply to this audit:
          </Text>
          
          {CHECKLIST_ITEMS.map((item) => (
            <Checkbox
              key={item}
              label={item}
              checked={formData.checklistItems[item] || false}
              onPress={() => handleChecklistChange(item, !formData.checklistItems[item])}
            />
          ))}
        </Card>

        <View style={styles.buttonContainer}>
          <Button
            title="Back"
            onPress={handleBack}
            variant="outline"
            style={styles.backButton}
          />
          <Button
            title="Next"
            onPress={handleNext}
            loading={loading}
            style={styles.nextButton}
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
  title: {
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  ratingContainer: {
    marginBottom: SPACING.md,
  },
  ratingLabel: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    padding: SPACING.xs,
  },
  starText: {
    fontSize: FONT_SIZES.xl,
    color: COLORS.gray,
  },
  starActive: {
    color: COLORS.warning,
  },
  ratingValue: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginLeft: SPACING.sm,
  },
  checklistDescription: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.lg,
  },
  backButton: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  nextButton: {
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

export default AuditFormStep2;
