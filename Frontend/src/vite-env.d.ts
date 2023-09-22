/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REST_API_URL: string;
  readonly VITE_TOKEN_EXPIRATION_MINUTES: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
