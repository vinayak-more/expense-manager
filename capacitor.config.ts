import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.expense.app',
  appName: 'expense-manager',
  webDir: 'dist/browser',
  server: {
    androidScheme: 'https'
  }
};

export default config;
