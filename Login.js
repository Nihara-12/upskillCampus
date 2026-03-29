import API from "./api";

export default function Login() {
  const login = async () => {
    const res = await API.post("/auth/login", {
      email: "second@test.com",
      password: "abcdef"
    });
    localStorage.setItem("token", res.data.token);
    alert("Login success");
  };

  return <button onClick={login}>Login</button>;
}
