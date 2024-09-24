import { Link } from "react-router-dom";
import Factory from "../../assets/factory.jpeg";
import { LogoContainer } from "./Logo.styled";

const Logo = () => {
  return (
    <LogoContainer>
      <Link to="/people">
        <img src={Factory} alt="" />
        <span>Sistema MES</span>
      </Link>
    </LogoContainer>
  );
};
export default Logo;
