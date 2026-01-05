export const loginApi = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
     
      if (email === "admin@gmail.com" && password === "Admin@123") {
        resolve({
          token: "mock-token-123",
          user: {
            email,
            name: "Admin User",
          },
        });
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 1000);
  });
};
