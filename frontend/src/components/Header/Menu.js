import Item from "./Item";
import { MenuNav } from "./Menu.styled";
import { LuHome } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { RiBox3Fill } from "react-icons/ri";
import { RiPagesLine } from "react-icons/ri";
import { LuWrench } from "react-icons/lu";
import { FaToolbox } from "react-icons/fa";
import { LuPencilRuler } from "react-icons/lu";
import { GoGraph } from "react-icons/go";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Menu = () => {
  const { handleLogout } = useContext(AuthContext);
  const { pathname: caminho } = useLocation();

  return (
    <MenuNav>
      <ul>
        <Item
          name="Home"
          icon={<LuHome />}
          active={caminho.includes("/home") ? "active" : ""}
        />
        <Item
          name="Indicadores"
          url="/indicadores"
          icon={<GoGraph />}
          active={caminho.includes("/indicadores") ? "active" : ""}
        />
        <Item
          name="Estoque"
          icon={<RiBox3Fill />}
          active={caminho.includes("/people") ? "active" : ""}
        />
        <Item
          name="Relatórios"
          icon={<RiPagesLine />}
          active={caminho.includes("/people") ? "active" : ""}
        />
        <Item
          name="Manutenção"
          icon={<LuWrench />}
          active={caminho.includes("/people") ? "active" : ""}
        />
        <Item
          name="PCP"
          icon={<FaToolbox />}
          active={caminho.includes("/people") ? "active" : ""}
        />
        <Item
          name="Treinamentos"
          icon={<LuPencilRuler />}
          active={caminho.includes("/people") ? "active" : ""}
        />
        <li>
          <button onClick={handleLogout}>
            <MdLogout />
            <p>Sair</p>
          </button>
        </li>
      </ul>
    </MenuNav>
  );
};
export default Menu;
