import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vinayak.expense.app',
  appName: 'Expense Manager',
  webDir: 'dist/browser',
  server: {
    androidScheme: 'https'
  }
};

export default config;
