import { Auth_Form } from "../../components";
const inputs = [
  { type: "text", name: "username", placeholder: "Username" },
  { type: "password", name: "password", placeholder: "Password" },
];
export default function Login() {
  return (
    <>
      <Auth_Form variant="login" inputs={inputs} />
    </>
  );
}
