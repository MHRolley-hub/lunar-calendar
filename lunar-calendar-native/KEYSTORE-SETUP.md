# Android Keystore Configuration

This document explains the keystore setup for building the Vietnamese Lunar Calendar Android app.

## Debug Keystore

A `debug.keystore` file is included in the repository at `android/app/debug.keystore` for development purposes.

**Debug Keystore Details:**
- **Location:** `android/app/debug.keystore`
- **Store Password:** `android`
- **Key Alias:** `androiddebugkey`
- **Key Password:** `android`
- **Validity:** 10,000 days

This keystore is safe to commit to version control as it's only used for development and testing builds.

## Release Keystore (Production)

For production release builds, you should create a separate release keystore and **NEVER commit it to version control**.

### Creating a Release Keystore

```bash
keytool -genkeypair -v \
  -keystore release.keystore \
  -alias my-key-alias \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -storepass YOUR_STRONG_PASSWORD \
  -keypass YOUR_STRONG_KEY_PASSWORD \
  -dname "CN=Your Name, O=Your Organization, C=US"
```

**Important:** Replace the passwords and dname values with your own information.

### GitHub Actions / CI/CD Setup

The build.gradle is configured to read release keystore credentials from environment variables:

- `RELEASE_KEYSTORE_FILE` - Path to the release keystore file
- `RELEASE_KEYSTORE_PASSWORD` - Keystore password
- `RELEASE_KEY_ALIAS` - Key alias name
- `RELEASE_KEY_PASSWORD` - Key password

#### Setting up in GitHub Actions

1. **Encode your keystore as base64:**
   ```bash
   base64 -i release.keystore -o release.keystore.base64
   ```

2. **Add GitHub Secrets:**
   - Go to your repository → Settings → Secrets and variables → Actions
   - Add the following secrets:
     - `RELEASE_KEYSTORE_BASE64` - The base64-encoded keystore
     - `RELEASE_KEYSTORE_PASSWORD` - Your keystore password
     - `RELEASE_KEY_ALIAS` - Your key alias
     - `RELEASE_KEY_PASSWORD` - Your key password

3. **In your GitHub Actions workflow:**
   ```yaml
   - name: Decode and setup keystore
     run: |
       echo "${{ secrets.RELEASE_KEYSTORE_BASE64 }}" | base64 -d > release.keystore

   - name: Build release APK
     env:
       RELEASE_KEYSTORE_FILE: ${{ github.workspace }}/release.keystore
       RELEASE_KEYSTORE_PASSWORD: ${{ secrets.RELEASE_KEYSTORE_PASSWORD }}
       RELEASE_KEY_ALIAS: ${{ secrets.RELEASE_KEY_ALIAS }}
       RELEASE_KEY_PASSWORD: ${{ secrets.RELEASE_KEY_PASSWORD }}
     run: |
       cd lunar-calendar-native/android
       ./gradlew assembleRelease
   ```

## Build Configuration

The `android/app/build.gradle` is configured to:

1. **Use debug keystore if available** for debug builds
2. **Check for release keystore from environment variables** for release builds
3. **Fall back gracefully** if no keystore is available (builds will be unsigned)
4. **Never fail the build** due to missing keystore files

This ensures the build works in all environments:
- ✅ Local development (with debug.keystore)
- ✅ CI/CD without secrets (unsigned builds for testing)
- ✅ CI/CD with secrets (signed release builds)

## Verifying Your Keystore

To check the details of a keystore:

```bash
keytool -list -v -keystore path/to/your.keystore -storepass YOUR_PASSWORD
```

## Security Best Practices

1. **Never commit release keystores** to version control
2. **Use strong passwords** for release keystores (minimum 12 characters)
3. **Store release keystores securely** (password manager, CI/CD secrets, etc.)
4. **Backup your release keystore** in a secure location - if lost, you cannot update your app
5. **Rotate keystores** if compromised
6. **Limit access** to release keystore to authorized personnel only

## Troubleshooting

### Build fails with "Keystore file not found"

This error should no longer occur with the updated build configuration. If you still see it:

1. Make sure you're using the latest `build.gradle`
2. For local development, verify `android/app/debug.keystore` exists
3. For CI/CD release builds, verify environment variables are set correctly

### Unsigned APK in release builds

This is expected if no keystore is configured. The build will succeed but produce an unsigned APK, which:
- Cannot be installed on non-rooted devices
- Cannot be uploaded to Google Play Store

To fix: Configure the release keystore environment variables as described above.
