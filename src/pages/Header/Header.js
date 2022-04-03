/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
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
import { useAuth } from '../../providers/auth';

function Header(props) {
  const [className, setClassName] = useState('header-iconbutton-content');
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const history = useHistory();
  const { logout } = useAuth();

  const handleClassName = () => {
    setClassName('header-iconbutton-content-onclick');
  };

  function handleClick(pathName) {
    history.push(pathName);
  }
  const links1 = [
    {
      link: () => handleClick('/consultas'),
      pathName: '/consulta-associados',
      text: 'Consultas',
    },
    {
      link: () => handleClick('/validarsocio'),
      pathName: '/validar-socio',
      text: 'Validar Sócio',
    },
    {
      link: () => handleClick('/admregistros'),
      pathName: '/administracao-registros',
      text: 'Administração de registros',
    },
    {
      link: () => handleClick('/associadosexcluidos'),
      pathName: '/associados-excluidos',
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
      link: () => handleClick('/administracao-registros-noticias'),
      pathName: '/administracao-registros-noticias',
      text: 'Administração de Registros',
    },
    {
      link: () => handleClick('/cadastrar-noticias'),
      pathName: '/cadastrar-noticias',
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
      pathName: '/administracao-registros',
      text: 'Administração de Registros',
    },
    {
      link: () => handleClick('/cadastrar-acoes'),
      pathName: '/cadastrar-acoes',
      text: 'Cadastrar',
    },
  ];
  const linksAcoes = [
    {
      link: () => handleClick('/consultas'),
      pathName: '/consultas',
      text: 'Consultas',
    },
    {
      link: () => handleClick('/admregistros'),
      pathName: '/administracao-registros',
      text: 'Administração de Registros',
    },
    {
      link: () => handleClick('/cadastrar-acoes'),
      pathName: '/cadastrar-acoes',
      text: 'Cadastrar',
    },
  ];
  const linksComunic = [
    {
      link: () => handleClick('/consultas'),
      pathName: '/consultas',
      text: 'Consultas',
    },
    {
      link: () => handleClick('/admregistros'),
      pathName: '/administracao-registros',
      text: 'Administração de Registros',
    },
    {
      link: () => handleClick('/cadastrar-comunic'),
      pathName: '/cadastrar-comunic',
      text: 'Cadastrar',
    },
  ];
  const linksMinutes = [
    {
      link: () => handleClick('/consultas-atas'),
      pathName: '/consultas-atas',
      text: 'Consultas',
    },
    {
      link: () => handleClick('/alteracoes-e-exclusoes-atas'),
      pathName: '/alteracoes-e-exclusoes-atas',
      text: 'Alterações e exclusões',
    },
    {
      link: () => handleClick('/cadastro-atas'),
      pathName: '/cadastro-atas',
      text: 'Cadastrar',
    },
  ];
  const links5 = [
    {
      link: () => handleClick('/modulo-usuario'),
      pathName: '/modulo-usuario',
      text: 'Módulo de usuários',
    },
    {
      link: () => handleClick('/alterarsenha'),
      pathName: '/alterar-senha',
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
      links: linksAcoes,
      icon: <PendingActionsOutlinedIcon />,
    },
    {
      text: 'Prestação de Contas',
      links: links3,
      icon: <MonetizationOnOutlinedIcon />,
    },
    {
      text: 'Comunic./Informações',
      links: linksComunic,
      icon: <AnnouncementOutlinedIcon />,
    },
    {
      text: 'Atas/Editais',
      links: linksMinutes,
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
          <div
            className="header-iconbutton"
            onClick={handleClassName}
          >
            <IconButton
              edge="start"
              aria-label="menu"
              className="header-menuIcon"
              onClick={handleOpen}
            >
              <MenuIcon />
            </IconButton>
            <div className={className}>
              {open === true ? (
                <div className="responsive-header-dropdown">
                  <button
                    className="responsive-header-dropdown-button"
                    onClick={() => {
                      handleClick('/login');
                      logout();
                    }}
                    type="button"
                  >
                    <span>
                      <LogoutIcon />
                    </span>
                    Sair
                  </button>
                </div>
              ) : (
                null
              )}
              {open && pages?.map((item) => (
                <SubMenu item={item} />
              ))}
              {open === true ? (
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
              ) : (
                null
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
      {props.children}
    </>
  );
}
export default Header;
