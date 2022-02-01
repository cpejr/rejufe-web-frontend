import React from "react";
import "./Header.css"
import {
    AppBar,
    Toolbar,
    IconButton,
  } from "@mui/material";
import {useHistory} from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

function Header(props){
    const history = useHistory();
    function handleClick(pathName){
        history.push(pathName)
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
    ]
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
    ]
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
    ]
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
    ]
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
          pathName: "/dashboard/administrador",
          text: "Home",
        },
        {
          pathName: "/consultas",
          text: "Consultas",
        },
        {
          pathName: "/validarsocio",
          text: "Validar Sócio",
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
        {
          pathName: "/alteracoeseexclusoes",
          text: "Alterações e exclusões",
        },
        {
          pathName: "/usuarios",
          text: "Módulo de usuários",
        },
        {
          pathName: "/alterarsenha",
          text: "Alteração de senha",
        },
      ];
    
    return(
        <>
        <AppBar position="static" className="appbar">
          <Toolbar className="toolbar">
              <button
                class="dropbtn"
                onClick={() => handleClick("/login")}
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
              <div class="dropdown-content">
                 {listItem.links.map((listItem2) => {
                 return <a href={listItem2.pathName}>{listItem2.text}<br></br></a>;
                 })}
             </div>
            </div>
            );
          })}
          <button
            class="dropbtn"
            onClick={() => handleClick("/intranet")}
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



 