# Mobile App

##### *© 2022 - Moritz Petzka - [petzka.com](https://petzka.com/)*

<br>
<br>

##  Deployment

<br>

### 1. Enter the directory: `mobile-administration`

```
cd mobile-administration
```

<br>

### 2. If exist, remove old platform directory*


##### iOS (macOS) directory: `../mobile-administration/ios`
```
rmdir -r ios
```

##### Android (Windows) directory: `../mobile-administration/android`
```
rm -rf android
```

**(optional, you can store the configuration files for using them again after adding new platform)*


<br>

### 3. Build Angular App

```
npm run build
```

<br>

### 4. Add platform

##### iOS (macOS)
```
ionic cap add ios
```

##### Android (Windows)
```
ionic cap add android
```

<br>

### 5. Generate app config

##### iOS (macOS)
```
cordova-res ios --skip-config --copy
```

##### Android (Windows)
```
cordova-res android --skip-config --copy
```

<br>

### 6. Open project in IDE

##### iOS (Xcode / macOS)
```
ionic cap open ios
```

##### Android (Android Studio)
```
ionic cap open android
```

<br>

### 7. Run/Debug App in emulator or on device

<br>
<br>

### Trouble Shooting

##### Restart ADB Server (maybe helps when connection problem appears)
```
adb kill-server
adb start-server
```

<br>

##### you get a message like this? 
***Error while getting Capacitor CLI version. Is Capacitor installed?***

Try:
```
npm install
```
