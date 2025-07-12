import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import {
  FormInput,
  FormPicker,
  AuditStep1FormData,
  validationSchemas,
} from '../../forms';
import { NavigationProps } from '../../types';
import { COLORS, SPACING, FONT_SIZES, AUDIT_TYPES } from '../../constants';
import { StorageService } from '../../services/StorageService';

const AuditFormStep1: React.FC<NavigationProps> = ({ navigation, route }) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AuditStep1FormData>({
    resolver: yupResolver(validationSchemas.auditStep1),
    defaultValues: {
      auditTitle: '',
      auditLocation: '',
      auditDate: new Date().toISOString().split('T')[0],
      auditType: AUDIT_TYPES[0],
    },
  });

  const onSubmit = async (data: AuditStep1FormData) => {
    try {
      // Save draft
      await StorageService.saveDraft(data);

      // Navigate to step 2
      navigation.navigate('AuditFormStep2', { step1Data: data });
    } catch (error) {
      Alert.alert('Error', 'Failed to save data. Please try again.');
      console.error('Save error:', error);
    }
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancel Audit',
      'Are you sure you want to cancel? Any unsaved changes will be lost.',
      [
        { text: 'Continue Editing', style: 'cancel' },
        {
          text: 'Cancel Audit',
          style: 'destructive',
          onPress: async() => {
            await StorageService.clearDraft();
            navigation.goBack();
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>New Audit</Text>
          <Text style={styles.subtitle}>Step 1 of 3: Basic Information</Text>
        </View>

        <Card title="Audit Details">
          <FormInput
            name="auditTitle"
            control={control}
            label="Audit Title"
            placeholder="Enter audit title"
            required
          />

          <FormInput
            name="auditLocation"
            control={control}
            label="Audit Location"
            placeholder="Enter audit location"
            required
          />

          <FormInput
            name="auditDate"
            control={control}
            label="Audit Date"
            placeholder="YYYY-MM-DD"
            required
          />

          <FormPicker
            name="auditType"
            control={control}
            label="Audit Type"
            items={AUDIT_TYPES}
          />
        </Card>

        <View style={styles.buttonContainer}>
          <Button
            title="Cancel"
            onPress={handleCancel}
            variant="outline"
            style={styles.cancelButton}
          />
          <Button
            title="Next"
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitting}
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.lg,
  },
  cancelButton: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  nextButton: {
    flex: 1,
    marginLeft: SPACING.sm,
  },
});

export default AuditFormStep1;
