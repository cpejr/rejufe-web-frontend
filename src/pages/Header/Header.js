import React from "react";
import "./Header.css";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import simbolo from "../../images/simbolo.png";
import { useHistory } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import SubMenu from "../../components/SubMenu/SubMenu";
import LogoutIcon from "@mui/icons-material/Logout";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import FilePresentOutlinedIcon from "@mui/icons-material/FilePresentOutlined";
import Brightness5OutlinedIcon from "@mui/icons-material/Brightness5Outlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";

function Header(props) {
  const history = useHistory();

  function handleClick(pathName) {
    history.push(pathName);
  }
  const links1 = [
    {
      link: () => handleClick("/consultas"),
      pathName: "/consultas",
      text: "Consultas",
    },
    {
      link: () => handleClick("/validarsocio"),
      pathName: "/validarsocio",
      text: "Validar Sócio",
    },
    {
      link: () => handleClick("/admregistros"),
      pathName: "/admregistros",
      text: "Administração de registros",
    },
    {
      link: () => handleClick("/associadosexcluidos"),
      pathName: "/associadosexcluidos",
      text: "Associados excluídos",
    },
    {
      link: () => handleClick("/cadastro"),
      pathName: "/cadastro",
      text: "Cadastrar",
    },
  ];
  const links2 = [
    {
      link: () => handleClick("/admregistros"),
      pathName: "/admregistros",
      text: "Administração de Registros",
    },
    {
      link: () => handleClick("/cadastro"),
      pathName: "/cadastro",
      text: "Cadastrar",
    },
  ];
  const links3 = [
    {
      link: () => handleClick("/consultas"),
      pathName: "/consultas",
      text: "Consultas",
    },
    {
      link: () => handleClick("/admregistros"),
      pathName: "/admregistros",
      text: "Administração de Registros",
    },
    {
      link: () => handleClick("/cadastro"),
      pathName: "/cadastro",
      text: "Cadastrar",
    },
  ];
  const links4 = [
    {
      link: () => handleClick("/editais"),
      pathName: "/editais",
      text: "Consulta Editais",
    },
    {
      link: () => handleClick("/atas"),
      pathName: "/atas",
      text: "Consulta Atas",
    },
    {
      link: () => handleClick("/alteracoeseexclusoes"),
      pathName: "/alteracoeseexclusoes",
      text: "Alterações e exclusões",
    },
    {
      link: () => handleClick("/cadastro"),
      pathName: "/cadastro",
      text: "Cadastrar",
    },
  ];
  const links5 = [
    {
      link: () => handleClick("/usuarios"),
      pathName: "/usuarios",
      text: "Módulo de usuários",
    },
    {
      link: () => handleClick("/alterarsenha"),
      pathName: "/alterarsenha",
      text: "Alteração de senha",
    },
  ];
  const pages = [
    {
      text: "Associados",
      links: links1,
      icon: <AccountBoxOutlinedIcon />,
    },
    {
      text: "Notícias",
      links: links2,
      icon: <FeedOutlinedIcon />,
    },
    {
      text: "Modelos",
      links: links2,
      icon: <ArticleOutlinedIcon />,
    },
    {
      text: "Ações",
      links: links3,
      icon: <PendingActionsOutlinedIcon />,
    },
    {
      text: "Prestação de Contas",
      links: links3,
      icon: <MonetizationOnOutlinedIcon />,
    },
    {
      text: "Comunic./Informações",
      links: links3,
      icon: <AnnouncementOutlinedIcon />,
    },
    {
      text: "Atas/Editais",
      links: links4,
      icon: <FilePresentOutlinedIcon />,
    },
    {
      text: "Utilitários",
      links: links5,
      icon: <Brightness5OutlinedIcon />,
    },
  ];

  return (
    <>
      <AppBar position="static" className="header-appbar">
        <Toolbar className="header-toolbar">
          <button class="header-dropbtn" onClick={() => handleClick("/login")}>
            Sair
          </button>
          {pages.map((listItem) => {
            return (
              <div class="header-dropdown">
                <button class="header-dropbtn">{listItem.text}</button>
                <div class="header-dropdown-content">
                  {listItem.links.map((listItem2) => {
                    return (
                      <a href={listItem2.pathName}>
                        {listItem2.text}
                        <br></br>
                      </a>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <button
            class="header-dropbtn"
            onClick={() => handleClick("/intranet")}
          >
            Intranet
          </button>
          <div className="img">
            <img src={simbolo} alt="logo" />
          </div>
          <div className="header-iconbutton">
            <IconButton
              edge="start"
              aria-label="menu"
              className="header-menuIcon"
            >
              <MenuIcon />
            </IconButton>
            <div class="header-iconbutton-content">
              <div className="responsive-header-dropdown">
                <button
                  class="responsive-header-dropdown-button"
                  onClick={() => handleClick("/login")}
                >
                  <span>
                    <LogoutIcon />
                  </span>
                  Sair
                </button>
              </div>
              {pages.map((item) => {
                return <SubMenu item={item}></SubMenu>;
              })}
              <div className="responsive-header-dropdown">
                <button
                  class="responsive-header-dropdown-button"
                  onClick={() => handleClick("/intranet")}
                >
                  <span>
                    <LanguageOutlinedIcon />
                  </span>
                  Intranet
                </button>
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      {props.children}
    </>
  );
}
export default Header;
