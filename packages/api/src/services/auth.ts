import { getApiConfig } from '../config.ts';

export type AuthResponse = {
  userName: string,
  fullName: string,
  mail: string,
  token: string
};

export type VerifyResponse = {
  userName: string,
  fullName: string,
  mail: string,
  issuedAt: number,
  expiresdAt: number,
  error?: string
};

export type AuthService = {
  login(authorization: string): Promise<AuthResponse>,
  logout(): Promise<void>,
  verify(authorization: string): Promise<VerifyResponse>
};

const { url } = getApiConfig('auth');

export async function init(): Promise<AuthService> {
  function _fetch(resource: string, options: RequestInit) {
    return fetch(`${ url }/${ resource }`, {
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      ...options
    })
    .then((body: Body) => body.json())
  }

  return {
    async login(authorization: string): Promise<AuthResponse> {
      return _fetch('login', {
        method: 'POST',
        headers: {
          authorization
        }
      });
    },
    async logout(): Promise<void> {
    },
    async verify(authorization): Promise<VerifyResponse> {
      return _fetch('verify', {
        method: 'GET',
        headers: {
          authorization: `Bearer ${ authorization }`
        }
      })
      .then(({ userName, fullName, mail, iat, exp, error }) => ({
        userName,
        fullName,
        mail,
        issuedAt: iat,
        expiresdAt: exp,
        error
      }));
    }
  }
}
