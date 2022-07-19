/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
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
  const [typeUser, setTypeUser] = useState('header-iconbutton');
  const [toolbar, setHeaderToolbar] = useState('header-toolbar');
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const history = useHistory();
  const { logout, user } = useAuth();

  console.log(logout);
  const handleClassName = () => {
    setClassName('header-iconbutton-content-onclick');
  };

  useEffect(() => {
    if (user?.type === 'usuario') {
      setTypeUser('header-iconbutton-user');
      setHeaderToolbar('header-toolbar-user');
    }
  }, []);

  function handleClick(pathName) {
    history.push(pathName);
  }
  function handleReturn() {
    window.location.href = '/login';
  }
  function handleSubmitIntranet() {
    window.location.href = '/intranet';
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
  const linksModels = [
    {
      link: () => handleClick('/admregistros'),
      pathName: '/administracao-registros-modelos',
      text: 'Administração de Registros',
    },
    {
      link: () => handleClick('/cadastrar-modelos'),
      pathName: '/cadastrar-modelos',
      text: 'Cadastrar',
    },
  ];
  const linksAcoes = [
    {
      link: () => handleClick('/admregistros'),
      pathName: '/administracao-registros-acoes',
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
      link: () => handleClick('/administracao-registros-comunic'),
      pathName: '/administracao-registros-comunic',
      text: 'Administração de Registros',
    },
    {
      link: () => handleClick('/cadastrar-comunic'),
      pathName: '/cadastrar-comunic',
      text: 'Cadastrar',
    },
  ];
  const linksContas = [
    {
      link: () => handleClick('/admregistros'),
      pathName: '/administracao-registros-contas',
      text: 'Administração de Registros',
    },
    {
      link: () => handleClick('/cadastrar-contas'),
      pathName: '/cadastrar-contas',
      text: 'Cadastrar',
    },
  ];
  const linksMinutes = [
    {
      link: () => handleClick('/consulta-atas'),
      pathName: '/consulta-atas-e-editais',
      text: 'Consultas',
    },
    {
      link: () => handleClick('/alteracoes-e-exclusoes-atas'),
      pathName: '/alteracoes-e-exclusoes-atas',
      text: 'Alterações e exclusões',
    },
    {
      link: () => handleClick('/cadastrar-atas'),
      pathName: '/cadastrar-atas',
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
      links: linksModels,
      icon: <ArticleOutlinedIcon />,
    },
    {
      text: 'Ações',
      links: linksAcoes,
      icon: <PendingActionsOutlinedIcon />,
    },
    {
      text: 'Prestação de Contas',
      links: linksContas,
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
        <Toolbar className={toolbar}>
          <button
            className="header-dropbtn"
            onClick={() => handleReturn()}
            type="button"
          >
            Sair
          </button>
          {user?.type === 'administrador' && pages?.map((listItem) => (
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
            onClick={() => handleSubmitIntranet()}
            type="button"
          >
            Intranet
          </button>
          <div>
            <img src={simbolo} alt="logo" />
          </div>
          <div
            className={typeUser}
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
                    onClick={logout}
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
              {user?.type === 'administrador' && open && pages?.map((item) => (
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
                  {user?.type === 'usuario' && (
                    <button
                      className="responsive-header-dropdown-button"
                      onClick={() => handleClick('/alterar-senha')}
                      type="button"
                    >
                      <span>
                        <Brightness5OutlinedIcon />
                      </span>
                      Alterar senha
                    </button>
                  )}
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
