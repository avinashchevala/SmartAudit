# Internal Auditing App

A React Native mobile application for internal auditing workflows with role-based access control, multi-step forms, and WebView integration.

## Features

### Core Functionality
- **Role-based Authentication**: Login as Admin, Auditor, or Viewer with different permissions
- **Multi-step Audit Forms**: Three-step audit process with validation
- **Local Storage Persistence**: All data stored locally using AsyncStorage
- **WebView Integration**: Built-in policy document viewer
- **Image Capture**: Take photos during audits
- **Audit History**: View and manage audit records with timestamps

### User Roles
- **Admin**: Full access to all features, can view all audits
- **Auditor**: Can create new audits and view their own submissions
- **Viewer**: Can only view audit history and policies

### Audit Form Steps
1. **Basic Information**: Audit type, department, priority, date selection
2. **Ratings & Checklist**: Process ratings (1-5) and compliance checklist
3. **Comments & Images**: Additional comments and photo attachments

## Project Structure

```
src/
├── assets/              # Static assets
├── components/
│   ├── forms/          # Form-specific components
│   └── ui/             # Reusable UI components
├── contexts/           # React Context providers
├── hooks/              # Custom React hooks
├── navigation/         # Navigation configuration
├── screens/
│   ├── auth/          # Authentication screens
│   ├── audit/         # Audit-related screens
│   ├── nav/           # Navigation screens
│   └── policy/        # Policy viewer screens
├── services/          # Service layer (Storage, API)
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── constants/         # App constants and styles
```

## Installation

### Prerequisites
- Node.js (>= 18)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SmartAudit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install iOS dependencies (iOS only)**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Install required packages**
   ```bash
   npm install @react-navigation/bottom-tabs
   ```

### Android Setup

1. **Configure Vector Icons**
   - Add the following to `android/app/build.gradle`:
   ```gradle
   apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")
   ```

2. **Run the app**
   ```bash
   npm run android
   ```

### iOS Setup

1. **Configure Vector Icons**
   - Add font files to iOS project through Xcode
   - Update `Info.plist` with font references

2. **Run the app**
   ```bash
   npm run ios
   ```

## Usage

### Getting Started

1. **Launch the app** and you'll see the login screen
2. **Select a role** (Admin, Auditor, or Viewer)
3. **Navigate through the app** using the bottom tabs

### Creating an Audit (Auditor/Admin)

1. **Go to "New Audit" tab**
2. **Fill Step 1**: Basic information (type, department, priority)
3. **Fill Step 2**: Process ratings and compliance checklist
4. **Fill Step 3**: Add comments and capture images
5. **Review and submit** the audit

### Viewing Audit History

1. **Go to "History" tab**
2. **Browse all audits** (filtered by role permissions)
3. **Tap on an audit** to view detailed information

### Accessing Policies

1. **Go to "Policy" tab**
2. **View ISO 19011 documentation** in the integrated WebView

## Architecture

### State Management
- **Context API**: Global state management for user roles and authentication
- **Local Storage**: Persistent data storage using AsyncStorage
- **Custom Hooks**: Reusable logic for audit operations

### Navigation
- **Stack Navigation**: For multi-step forms and screen transitions
- **Tab Navigation**: Bottom tabs for main app sections
- **Role-based Routing**: Dynamic navigation based on user permissions

### Data Flow
1. **User Authentication**: Role selection stored in AsyncStorage
2. **Form Data**: Multi-step forms with local state and validation
3. **Persistence**: All audit data saved to local storage
4. **Retrieval**: Data loaded from storage with role-based filtering

## Components

### UI Components
- **Button**: Styled button with loading states
- **Input**: Text input with validation
- **Card**: Container component for content sections
- **CustomPicker**: Dropdown selector component
- **FormControls**: Form navigation and validation

### Screen Components
- **LoginScreen**: Role-based authentication
- **AuditForm Steps**: Three-step audit creation flow
- **AuditHistory**: List and detail views
- **PolicyViewer**: WebView for documentation

## Development

### Code Style
- **TypeScript**: Full type safety throughout the application
- **Modular Architecture**: Clean separation of concerns
- **Consistent Styling**: Centralized theme and constants
- **Error Handling**: Proper error boundaries and user feedback

### Testing
```bash
npm test
```

### Linting
```bash
npm run lint
```

## Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npx react-native start --reset-cache
   ```

2. **Android build errors**
   ```bash
   cd android && ./gradlew clean && cd ..
   ```

3. **iOS build errors**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Vector Icons not showing**
   - Ensure fonts are properly linked in native projects
   - Check that gradle configuration is applied

### Performance Optimization
- **Image optimization**: Images are resized before storage
- **Lazy loading**: Components load data on demand
- **Memory management**: Proper cleanup of listeners and timers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is for internal use and educational purposes.

## Technical Specifications

- **React Native**: 0.80.1
- **TypeScript**: 5.0.4
- **Navigation**: React Navigation 7.x
- **Storage**: AsyncStorage 2.x
- **Minimum iOS**: 12.0
- **Minimum Android**: API 21 (Android 5.0)

## Future Enhancements

- [ ] Data export functionality
- [ ] Push notifications for audit reminders
- [ ] Offline synchronization
- [ ] Advanced reporting features
- [ ] Dark mode support
- [ ] Multi-language support

---

For technical support or questions, please refer to the documentation or contact the development team.

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
