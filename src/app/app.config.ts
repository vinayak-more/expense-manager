import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(), 
    provideAnimationsAsync(), 
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp({"projectId":"expense-manager-653e7","appId":"1:56149267755:web:3ee71d676afcbfca17e16e","storageBucket":"expense-manager-653e7.appspot.com","apiKey":"AIzaSyDidZ276mUGMFFqp--_oXiem5semqImhH0","authDomain":"expense-manager-653e7.firebaseapp.com","messagingSenderId":"56149267755","measurementId":"G-REQPPYQ70H"}))), 
      importProvidersFrom(provideFirestore(() => getFirestore())
      ),
    ]
};
