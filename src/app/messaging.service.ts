import { inject, Injectable } from '@angular/core';
import { getToken, onMessage, isSupported } from 'firebase/messaging';
import { environment } from '../environment/environment';
import { BehaviorSubject, firstValueFrom, lastValueFrom } from 'rxjs';
import { Messaging } from '@angular/fire/messaging';
import { ProfileService } from './profile.service';

@Injectable({ providedIn: 'root' })
export class MessagingService {
  currentMessage = new BehaviorSubject<any>(null);
  private messaging = inject(Messaging);

  constructor(private profileService: ProfileService) {
    isSupported().then((supported) => {
      if (!supported) {
        console.warn('Firebase Messaging not supported in this browser');
      }
    });
  }

async requestPermission() {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      confirm('Permission not granted for Notification');
      return false;
    }

    const registration = await navigator.serviceWorker.register(
      '/firebase-messaging-sw.js'
    );

    const token = await getToken(this.messaging, {
      vapidKey: environment.firebase.vapidKey,
      serviceWorkerRegistration: registration,
    });

    if (token) {
      try {
        await lastValueFrom(this.profileService.postFcmToken(token));
        return true;
      } catch (err) {
        console.error('❌ Failed to post token', err);
        return false;
      }
    } else {
      console.warn('No registration token available.');
    }
  } catch (err) {
    console.error('❌ Unable to get FCM token', err);
  }
  return false;
}

  listen() {
    if (!this.messaging) return;

    onMessage(this.messaging, (payload) => {
      this.currentMessage.next(payload);
    });
  }
}
