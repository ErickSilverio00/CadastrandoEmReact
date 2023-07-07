import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import "./ListaSuspensa.css";

const ListaSuspensa = (props) => {
  return (
    <div className="lista-suspensa">
      <FormControl fullWidth required>
        <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.valor}
          label={props.label}
          onChange={(evento) => props.aoAlterado(evento.target.value)}
          variant="filled"
        >
          <MenuItem value="" disabled>
            Escolha o setor da empresa
          </MenuItem>
          {props.itens.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default ListaSuspensa;
