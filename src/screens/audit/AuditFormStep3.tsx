import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
  MediaType,
} from 'react-native-image-picker';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { FormInput, FormPicker, validationSchemas } from '../../forms';
import {
  AuditStep1Data,
  AuditStep2Data,
  AuditStep3Data,
  AuditFormData,
  NavigationProps,
} from '../../types';
import { COLORS, SPACING, FONT_SIZES, PRIORITY_LEVELS } from '../../constants';
import { StorageService } from '../../services/StorageService';
import { useRole } from '../../hooks/useRole';

const { width } = Dimensions.get('window');

const AuditFormStep3: React.FC<NavigationProps> = ({ navigation, route }) => {
  const { user } = useRole();
  const step1Data = route?.params?.step1Data as AuditStep1Data;
  const step2Data = route?.params?.step2Data as AuditStep2Data;

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AuditStep3Data>({
    resolver: yupResolver(validationSchemas.auditStep3) as any,
    defaultValues: {
      findings: '',
      recommendations: '',
      actionItems: '',
      priority: 'Medium',
      images: [],
    },
  });

  const watchedImages = watch('images');

  useEffect(() => {
    loadDraft();
  }, []);

  const loadDraft = async () => {
    try {
      const draft = await StorageService.getDraft();
      if (draft && draft.findings) {
        setValue('findings', draft.findings || '');
        setValue('recommendations', draft.recommendations || '');
        setValue('actionItems', draft.actionItems || '');
        setValue('priority', draft.priority || 'Medium');
        setValue('images', draft.images || []);
      }
    } catch (error) {
      console.error('Error loading draft:', error);
    }
  };

  const selectImage = () => {
    Alert.alert('Select Image', 'Choose how you want to add an image', [
      { text: 'Camera', onPress: openCamera },
      { text: 'Gallery', onPress: openGallery },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const openCamera = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      quality: 0.8 as const,
      maxWidth: 800,
      maxHeight: 800,
    };

    launchCamera(options, handleImageResponse);
  };

  const openGallery = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      quality: 0.8 as const,
      maxWidth: 800,
      maxHeight: 800,
    };

    launchImageLibrary(options, handleImageResponse);
  };

  const handleImageResponse = (response: ImagePickerResponse) => {
    if (response.didCancel || response.errorMessage) {
      return;
    }

    if (response.assets && response.assets[0]) {
      const imageUri = response.assets[0].uri;
      if (imageUri) {
        const currentImages = watchedImages || [];
        setValue('images', [...currentImages, imageUri]);
      }
    }
  };

  const removeImage = (index: number) => {
    const currentImages = watchedImages || [];
    setValue(
      'images',
      currentImages.filter((_: any, i: number) => i !== index),
    );
  };

  const onSubmit = async (data: AuditStep3Data) => {
    try {
      const auditData: AuditFormData = {
        id: Date.now().toString(),
        ...step1Data,
        ...step2Data,
        ...data,
        createdAt: new Date().toISOString(),
        createdBy: user?.name || 'Unknown',
        status: 'Submitted',
      };

      await StorageService.saveAudit(auditData);
      await StorageService.clearDraft();

      navigation.replace('AuditSummary', { auditData });
    } catch (error) {
      Alert.alert('Error', 'Failed to submit audit. Please try again.');
      console.error('Submit error:', error);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  if (!step1Data || !step2Data) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Missing data from previous steps</Text>
          <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Audit Completion</Text>
          <Text style={styles.subtitle}>
            Step 3 of 3: Comments & Documentation
          </Text>
        </View>

        <Card title="Audit Details">
          <FormInput
            name="findings"
            control={control as any}
            label="Key Findings"
            placeholder="Describe the key findings from this audit"
            multiline
            numberOfLines={4}
            required
          />

          <FormInput
            name="recommendations"
            control={control as any}
            label="Recommendations"
            placeholder="Provide recommendations for improvement"
            multiline
            numberOfLines={4}
            required
          />

          <FormInput
            name="actionItems"
            control={control as any}
            label="Action Items"
            placeholder="List specific action items (optional)"
            multiline
            numberOfLines={3}
          />

          <FormPicker
            name="priority"
            control={control as any}
            label="Priority Level"
            items={PRIORITY_LEVELS.map(p => p.value)}
          />
        </Card>

        <Card title="Supporting Images">
          <Text style={styles.imageDescription}>
            Add photos to support your audit findings (optional)
          </Text>

          <Button
            title="Add Image"
            onPress={selectImage}
            variant="outline"
            style={styles.addImageButton}
          />

          {watchedImages && watchedImages.length > 0 && (
            <View style={styles.imagesContainer}>
              {watchedImages.map((imageUri: string, index: number) => (
                <View key={index} style={styles.imageWrapper}>
                  <Image source={{ uri: imageUri }} style={styles.image} />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeImage(index)}
                  >
                    <Text style={styles.removeButtonText}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </Card>

        <View style={styles.buttonContainer}>
          <Button
            title="Back"
            onPress={handleBack}
            variant="outline"
            style={styles.backButton}
          />
          <Button
            title="Submit Audit"
            onPress={handleSubmit(onSubmit as any)}
            loading={isSubmitting}
            style={styles.submitButton}
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
  imageDescription: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  addImageButton: {
    marginBottom: SPACING.md,
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SPACING.sm,
  },
  imageWrapper: {
    position: 'relative',
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  image: {
    width: (width - SPACING.md * 4) / 2,
    height: (width - SPACING.md * 4) / 2,
    borderRadius: SPACING.sm,
  },
  removeButton: {
    position: 'absolute',
    top: -SPACING.xs,
    right: -SPACING.xs,
    backgroundColor: COLORS.danger,
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
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
  submitButton: {
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

export default AuditFormStep3;
