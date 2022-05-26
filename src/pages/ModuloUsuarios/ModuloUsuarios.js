import React, { useEffect, useState } from 'react';
import './moduloUsuario.css';
import { toast } from 'react-toastify';
import {
  InputLabel, FormControl, OutlinedInput, Select, MenuItem, InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from 'react-router-dom';
import TableComponent from '../../components/moduloUsuario/TableContainer';
import * as managerService from '../../services/manager/managerService';
import ModalUsuario from '../../components/moduloUsuario/modalUsuario/ModalUsuario';
import judicialSection from '../../components/consts/judicialSection';

toast.configure();

function ModuloUsuarios() {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [typeChanged, setTypeChanged] = useState(false);
  const [filter, setFilter] = useState('');
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState('');
  const history = useHistory();

  const handleChange = (value) => {
    if (value === '' || value === 'Sem filtros') {
      setSearch('');
      setRows(admins);
    }
    setFilter(value);
  };
  function replaceSpecialChars(str) {
    str = str.replace(/[ÀÁÂÃÄÅ]/, 'A');
    str = str.replace(/[àáâãäå]/, 'a');
    str = str.replace(/[ÙÚÛÜ]/, 'U');
    str = str.replace(/[úúûü]/, 'u');
    str = str.replace(/[ÈÉÊË]/, 'E');
    str = str.replace(/[éèêë]/, 'e');
    str = str.replace(/[íìîï]/, 'i');
    str = str.replace(/[ÍÌÎÏ]/, 'I');
    str = str.replace(/[óòôöõ]/, 'o');
    str = str.replace(/[ÓÒÔÖÕ]/, 'O');
    str = str.replace(/[Ç]/, 'C');
    str = str.replace(/[ç]/, 'c');

    return str.replace(/[^a-z0-9]/gi, '');
  }

  const handleSearch = (value) => {
    if (filter === 'Usuários') {
      // eslint-disable-next-line max-len
      setRows(admins?.filter((admin) => replaceSpecialChars(admin?.name.toLowerCase()).includes(replaceSpecialChars(value))));
      setSearch(value);
    }
    if (filter === 'Seção') {
      setSearch(value);
      setRows(admins?.filter((admin) => admin?.judicial_section === value));
    }
  };

  function filterAdmins(value) {
    return value?.type === 'administrador';
  }

  function filterUsers(value) {
    return value?.type === 'usuario';
  }

  const getUsers = async () => {
    try {
      const response = await managerService.getAllUsers();
      setUsers(response?.filter(filterUsers));
      setAdmins(response?.filter(filterAdmins));
      setRows(response?.filter(filterAdmins));
    } catch (error) {
      history.push('/NotFound');
      toast.error('Não foi possível obter usuários!!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  };

  useEffect(() => {
    getUsers();
  }, [typeChanged]);

  const titles = [
    '',
    '',
    'Status',
    'Usuário',
    'Seção',
    'Perfil',
    'Login',
    'Atuação',
    'Email',
    'Cpf',
  ];

  return (
    <div className="container-user-module">
      <div className="title-user-module-page">
        <h1>Módulo de Usuários</h1>
      </div>
      <div className="user-module-search-field">
        <div className="button-filter-user-module">
          <ModalUsuario setTypeChanged={setTypeChanged} users={users} />
          <FormControl className="form-user-module-page">
            <InputLabel id="select-filter">Selecione um filtro</InputLabel>
            <Select
              className="select-filter-user-module"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filter}
              label="Selecione um filtro"
              onChange={(e) => handleChange(e.target.value)}
            >
              <MenuItem value="Sem filtros">Sem filtros</MenuItem>
              <MenuItem value="Usuários">Usuários</MenuItem>
              <MenuItem value="Seção">Seção</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="search-container-user-module">
          {filter === 'Seção' ? (
            <FormControl className="form-user-module-page">
              <InputLabel id="demo-simple-select-label">Selecione uma seção</InputLabel>
              <Select
                className="select-search-user-module"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={search}
                label="Selecione uma seção"
                onChange={(e) => handleSearch(e.target.value.toLowerCase())}
              >

                {judicialSection?.map((section) => (
                  <MenuItem value={section.value}>{section.label}</MenuItem>
                ))}
              </Select>
            </FormControl>

          ) : (
            <OutlinedInput
              className="search-input-user-module"
              id="search-field"
              endAdornment={<InputAdornment position="end"><SearchIcon /></InputAdornment>}
              placeholder="Busca rápida"
              value={search}
              onChange={(e) => handleSearch(e.target.value.toLowerCase())}
            />
          )}
        </div>
      </div>
      <TableComponent setTypeChanged={setTypeChanged} rows={rows} titles={titles} order />
    </div>

  );
}

export default ModuloUsuarios;
