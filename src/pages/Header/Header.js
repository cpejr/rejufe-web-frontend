/* eslint-disable react/destructuring-assignment */
import React from 'react';
import './Header.css';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import { useHistory } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';
import Brightness5OutlinedIcon from '@mui/icons-material/Brightness5Outlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import SubMenu from '../../components/SubMenu/SubMenu';
import simbolo from '../../images/simbolo.png';

function Header(props) {
  const history = useHistory();

  function handleClick(pathName) {
    history.push(pathName);
  }
  const links1 = [
    {
      link: () => handleClick('/consultas'),
      pathName: '/consultas',
      text: 'Consultas',
    },
    {
      link: () => handleClick('/validarsocio'),
      pathName: '/validarsocio',
      text: 'Validar Sócio',
    },
    {
      link: () => handleClick('/admregistros'),
      pathName: '/admregistros',
      text: 'Administração de registros',
    },
    {
      link: () => handleClick('/associadosexcluidos'),
      pathName: '/associadosexcluidos',
      text: 'Associados excluídos',
    },
    {
      link: () => handleClick('/cadastro'),
      pathName: '/cadastro',
      text: 'Cadastrar',
    },
  ];
  const links2 = [
    {
      link: () => handleClick('/admregistros'),
      pathName: '/admregistros',
      text: 'Administração de Registros',
    },
    {
      link: () => handleClick('/cadastro'),
      pathName: '/cadastro',
      text: 'Cadastrar',
    },
  ];
  const links3 = [
    {
      link: () => handleClick('/consultas'),
      pathName: '/consultas',
      text: 'Consultas',
    },
    {
      link: () => handleClick('/admregistros'),
      pathName: '/admregistros',
      text: 'Administração de Registros',
    },
    {
      link: () => handleClick('/cadastro'),
      pathName: '/cadastro',
      text: 'Cadastrar',
    },
  ];
  const links4 = [
    {
      link: () => handleClick('/editais'),
      pathName: '/editais',
      text: 'Consulta Editais',
    },
    {
      link: () => handleClick('/atas'),
      pathName: '/atas',
      text: 'Consulta Atas',
    },
    {
      link: () => handleClick('/alteracoeseexclusoes'),
      pathName: '/alteracoeseexclusoes',
      text: 'Alterações e exclusões',
    },
    {
      link: () => handleClick('/cadastro'),
      pathName: '/cadastro',
      text: 'Cadastrar',
    },
  ];
  const links5 = [
    {
      link: () => handleClick('/usuarios'),
      pathName: '/usuarios',
      text: 'Módulo de usuários',
    },
    {
      link: () => handleClick('/alterarsenha'),
      pathName: '/alterarsenha',
      text: 'Alteração de senha',
    },
  ];
  const pages = [
    {
      text: 'Associados',
      links: links1,
      icon: <AccountBoxOutlinedIcon />,
    },
    {
      text: 'Notícias',
      links: links2,
      icon: <FeedOutlinedIcon />,
    },
    {
      text: 'Modelos',
      links: links2,
      icon: <ArticleOutlinedIcon />,
    },
    {
      text: 'Ações',
      links: links3,
      icon: <PendingActionsOutlinedIcon />,
    },
    {
      text: 'Prestação de Contas',
      links: links3,
      icon: <MonetizationOnOutlinedIcon />,
    },
    {
      text: 'Comunic./Informações',
      links: links3,
      icon: <AnnouncementOutlinedIcon />,
    },
    {
      text: 'Atas/Editais',
      links: links4,
      icon: <FilePresentOutlinedIcon />,
    },
    {
      text: 'Utilitários',
      links: links5,
      icon: <Brightness5OutlinedIcon />,
    },
  ];

  return (
    <>
      <AppBar position="static" className="header-appbar">
        <Toolbar className="header-toolbar">
          <button
            className="header-dropbtn"
            onClick={() => handleClick('/login')}
            type="button"
          >
            Sair
          </button>
          {pages?.map((listItem) => (
            <div className="header-dropdown">
              <button className="header-dropbtn" type="button">{listItem.text}</button>
              <div className="header-dropdown-content">
                {listItem.links.map((listItem2) => (
                  <a href={listItem2.pathName}>
                    {listItem2.text}
                    <br />
                  </a>
                ))}
              </div>
            </div>
          ))}
          <button
            className="header-dropbtn"
            onClick={() => handleClick('/intranet')}
            type="button"
          >
            Intranet
          </button>
          <div>
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
            <div className="header-iconbutton-content">
              <div className="responsive-header-dropdown">
                <button
                  className="responsive-header-dropdown-button"
                  onClick={() => handleClick('/login')}
                  type="button"
                >
                  <span>
                    <LogoutIcon />
                  </span>
                  Sair
                </button>
              </div>
              {pages?.map((item) => (
                <SubMenu item={item} />
              ))}
              <div className="responsive-header-dropdown">
                <button
                  className="responsive-header-dropdown-button"
                  onClick={() => handleClick('/intranet')}
                  type="button"
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
