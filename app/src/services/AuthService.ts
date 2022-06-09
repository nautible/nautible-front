import Keycloak, { KeycloakConfig } from "keycloak-js";

const keycloakConfig: KeycloakConfig = {
  realm: process.env.REACT_APP_AUTH_KEYCLOAK_REALM!,
  clientId: process.env.REACT_APP_AUTH_KEYCLOAK_CLIENT_ID!,
  url: process.env.REACT_APP_AUTH_URL_PREFIX
}

interface AuthService {
  init(onAuthenticatedCallback: (authenticated: boolean) => void): void
  isAuthEnable(): boolean
  isLoggedIn(): boolean
  getToken(): string | null | undefined
  updateToken(successCallback: any): Promise<any>
  login(): Promise<any>
  logout(): Promise<any>
}

// dummy. always authenticated.
class DummyAuthService implements AuthService {
  init(onAuthenticatedCallback: (authenticated: boolean) => void): void {
    onAuthenticatedCallback(true);
  }
  isAuthEnable(): boolean {
    return false;
  }
  isLoggedIn(): boolean {
    return true;
  }
  getToken(): string | null | undefined {
    return null;
  }
  updateToken(successCallback: any): Promise<any> {
    return Promise.resolve(null);
  }
  login(): Promise<any> {
    return Promise.resolve(null);
  }
  logout(): Promise<any> {
    return Promise.resolve(null);
  }
}

// keycloak auth service.
class KeyCloakAuthService implements AuthService {
  keycloak: Keycloak;
  constructor() {
    this.keycloak = new Keycloak(keycloakConfig)
  }
  init(onAuthenticatedCallback: (authenticated: boolean) => void): void {
    // force login
    this.keycloak.init({
      // onLoad: 'login-required',
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    })
      .then((authenticated: boolean) => {
        console.log("authenticated")
        onAuthenticatedCallback(authenticated);
      })
      .catch(console.error);
  }
  isAuthEnable(): boolean {
    return true;
  }

  isLoggedIn(): boolean {
    return this.keycloak.authenticated === true;
  }
  getToken(): string | null | undefined {
    return this.keycloak.token;
  }
  updateToken(successCallback: any): Promise<any> {
    // update token if expired
    return this.keycloak.updateToken(5)
      .then(successCallback)
      .catch(this.keycloak.login);
  }
  login(): Promise<any> {
    return this.keycloak.login();
  }
  logout(): Promise<any> {
    return this.keycloak.logout();
  }
}

// set auth service by env value
const AuthService: AuthService =
  process.env.REACT_APP_AUTH_TYPE === "keycloak"
    ? new KeyCloakAuthService() : new DummyAuthService()

export default AuthService;