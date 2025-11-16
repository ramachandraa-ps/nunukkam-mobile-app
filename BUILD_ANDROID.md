# 🚀 Quick Android APK Build

## Fastest Way to Build APK (3 Steps)

### 1️⃣ Install EAS CLI
```bash
npm install -g eas-cli
```

### 2️⃣ Login to Expo
```bash
eas login
```
*Create a free account at https://expo.dev/signup if you don't have one*

### 3️⃣ Build APK
```bash
npm run build:android:preview
```

**That's it!** ✨

The build will take 10-20 minutes. You'll get a download link when it's done.

---

## Alternative: Using EAS Command Directly

```bash
# Preview build (recommended for testing)
eas build --platform android --profile preview

# Production build (for Play Store)
eas build --platform android --profile production
```

---

## What Happens During Build?

1. ✅ Your code is uploaded to Expo servers
2. ✅ Dependencies are installed
3. ✅ Android APK is compiled
4. ✅ You get a download link

---

## After Build Completes

1. Click the download link in terminal
2. Or visit: https://expo.dev
3. Download the APK file
4. Transfer to your Android device
5. Install and test!

---

## Build Profiles

| Profile | Use Case | File Type | Size |
|---------|----------|-----------|------|
| `preview` | Testing & sharing | APK | Medium |
| `production` | Play Store | AAB | Small |
| `development` | Development | APK | Large |

---

## Troubleshooting

### ❌ "eas: command not found"
```bash
npm install -g eas-cli
```

### ❌ "Not logged in"
```bash
eas login
```

### ❌ "Build failed"
- Check your internet connection
- Ensure all dependencies are installed: `npm install`
- Check build logs at expo.dev

---

## Testing the APK

1. **Enable Unknown Sources**
   - Settings → Security → Unknown Sources → Enable

2. **Install APK**
   - Open the downloaded APK file
   - Tap "Install"

3. **Launch App**
   - Find "Nunukkam Student Portal" in your app drawer
   - Open and test!

---

## Need Help?

- 📖 Full guide: See `BUILD_GUIDE.md`
- 🌐 Expo Docs: https://docs.expo.dev/build/setup/
- 💬 Discord: https://chat.expo.dev/

---

## Quick Commands Reference

```bash
# Install EAS
npm install -g eas-cli

# Login
eas login

# Build preview APK
npm run build:android:preview

# Build production
npm run build:android:production

# Check build status
eas build:list
```

---

**Happy Building! 🎉**
