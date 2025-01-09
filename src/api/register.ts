import { AUTH_MESSAGE } from "../hooks/useAuth";
import { API_BASE_URL } from "./agents";

export async function registerUser(signature: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        signature,
        message: AUTH_MESSAGE,
      }),
    });

    if (!response.ok) {
      throw new Error(`Registration failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to register user:", error);
    throw error;
  }
}

export async function checkRegister(address: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/check_registered`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
        }),
      });
  
      if (!response.ok) {
        return false;
      }
      return true;
    } catch (error) {
      throw false;
    }
  }