import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "login", { email, password })
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("user", JSON.stringify(res.data));
        }
        return res.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(name, email, password, role) {
    return axios.post(API_URL + "register", {
      name,
      email,
      password,
      role
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  getUserRole() {
    const user = this.getCurrentUser();
    if (!user || !user.roles) return null;

    // convert ROLE_RECRUITER → recruiter
    return user.roles[0].replace("ROLE_", "").toLowerCase();
  }
}

export default new AuthService();
