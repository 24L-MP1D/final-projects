type GOOGLE_AUTH_KEYS = 'client_id' | 'client_secret' | 'endpoint' | 'redirect_uri' | 'scopes';

export const oauth_google: Record<GOOGLE_AUTH_KEYS, string> = {
  client_id: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID || '',
  client_secret: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_SECRET || '',
  endpoint: 'https://accounts.google.com/o/oauth2/auth',
  redirect_uri: process.env.NEXT_PUBLIC_BASE_URL || '',
  scopes: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
};

export const oauth_google_client: Record<GOOGLE_AUTH_KEYS, string> = {
  client_id: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID || '',
  client_secret: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_SECRET || '',
  endpoint: 'https://accounts.google.com/o/oauth2/auth',
  redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_BASE_URL_CLIENT || '',
  scopes: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
};

export const oauth_github: Record<GOOGLE_AUTH_KEYS, string> = {
  client_id: process.env.NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID || '',
  client_secret: process.env.NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_SECRET || '',
  endpoint: 'https://github.com/login/oauth/authorize',
  redirect_uri: process.env.NEXT_PUBLIC_GITHUB_BASE_URL || '',
  scopes: 'read:user user:email',
};

export const oauth_github_client: Record<GOOGLE_AUTH_KEYS, string> = {
  client_id: process.env.NEXT_PUBLIC_GITHUB2_OAUTH_CLIENT_ID || '',
  client_secret: process.env.NEXT_PUBLIC_GITHUB2_OAUTH_CLIENT_SECRET || '',
  endpoint: 'https://github.com/login/oauth/authorize',
  redirect_uri: process.env.NEXT_PUBLIC_GITHUB_BASE_URL_CLIENT || '',
  scopes: 'read:user user:email',
};
