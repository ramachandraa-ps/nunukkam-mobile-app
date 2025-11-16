# Android APK Build Guide

## Prerequisites

Before building the APK, ensure you have:
- Node.js installed (v16 or higher)
- Expo CLI installed globally
- EAS CLI installed (for production builds)

## Option 1: Build with EAS (Recommended for Production)

### Step 1: Install EAS CLI
```bash
npm install -g eas-cli
```

### Step 2: Login to Expo
```bash
eas login
```

If you don't have an Expo account, create one at https://expo.dev/signup

### Step 3: Configure EAS Build
```bash
eas build:configure
```

This will create an `eas.json` file in your project.

### Step 4: Build APK
```bash
# For development build (faster, includes dev tools)
eas build --platform android --profile development

# For preview build (production-like, but not for Play Store)
eas build --platform android --profile preview

# For production build (optimized, ready for Play Store)
eas build --platform android --profile production
```

### Step 5: Download APK
After the build completes (usually 10-20 minutes), you'll get a download link. You can also find it at:
https://expo.dev/accounts/[your-account]/projects/nunukkam-mobile-app/builds

## Option 2: Build Locally with Expo (Development Only)

### Step 1: Install Expo CLI
```bash
npm install -g expo-cli
```

### Step 2: Start Development Build
```bash
npx expo start
```

### Step 3: Use Expo Go App
1. Install "Expo Go" from Google Play Store on your Android device
2. Scan the QR code shown in terminal
3. App will run on your device

**Note**: This method doesn't create an APK file, but allows you to test the app quickly.

## Option 3: Build APK with Android Studio (Advanced)

### Step 1: Prebuild Native Code
```bash
npx expo prebuild --platform android
```

This creates the `android/` folder with native Android code.

### Step 2: Build APK
```bash
cd android
./gradlew assembleRelease
```

### Step 3: Find APK
The APK will be located at:
```
android/app/build/outputs/apk/release/app-release.apk
```

## Recommended: EAS Build Configuration

Create `eas.json` in your project root:

```json
{
  "cli": {
    "version": ">= 5.9.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

## Quick Start (Easiest Method)

For the fastest way to get an APK:

```bash
# 1. Install EAS CLI
npm install -g eas-cli

# 2. Login
eas login

# 3. Build preview APK
eas build --platform android --profile preview
```

Wait for the build to complete, then download the APK from the provided link.

## Build Profiles Explained

### Development Build
- Includes development tools
- Larger file size
- Faster build time
- Good for testing

### Preview Build
- Production-like build
- Smaller file size
- Can be shared with testers
- **Recommended for testing**

### Production Build
- Optimized for Play Store
- Smallest file size
- Requires signing keys
- Ready for distribution

## Troubleshooting

### Error: "No Expo account"
```bash
eas login
```

### Error: "Build failed"
Check the build logs at expo.dev and ensure:
- All dependencies are installed
- No TypeScript errors
- app.json is properly configured

### Error: "Package name already exists"
Change the package name in `app.json`:
```json
"android": {
  "package": "com.yourcompany.nunukkam"
}
```

## Testing the APK

1. Transfer the APK to your Android device
2. Enable "Install from Unknown Sources" in Settings
3. Open the APK file to install
4. Launch the app

## App Signing (For Play Store)

If you plan to publish to Google Play Store:

1. Generate signing keys:
```bash
eas credentials
```

2. Follow the prompts to create Android keystore

3. Build production version:
```bash
eas build --platform android --profile production
```

## File Size Optimization

To reduce APK size:

1. Use production build profile
2. Enable ProGuard (already configured in Expo)
3. Remove unused dependencies
4. Optimize images in `assets/` folder

## Current App Configuration

- **App Name**: Nunukkam Student Portal
- **Package**: com.nunukkam.studentportal
- **Version**: 1.0.0
- **Version Code**: 1

## Next Steps After Building

1. Test the APK on multiple devices
2. Check all features work correctly
3. Test login/logout flow
4. Verify navigation between screens
5. Test on different Android versions (8.0+)

## Support

For build issues:
- Check Expo documentation: https://docs.expo.dev/build/setup/
- Expo Discord: https://chat.expo.dev/
- Stack Overflow: Tag with `expo` and `react-native`
