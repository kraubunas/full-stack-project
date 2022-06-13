export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_USER_KEY_IN_LOCAL_STORAGE: string;
      REACT_APP_API_SERVER: string;
    }
  }
}
