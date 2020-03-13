import { Injectable } from '@angular/core';
import { CometChat } from '@cometchat-pro/chat';
import { MatSnackBar } from '@angular/material';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: unknown;

  constructor(private snackBar: MatSnackBar) {
    this.init(environment.appId, environment.region);
  }

  init(appId: string, region: string) {
    const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
    CometChat.init(appId, appSetting).then(
      msg => console.log('Initialized succesfull: ', msg),
      err => {
        console.log('App init failed', err);
        this.snackBar.open(
          'App initialization failed. Please refresh the page.'
        );
      }
    );
  }


  login(userId: string) {
    return CometChat.login(userId, environment.apiKey)
      .then(usr => (this.currentUser = usr), (this.currentUser = null))
      .then(_ => console.log('User logged in'), console.error);
  }
}
