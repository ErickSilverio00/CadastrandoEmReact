import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import './CampoTexto.css';
import { mascararTelefone } from '../Formulario/validacoes';

const CampoTexto = (props) => {
  const [valor, setValor] = useState(props.valor);

  useEffect(() => {
    setValor(props.valor);
  }, [props.valor]);

  const aoDigitado = (event) => {
    if (props.label === 'Telefone') {
      const valor = mascararTelefone(event.target.value);
      setValor(valor);
      props.aoAlterado(valor);
    } else {
      setValor(event.target.value);
      props.aoAlterado(event.target.value);
    }
  };

  return (
    <div className="campo-texto">
      <TextField
        fullWidth
        label={props.label}
        value={valor}
        onChange={aoDigitado}
        required={props.obrigatorio}
        placeholder={props.placeholder}
        variant="filled"
        error={props.error}
        helperText={props.helperText}
      />
    </div>
  );
};

export default CampoTexto;
