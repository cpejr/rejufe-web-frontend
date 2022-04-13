/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import './StyledInput.css';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import useWindowDimensions from '../useWindowDimensions/useWindowDimensions';

const CssTextField = withStyles(() => ({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white', // bordar normal
      },
      '&:hover fieldset': {
        borderColor: 'white', // borda quando passa o mouse
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white', // borda quando digita
      },
      valueStyle: 'color: red',
    },
  },
}))(TextField);

function StyledInput({
  setDados, type, label, id, width, select, height,
}) {
  const [showPassword, setShowPassword] = useState();
  const { WindowWidth } = useWindowDimensions();
  useEffect(async () => {
    if (type === 'password') {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  }, []);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [error, setError] = useState(false);
  const handleChange = (e, entrada) => {
    if (type === 'number' && e.target.value < 0) {
      setError(true);
    } else {
      setError(false);
    }
    const { value } = e.target;
    setDados(value, entrada);
  };
  return (
    <div className="styled-input-container">
      { WindowWidth > 1250
        ? (
          <CssTextField
            InputLabelProps={{
              style: {
                color: 'black',
                background: 'white',
              },
            }}
            InputProps={{
              style: {
                color: 'black',
                padding: '0',
                height: '43px',
                width,
                marginBottom: '4.5vh',
                background: 'white',
                borderRadius: '6px',
              },
              endAdornment: (
                <div>
                  { type === 'password'
                    ? (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          { showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    ) : <div />}
                </div>
              ),
            }}
            error={error}
            type={showPassword ? 'text' : 'password'}
            min="0"
            label={label}
            variant="outlined"
            id={id}
            width={width}
            height={height}
            select={select}
            onChange={(e) => handleChange(e, id)}
          />
        ) : WindowWidth > 690 ? (
          <CssTextField
            InputLabelProps={{
              style: {
                color: 'black',
                background: 'white',
              },
            }}
            InputProps={{
              style: {
                color: 'black',
                padding: '0',
                height: '37px',
                width,
                marginBottom: '4.5vh',
                background: 'white',
                borderRadius: '6px',
              },
              endAdornment: (
                <div>
                  { type === 'password'
                    ? (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          { showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    ) : <div />}
                </div>
              ),
            }}
            error={error}
            type={showPassword ? 'text' : 'password'}
            min="0"
            label={label}
            variant="outlined"
            id={id}
            width={width}
            height={height}
            select={select}
            onChange={(e) => handleChange(e, id)}
          />
        ) : WindowWidth > 570 ? (
          <CssTextField
            InputLabelProps={{
              style: {
                color: 'black',
                background: 'white',
              },
            }}
            InputProps={{
              style: {
                color: 'black',
                padding: '0',
                height: '34px',
                width,
                marginBottom: '4.5vh',
                background: 'white',
                borderRadius: '6px',
              },
              endAdornment: (
                <div>
                  { type === 'password'
                    ? (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          { showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    ) : <div />}
                </div>
              ),
            }}
            error={error}
            type={showPassword ? 'text' : 'password'}
            min="0"
            label={label}
            variant="outlined"
            id={id}
            width={width}
            height={height}
            select={select}
            onChange={(e) => handleChange(e, id)}
          />
        ) : WindowWidth > 420 ? (
          <CssTextField
            InputLabelProps={{
              style: {
                color: 'black',
                background: 'white',
              },
            }}
            InputProps={{
              style: {
                color: 'black',
                padding: '0',
                height: '31px',
                width,
                marginBottom: '4.5vh',
                background: 'white',
                borderRadius: '6px',
              },
              endAdornment: (
                <div>
                  { type === 'password'
                    ? (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          { showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    ) : <div />}
                </div>
              ),
            }}
            error={error}
            type={showPassword ? 'text' : 'password'}
            min="0"
            label={label}
            variant="outlined"
            id={id}
            width={width}
            height={height}
            select={select}
            onChange={(e) => handleChange(e, id)}
          />
        ) : (
          <CssTextField
            InputLabelProps={{
              style: {
                color: 'black',
                background: 'white',
              },
            }}
            InputProps={{
              style: {
                color: 'black',
                padding: '0',
                height: '31px',
                width,
                marginBottom: '4.5vh',
                background: 'white',
                borderRadius: '6px',
              },
              endAdornment: (
                <div>
                  { type === 'password'
                    ? (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          { showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    ) : <div />}
                </div>
              ),
            }}
            error={error}
            type={showPassword ? 'text' : 'password'}
            min="0"
            label={label}
            variant="outlined"
            id={id}
            width={width}
            height={height}
            select={select}
            onChange={(e) => handleChange(e, id)}
          />
        )}

    </div>

  );
}
export default StyledInput;
