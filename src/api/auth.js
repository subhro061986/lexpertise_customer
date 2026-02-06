import { apiRequest } from "./client";

export function createAccount(payload) {
  return apiRequest("/users/create-account", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// export function loginUser(email, password) {
//   return apiRequest("/users/login", {
//     method: "POST",
//     body: JSON.stringify({ email, password }),
//   });
// }
