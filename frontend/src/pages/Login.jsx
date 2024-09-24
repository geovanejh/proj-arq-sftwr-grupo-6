import { useFormik } from "formik";
import logo from "../assets/logo.jpg";
import { Button } from "../components/Button/Button.styled";
import { useNavigate } from "react-router-dom";
import { AuthPage } from "../components/Auth/AuthPage";
import { AuthContainer } from "../components/Auth/AuthContainer";
import { AuthForm } from "../components/Auth/LoginForm";
import FormField from "../components/Form/FormField/FormField";

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      login: "",
      senha: "",
    },
    onSubmit: (values) => {
      navigate("/home");
    },
  });

  return (
    <AuthPage>
      <AuthContainer>
        <img src={logo} alt="ícone do Sistema MES" />
        <h3>Sistema MES</h3>
        <h2>Entre na sua conta </h2>
        <h5>Digite seu login e senha abaixo</h5>
        <AuthForm onSubmit={formik.handleSubmit}>
          <FormField
            id="login"
            type="text"
            label="Login"
            onChange={formik.handleChange}
            value={formik.values.login}
            onBlur={formik.handleBlur}
            formik={formik}
            placeholder="Login"
          />
          <FormField
            id="senha"
            type="password"
            label="Senha"
            onChange={formik.handleChange}
            value={formik.values.senha}
            onBlur={formik.handleBlur}
            formik={formik}
            placeholder="Senha"
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
