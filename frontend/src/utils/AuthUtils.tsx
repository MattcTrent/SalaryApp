import { redirect } from "react-router-dom";

export function setAuth(token: string, username: string, userId: number) {
  localStorage.setItem("token", token);
  localStorage.setItem("username", username);
  localStorage.setItem("userId", userId.toString());

  const expiration = new Date();
  const tokenExpiration = import.meta.env.TOKEN_EXPIRATION_MINUTES;
  expiration.setMinutes(
    expiration.getMinutes() + (tokenExpiration ? +tokenExpiration : 15),
  );
  localStorage.setItem("tokenExpiration", expiration.toISOString());
}

export function getAuthToken(): string | null {
  const token = localStorage.getItem("token");
  const tokenDuration = getTokenDuration();

  if (!token) {
    return null;
  }

  if (tokenDuration < 0) {
    return "EXPIRED";
  }

  return token;
}

export function getAuthUser() {
  const user = localStorage.getItem("username");

  if (!user) {
    return null;
  }

  return user;
}

export function getAuthUserId() {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    return null;
  }

  return +userId;
}

export function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("userId");
  localStorage.removeItem("tokenExpiration");
}

export function getTokenDuration() {
  const expiration = localStorage.getItem("tokenExpiration") ?? "";
  const expirationDate = new Date(expiration);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();

  return duration;
}

export function tokenLoader(): string | null {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth?mode=login");
  }

  return null;
}
