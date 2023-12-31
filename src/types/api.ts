export type AuthData = {
  login: string;
  password: string;
}

export type UserData = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
};

export type OfferId = {
 id: string | undefined;
};
