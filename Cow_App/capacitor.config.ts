import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'pk.farmaware.com',
  appName: 'Farmaware',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'http',
    cleartext: true,
    allowNavigation: [
      'localhost:8100/*',
      '*.192.168.18.116:8888/*',
      '192.168.18.116:8888',
      '159.65.40.62'
    ]
  },
  android: {
    "allowMixedContent": true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#0f452b",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,  
    },
  },
}

export default config;
