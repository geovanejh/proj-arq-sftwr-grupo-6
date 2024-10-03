import { useFormik } from "formik";
import logo from "../assets/logo.jpg";
import { Button } from "../components/Button/Button.styled";
import { useNavigate } from "react-router-dom";
import { AuthPage } from "../components/Auth/AuthPage";
import { AuthContainer } from "../components/Auth/AuthContainer";
import { AuthForm } from "../components/Auth/LoginForm";
import FormField from "../components/Form/FormField/FormField";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  return (
    <AuthPage>
      <AuthContainer>
        <img src={logo} alt="ícone do Sistema MES" />
        <h3>Sistema MES</h3>
        <h2>Entre na sua conta </h2>
        <h5>Digite seu email e senha abaixo</h5>
        <AuthForm onSubmit={formik.handleSubmit}>
          <FormField
            id="email"
            type="text"
            label="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            formik={formik}
            placeholder="Email"
          />
          <FormField
            id="password"
            type="password"
            label="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            formik={formik}
            placeholder="Password"
          />
          <Button primary type="submit">
            Log In
          </Button>
        </AuthForm>
        <h5>
          Não possui uma conta?
          <a href="#" onClick={() => navigate("/register")}>
            <span>Registre-se</span>
          </a>
        </h5>
      </AuthContainer>
    </AuthPage>
  );
};
export default Login;
