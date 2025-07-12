import React from 'react';
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
  LoginFormData,
  validationSchemas,
} from '../../forms';
import { User, UserRole, NavigationProps } from '../../types';
import { COLORS, SPACING, FONT_SIZES } from '../../constants';
import usersData from '../../utils/users.json';
import { useRole } from '../../hooks/useRole';

const ROLES: string[] = ['Admin', 'Auditor', 'Viewer'];

const Login: React.FC<NavigationProps> = ({ navigation }) => {
  const { setUser } = useRole();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(validationSchemas.login),
    defaultValues: {
      username: '',
      password: '',
      role: 'Auditor',
    },
  });

  const validateUser = (username: string, password: string, role: UserRole) => {
    const user = usersData.users.find(
      u =>
        u.username === username && u.password === password && u.role === role,
    );
    return user;
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      const validUser = validateUser(
        data.username,
        data.password,
        data.role as UserRole,
      );

      if (!validUser) {
        Alert.alert(
          'Error',
          'Invalid credentials or role mismatch. Please check your username, password, and selected role.',
        );
        return;
      }

      const user: User = {
        id: validUser.id,
        name: validUser.name,
        role: validUser.role as UserRole,
      };

      await setUser(user);
      navigation.replace('MainTabs');
    } catch (error) {
      Alert.alert('Error', 'Failed to login. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Internal Audit App</Text>
          <Text style={styles.subtitle}>
            Enter your credentials to access the auditing system
          </Text>
        </View>

        <Card title="Login Information">
          <FormPicker
            name="role"
            control={control}
            label="Select Role"
            items={ROLES}
            placeholder="Choose your role"
            required
          />

          <FormInput
            name="username"
            control={control}
            label="Username"
            placeholder="Enter your username"
            required
            autoCapitalize="none"
            autoCorrect={false}
          />

          <FormInput
            name="password"
            control={control}
            label="Password"
            placeholder="Enter your password"
            required
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        </Card>

        <Button
          title="Login"
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
          style={styles.loginButton}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Demo Credentials:{'\n'}
            Admin: john.smith / admin123{'\n'}
            Auditor: sarah.johnson / auditor123{'\n'}
            Viewer: mike.wilson / viewer123
          </Text>
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
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginHorizontal: SPACING.md,
  },
  roleLabel: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  loginButton: {
    marginTop: SPACING.lg,
  },
  footer: {
    marginTop: SPACING.xl,
    alignItems: 'center',
  },
  footerText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default Login;
