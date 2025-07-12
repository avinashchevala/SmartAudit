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
├── forms/              # Form-specific components
├── hooks/              # Custom React hooks
├── navigation/         # Navigation configuration
├── screens/
│   ├── auth/          # Authentication screens
│   ├── audit/         # Audit-related screens
│   └── policy/        # Policy viewer screens
├── services/          # Service layer (Storage, API)
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── constants/         # App constants and styles
```

## Installation

### Prerequisites
- Node.js (>= 18)
- React Native Community CLI
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
   cd ios && bundle install && bundle exec pod install
   ```

4. **Install required packages**
   ```bash
   npm install @react-navigation/bottom-tabs
   ```

### Android Setup

1. **Run the app**
   ```bash
   npm start
   ```
   Open a new terminal and run:
   ```bash
   npm run android
   ```

### iOS Setup

1. **Run the app**
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


# Developer Documentation

## Code Organization

The project follows a modular architecture with clear separation of concerns:

### Key Architectural Decisions
- **TypeScript**: Used throughout for type safety and better developer experience
- **React Hook Form**: For form management with Yup validation
- **React Navigation**: For navigation with role-based routing
- **AsyncStorage**: For local data persistence
- **Context API**: For global state management (user authentication)

### Code Comments
All major files include comprehensive comments explaining:
- Component/function purpose and features
- Parameter descriptions and types
- Implementation details and business logic
- Error handling and edge cases

### Form Validation
- Uses Yup schemas for consistent validation across all forms
- Error messages are user-friendly and actionable
- Validation happens both on submit and field-level

### Storage Strategy
- All data persists locally using AsyncStorage
- Draft functionality for incomplete audits
- Automatic data loading on app startup
