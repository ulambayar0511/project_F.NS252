export namespace localstorage {
  export function setAccessToken(token: string) {
    localStorage.setItem("accessToken", token);
    
  }

  export function getAccessToken(): string {
    return localStorage.getItem("accessToken") as string;
  }
}
