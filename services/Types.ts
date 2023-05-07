export interface SignUpParams {
  email: string;
  password: string;
};

export interface SignInParams {
  email: string;
  password: string;
};

export interface Tokens {
  refresh_token: string;
  access_token: string;
};
