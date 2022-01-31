import React, {useState} from "react";
import "./Header.css"
import {
    AppBar,
    Toolbar,
    IconButton,
    Drawer,
    List,
    ListItem,
    IconContext,
    ListItemText,
    Typography,
  } from "@mui/material";
import {useHistory} from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';

function Header(props){
    const history = useHistory();
    const [avatar, setAvatar] = useState();
    const [open, setOpen] = useState(false);
    const [data, setData] = useState();
    function handleTudo(pathName, on){
        setOpen(on)
        history.push(pathName)
    }
    const links1 = [
        {
          link: () => handleTudo("/consultas", false),
          pathName: "/consultas",
          text: "Consultas",
        },
        {
          link: () => handleTudo("/validarsocio", false),
          pathName: "/validarsocio",
          text: "Validar Sócio",
        },
        {
          link: () => handleTudo("/admregistros", false),
          pathName: "/admregistros",
          text: "Administração de registros",
        },
        {
          link: () => handleTudo("/associadosexcluidos", false),
          pathName: "/associadosexcluidos",
          text: "Associados excluídos",
        },
        {
            link: () => handleTudo("/cadastro", false),
            pathName: "/cadastro",
            text: "Cadastrar",
          },
    ]
    const links2 = [
        {
          link: () => handleTudo("/admregistros", false),
          pathName: "/admregistros",
          text: "Administração de Registros",
        },
        {
          link: () => handleTudo("/cadastro", false),
          pathName: "/cadastro",
          text: "Cadastrar",
        },
    ]
    const links3 = [
        {
            link: () => handleTudo("/consultas", false),
            pathName: "/consultas",
            text: "Consultas",
          },
        {
            link: () => handleTudo("/admregistros", false),
            pathName: "/admregistros",
            text: "Administração de Registros",
          },
          {
            link: () => handleTudo("/cadastro", false),
            pathName: "/cadastro",
            text: "Cadastrar",
          },
    ]
    const links4 = [
        {
            link: () => handleTudo("/editais", false),
            pathName: "/editais",
            text: "Consulta Editais",
          },
        {
            link: () => handleTudo("/atas", false),
            pathName: "/atas",
            text: "Consulta Atas",
          },
          {
            link: () => handleTudo("/alteracoeseexclusoes", false),
            pathName: "/alteracoeseexclusoes",
            text: "Alterações e exclusões",
          },
          {
            link: () => handleTudo("/cadastro", false),
            pathName: "/cadastro",
            text: "Cadastrar",
          },
    ]
    const links5 = [
        {
          link: () => handleTudo("/usuarios", false),
          pathName: "/usuarios",
          text: "Módulo de usuários",
        },
        {
          link: () => handleTudo("/alterarsenha", false),
          pathName: "/alterarsenha",
          text: "Alteração de senha",
        },
    ]
    const pages = [
        {
          text: "Associados",
          links: links1
        },
        {
          text: "Notícias",
          links: links2
        },
        {
          text: "Modelos",
          links: links2
        },
        {
          text: "Ações",
          links: links3
        },
        {
          text: "Prestação de Contas",
          links: links3
        },
        {
          text: "Comuinc./Informações",
          links: links3
        },
        {
          text: "Atas/Editais",
          links: links4
        },
        {
          text: "Utilitários",
          links: links5
        },

      ];
    const drawer = [
        {
          pathName: "/dashboard",
          text: "Home",
        },
        {
          pathName: "/consultas",
          text: "Consultas",
        },
        {
          pathName: "/cadastro",
          text: "Cadastro",
        },
        {
          pathName: "/validarsocio",
          text: "Sócios",
        },
        {
          pathName: "/admregistors",
          text: "Registros",
        },
        {
          pathName: "/associadosexluidos",
          text: "Associado excluídos",
        },
        {
          pathName: "/atas",
          text: "Atas",
        },
        {
          pathName: "/editais",
          text: "Editais",
        },
      ];
    
    return(
        <>
        <AppBar position="static" className="appbar">
          <Toolbar className="toolbar">
              <button
                class="dropbtn"
                onClick={() => handleTudo("/login", false)}
              >
                  Sair
              </button>
          {pages.map((listItem) => {
            return (
            <div class="dropdown">
              <button
                class="dropbtn"
              >
                  {listItem.text}
              </button>
              <div class="dropdown-content" style={{float: 'left'}} align="left">
                 {listItem.links.map((listItem2) => {
                 return <a href={listItem2.pathName}>{listItem2.text}<br></br></a>;
                 })}
             </div>
            </div>
            );
          })}
          <button
            class="dropbtn"
            onClick={() => handleTudo("/intranet", false)}
          >
            Intranet
          </button>
          <div className="img">
            <img src='images/simbolo.png' alt="logo"/>
          </div>
          <div className="iconbutton">
          <IconButton
            edge="start"
            aria-label="menu"
            className="menuIcon"
          >
            <MenuIcon />
          </IconButton>
          <div class="iconbutton-content">
                 {drawer.map((listItem3) => {
                 return <a href={listItem3.pathName}>{listItem3.text}<br></br></a>;
                 })}
             </div>
          </div>
          </Toolbar>
        </AppBar>
        {props.children}
        </>
    )
    }
export default Header;



 