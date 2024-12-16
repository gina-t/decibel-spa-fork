// // contains functions for handling authentication related tasks: login, logout, register user.
// // it stores and removes the JWT token using the AuthService utility.
// import AuthService from "../utils/auth"; // Import AuthService from auth.ts

// const login = async (username: string, password: string) => {
//   try {
//     const response = await fetch("/api/auth/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ username, password }),
//     });
//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error("Invalid login response, check network tab!");
//     }

//     // AuthService.setToken(data.token); // Store the token using AuthService

//     return data;
//   } catch (err) {
//     console.log("Error during login:", err);
//     return null;
//   }
// };

// // const logout = () => {
// //   AuthService.removeToken(); // Remove the token using AuthService
// // };

// // export { login, logout };
