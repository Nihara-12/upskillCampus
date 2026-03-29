import API from "./api";

export default function Signup() {
  const submit = async () => {
    await API.post("/auth/register", {
      name: "RestOwner",
      email: "rest@test.com",
      password: "123456",
      role: "restaurant"
    });
    alert("Signup done");
  };

  return <button onClick={submit}>Signup</button>;
}
