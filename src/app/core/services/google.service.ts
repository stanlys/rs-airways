import { Injectable } from '@angular/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './auth.service';

interface IGoogleUser {
  email: string;
  name: string;
  family_name: string;
  id: string;
  locale: string;
  picture: string;
  given_name: string;
}

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {
  constructor(public afAuth: AngularFireAuth, private authService: AuthService) {}

  public GoogleAuth(): Promise<void> {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  public GoogleSignUp(): Promise<void> {
    return this.AuthRegister(new GoogleAuthProvider());
  }

  public FacebookAuth(): Promise<void> {
    return this.AuthLogin(new FacebookAuthProvider());
  }

  public AuthLogin(provider: any): Promise<void> {
    return (
      this.afAuth
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        .signInWithPopup(provider)
        .then((result) => {
          if (result.additionalUserInfo?.profile !== null) {
            const user: IGoogleUser = result.additionalUserInfo?.profile as IGoogleUser;
            this.authService.login({ email: user.email, password: user.id });
          }
        })
        .catch((error) => {
          console.log(error);
        })
    );
  }

  public AuthRegister(provider: any): Promise<void> {
    return (
      this.afAuth
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        .signInWithPopup(provider)
        .then((result) => {
          if (result.additionalUserInfo?.profile !== null) {
            const user: IGoogleUser = result.additionalUserInfo?.profile as IGoogleUser;
            this.authService.signup({
              email: user.email,
              password: user.id,
              citizenship: user.locale,
              countryCode: ' ',
              dateOfBirth: ' ',
              firstName: user.given_name,
              gender: ' ',
              lastName: user.family_name,
              phone: ' ',
            });
          }
        })
        .catch((error) => {
          console.log(error);
        })
    );
  }
}

/*
additionalUserInfo
:
GoogleAdditionalUserInfo
isNewUser
:
false
profile
:
email
:
"s.a.chelnakov@gmail.com"
family_name
:
"Stanlys"
given_name
:
"Stan"
granted_scopes
:
"https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email"
id
:
"115300016152742025050"
locale
:
"ru"
name
:
"Stan Stanlys"
picture
:
"https://lh3.googleusercontent.com/a/AAcHTtdyBGP-cemsShDBEX5yOUVCz7GH8JIs7_C6bceECA=s96-c"
verified_email
:
true
[[Prototype]]
:
Object
providerId
:
"google.com"
*/
