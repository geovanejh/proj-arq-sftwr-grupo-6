import * as Yup from "yup";
import { useFormik } from "formik";
import { Button } from "../components/Button/Button.styled";
import logo from "../assets/logo.jpg";
import FormField from "../components/Form/FormField/FormField";
import { useNavigate } from "react-router-dom";
import { AuthPage } from "../components/Auth/AuthPage";
import { AuthContainer } from "../components/Auth/AuthContainer";
import { AuthForm } from "../components/Auth/LoginForm";

const Users = () => {
  const navigate = useNavigate();

  Yup.addMethod(Yup.string, "senhaIgual", function (errorMessage) {
    return this.test(`test-password-equals`, errorMessage, function (value) {
      const { path, createError } = this;

      return (
        value === formik.values.senha ||
        createError({ path, message: errorMessage })
      );
    });
  });

  const formik = useFormik({
    initialValues: {
      login: "",
      senha: "",
      confirmaSenha: "",
    },
    onSubmit: (values) => {
      // handleRegister({
      //   login: values.login,
      //   senha: values.senha,
      // });
    },
    validationSchema: Yup.object({
      login: Yup.string()
        .min(3, "- O login deve ter mais de 2 caracteres.")
        .required("- Obrigatório"),
      senha: Yup.string().min(8, "- Curto demais.").required("- Obrigatório"),
      confirmaSenha: Yup.string().senhaIgual(
        "As senhas digitadas são diferentes"
      ),
    }),
  });

  return (
    <AuthPage>
      <AuthContainer>
        <img src={logo} alt="" />
        <h3>Sistema MES</h3>
        <h2>Registre sua conta</h2>
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
            label="Senha"
            id="senha"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.senha}
            onBlur={formik.handleBlur}
            formik={formik}
            placeholder="Senha"
          />
          <FormField
            label="Confirmar senha"
            id="confirmaSenha"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.confirmaSenha}
            onBlur={formik.handleBlur}
            formik={formik}
            placeholder="Confirmar senha"
          />
          <Button primary type="submit">
            Register
          </Button>
        </AuthForm>
        <h5>
          Já possui uma conta?
          <a href="#" onClick={() => navigate("/")}>
            <span>Login</span>
          </a>
        </h5>
      </AuthContainer>
    </AuthPage>
  );
};
export default Users;
