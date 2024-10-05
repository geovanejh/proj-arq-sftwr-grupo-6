import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import { api } from "../api";
import toast from "react-hot-toast";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = token;
      setAuth(true);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    setAuth(false);
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    navigate("/");
  };

  const handleRegister = async (user) => {
    try {
      setLoading(true);
      await api.post("/auth/create", user);
      navigate("/");
    } catch (error) {
      toast.error("Erro ao registrar conta");
    }
    setLoading(false);
  };

  const handleLogin = async (user) => {
    try {
      setLoading(true);
      const { data } = await api.post("/auth/login", user);
      localStorage.setItem("token", data.token);
      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      setAuth(true);
      navigate("/indicadores");
      toast.success("Login efetuado com sucesso!");
    } catch (error) {
      toast.error("Login ou senha incorretos.");
    }
    setLoading(false);
  };

  return loading ? (
    <Loading />
  ) : (
    <AuthContext.Provider
      value={{
        handleLogin,
        handleRegister,
        handleLogout,
        auth,
        setLoading,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
