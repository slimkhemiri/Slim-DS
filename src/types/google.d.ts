// Google Identity Services type definitions
declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (response: { access_token: string }) => void;
          }) => {
            requestAccessToken: () => void;
          };
          revoke: (token: string, callback: () => void) => void;
        };
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: {
              credential: string;
              select_by: string;
            }) => void;
          }) => void;
          renderButton: (element: HTMLElement, config: {
            theme?: string;
            size?: string;
            text?: string;
            width?: number;
          }) => void;
          prompt: () => void;
        };
      };
    };
  }
}

export {};
