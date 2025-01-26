import { destroyCookie, parseCookies, setCookie } from 'nookies';
export default class AuthorizationCookies {
  public static readonly AuthorizationCookieName = 'auth-token';

  public static initSession(token: string): void {
    setCookie(null, AuthorizationCookies.AuthorizationCookieName, token)
  }

  public static getSession(): string | null {
    return parseCookies()[AuthorizationCookies.AuthorizationCookieName];
  }

  public static destroySession(): void {
    destroyCookie(null, AuthorizationCookies.AuthorizationCookieName)
  }
}