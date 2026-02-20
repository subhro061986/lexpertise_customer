import { apiRequest } from "./client";

export function sendOtp(email) {
  return apiRequest("/otp/send", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export function verifyOtp(email, otp) {
  return apiRequest("/otp/verify", {
    method: "POST",
    body: JSON.stringify({ email, otp }),
  });
}
