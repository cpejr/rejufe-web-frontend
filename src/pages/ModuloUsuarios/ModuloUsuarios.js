import React, { useEffect, useState } from 'react';
import './moduloUsuario.css';
import { toast } from 'react-toastify';
import {
  InputLabel, FormControl, OutlinedInput, Select, MenuItem, InputAdornment, createTheme, ThemeProvider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from 'react-router-dom';
import TableComponent from '../../components/moduloUsuario/TableContainer';
import * as managerService from '../../services/manager/managerService';
import ModalUsuario from '../../components/moduloUsuario/modalUsuario/ModalUsuario';

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

  const theme = createTheme({
    components: {
      MuiFormControl: {
        styleOverrides: {
          root: {
            width: '300px',
            marginLeft: '30px',
            marginRight: '30px',
          },
        },
      },
    },
  });

  const handleSearch = (value) => {
    if (filter === 'Usuários') {
      setRows(admins?.filter((admin) => admin.name?.toLowerCase().includes(value?.toLowerCase())));
      setSearch(value);
    }
    if (filter === 'Seção') {
      setRows(admins?.filter((admin) => admin.judicial_section?.toLowerCase().includes(value?.toLowerCase())));
      setSearch(value);
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
    'Email',
    'Cpf',
  ];

  return (
    <div className="container-user-module">
      <div className="Title-user-module-page">
        <h1>Módulo de Usuários</h1>
      </div>
      <div className="User-module-search-field">
        <ThemeProvider theme={theme}>
          <ModalUsuario setTypeChanged={setTypeChanged} users={users} />
          <FormControl>
            <InputLabel id="demo-simple-select-label">Selecione um filtro</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filter}
              label="filter"
              onChange={(e) => handleChange(e.target.value)}
            >
              <MenuItem value="Sem filtros">Sem filtros</MenuItem>
              <MenuItem value="Usuários">Usuários</MenuItem>
              <MenuItem value="Seção">Seção</MenuItem>
            </Select>
          </FormControl>
          <OutlinedInput
            endAdornment={<InputAdornment position="end"><SearchIcon /></InputAdornment>}
            placeholder="Busca rápida"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </ThemeProvider>
      </div>
      <TableComponent setTypeChanged={setTypeChanged} rows={rows} titles={titles} order />
    </div>

  );
}

export default ModuloUsuarios;
