export const setAuth = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify({
    id: data.id,
    email: data.email,
    roles: data.roles
  }));
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const isRecruiter = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.roles?.includes("ROLE_RECRUITER");
};
