import { useState } from "react";
import "./sign-up-form.styles.scss";
import {
  createUserAuthWithEmailAndPassword,
  createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
// import {}
const defaultFormField = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: ""
};

const SignUpForm = () => {
  const [formField, setFormField] = useState(defaultFormField);
  const { displayName, email, password, confirmPassword } = formField;
  // console.log(formField);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formField, [name]: value });
  };
  const handleForm = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("password do not match");
      return;
    }
    try {
      const { user } = await createUserAuthWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      setFormField(defaultFormField);
    } catch (error) {
      if (error.code == "auth/email-already-in-use") {
        alert("User Exists");
      } else console.log(error);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Dont have an account SingUp</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleForm}>
        <FormInput
          label="Display Name"
          value={displayName}
          type="text"
          name="displayName"
          onChange={handleChange}
          required
        />
        <FormInput
          label="Email"
          value={email}
          type="email"
          name="email"
          onChange={handleChange}
          required
        />
        <FormInput
          label="Password"
          value={password}
          type="password"
          name="password"
          onChange={handleChange}
          required
        />
        <FormInput
          label="Confirm Password"
          value={confirmPassword}
          type="password"
          name="confirmPassword"
          onChange={handleChange}
          required
        />
        <Button children="Submit" type="submit" />
      </form>
    </div>
  );
};

export default SignUpForm;
