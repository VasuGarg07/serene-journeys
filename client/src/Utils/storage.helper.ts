import { LOCAL_STORAGE_KEYS as STORAGE_KEYS } from "./enums";
import { UserData } from "./interfaces";

class storageHelper {
  constructor() { };

  get accessToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.AuthToken);
  }
  set accessToken(token: string) {
    localStorage.setItem(STORAGE_KEYS.AuthToken, token);
  }

  get userProfile(): UserData | null {
    const strData = localStorage.getItem(STORAGE_KEYS.UserProfile);
    return strData && JSON.parse(strData)
  }

  set userProfile(data: UserData) {
    localStorage.setItem(STORAGE_KEYS.UserProfile, JSON.stringify(data));
  }

  clearStorage() {
    localStorage.clear();
  }
}

export const StorageHelper = new storageHelper();