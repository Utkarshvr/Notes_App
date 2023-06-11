import { Auth_Form } from "../../components";
const inputs = [
  { type: "username", name: "username", placeholder: "Username" },
  { type: "email", name: "email", placeholder: "Email" },
  { type: "password", name: "password", placeholder: "Password" },
];
export default function Signup() {
  return (
    <>
      <Auth_Form variant="register" inputs={inputs} />
    </>
  );
}
