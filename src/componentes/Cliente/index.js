import { Button, FormControl, InputLabel, MenuItem, NativeSelect, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import "./Cliente.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  mascararTelefone,
  validarEmail,
  validarNome,
  validarTelefone,
} from "../Formulario/validacoes";

const Cliente = ({
  corDeFundo,
  aoAlterarCliente,
  aoExcluirCliente,
  cliente,
}) => {
  const { id, nome, setor, imagem, telefone, email } = cliente;
  const telefoneSemFormatacao = telefone.replace(/\D/g, "");

  const [modoEdicao, setModoEdicao] = useState(false);
  const [nomeEditado, setNomeEditado] = useState(nome);
  const [setorEditado, setSetorEditado] = useState(setor);
  const [telefoneEditado, setTelefoneEditado] = useState(telefone);
  const [emailEditado, setEmailEditado] = useState(email);
  const [imagemEditada, setImagemEditada] = useState(imagem);

  const [erros, setErros] = useState({
    nomeEditado: { valido: true, texto: "" },
    emailEditado: { valido: true, texto: "" },
    telefoneEditado: { valido: true, texto: "" },
  });

  useEffect(() => {
    if (!modoEdicao) {
      setNomeEditado(nome);
      setSetorEditado(setor);
      setTelefoneEditado(telefone);
      setEmailEditado(email);
      setImagemEditada(imagem);
    }
  }, [modoEdicao, nome, setor, telefone, email, imagem]);

  const handleExcluirCliente = () => {
    aoExcluirCliente(cliente);
  };

  const handleEditarCliente = () => {
    setModoEdicao(true);
  };

  const handleCancelarEdicao = () => {
    setModoEdicao(false);
  };

  const handleSalvarEdicao = () => {
    if (
      erros.nomeEditado.valido &&
      erros.emailEditado.valido &&
      erros.telefoneEditado.valido
    ) {
      aoAlterarCliente({
        ...cliente,
        id,
        nome: nomeEditado,
        setor: setorEditado,
        telefone: telefoneEditado,
        email: emailEditado,
        imagem: imagemEditada,
      });
      setModoEdicao(false);
    } else {
      alert("Por favor, corrija os erros antes de enviar o formulário.");
    }
  };

  const handleChangeNome = (event) => {
    const valor = event.target.value;
    const ehValido = validarNome(valor);
    setErros((prevState) => ({ ...prevState, nomeEditado: ehValido }));
    setNomeEditado(valor);
  };

  const handleChangeSetor = (event) => {
    setSetorEditado(event.target.value);
  };

  const handleChangeTelefone = (event) => {
    const valor = mascararTelefone(event.target.value);
    const ehValido = validarTelefone(valor);
    setErros((prevState) => ({ ...prevState, telefoneEditado: ehValido }));
    setTelefoneEditado(valor);
  };

  const handleChangeEmail = (event) => {
    const valor = event.target.value;
    const ehValido = validarEmail(valor);
    setErros((prevState) => ({ ...prevState, emailEditado: ehValido }));
    setEmailEditado(valor);
  };

  const handleChangeImagem = (event) => {
    setImagemEditada(event.target.value);
  };

  return (
    <div className="cliente">
      <div className="cabecalho" style={{ backgroundColor: corDeFundo }}>
        <img src={imagem} alt={nome} />
        <Button
          className="cabecalho-deletar"
          style={{
            position: "absolute",
            minWidth: 0,
            padding: 0,
            justifyContent: "end",
            color: "white",
          }}
          onClick={handleExcluirCliente}
        >
          <DeleteIcon className="cabecalho-deletar-icon" />
        </Button>
      </div>
      <div className="rodape">
        {modoEdicao ? (
          <div className="rodape-edicao">
            <TextField
              className="rodape-edicao__input"
              size="small"
              variant="filled"
              label="Nome"
              value={nomeEditado}
              onChange={handleChangeNome}
              onBlur={() => {
                const valor = nomeEditado;
                const ehValido = validarNome(valor);
                setErros((prevState) => ({
                  ...prevState,
                  nomeEditado: ehValido,
                }));
              }}
              error={!erros.nomeEditado.valido}
              helperText={erros.nomeEditado.texto}
            />
            <FormControl className="rodape-edicao__select" variant="filled">
              <InputLabel htmlFor="setor">Setor</InputLabel>
              <NativeSelect
                id="setor"
                value={setorEditado}
                onChange={handleChangeSetor}
                classes={{
                  root: "native-select-root",
                  icon: "native-select-icon",
                }}
                inputProps={{
                  classes: {
                    icon: "native-select-icon",
                  },
                }}
              >
                <option value="" disabled>
                  Escolha o setor da empresa
                </option>
                <option value="Vendas">Vendas</option>
                <option value="Marketing">Marketing</option>
                <option value="RH">RH</option>
                <option value="Financeiro">Financeiro</option>
                <option value="Suporte">Suporte</option>
                <option value="Desenvolvimento">Desenvolvimento</option>
                <option value="Logística">Logística</option>
              </NativeSelect>
            </FormControl>
            <TextField
              className="rodape-edicao__input"
              size="small"
              variant="filled"
              label="Telefone"
              value={telefoneEditado}
              onChange={handleChangeTelefone}
              onBlur={() => {
                const valor = telefoneEditado;
                const ehValido = validarTelefone(valor);
                setErros((prevState) => ({
                  ...prevState,
                  telefoneEditado: ehValido,
                }));
              }}
              error={!erros.telefoneEditado.valido}
              helperText={erros.telefoneEditado.texto}
            />
            <TextField
              className="rodape-edicao__input"
              size="small"
              variant="filled"
              label="Email"
              value={emailEditado}
              onChange={handleChangeEmail}
              onBlur={() => {
                const valor = emailEditado;
                const ehValido = validarEmail(valor);
                setErros((prevState) => ({
                  ...prevState,
                  emailEditado: ehValido,
                }));
              }}
              error={!erros.emailEditado.valido}
              helperText={erros.emailEditado.texto}
            />
            <TextField
              className="rodape-edicao__input"
              size="small"
              variant="filled"
              label="Imagem"
              value={imagemEditada}
              onChange={handleChangeImagem}
            />
            <div className="rodape-edicao__botoes">
              <Button
                className="rodape-edicao__botoes__salvar"
                variant="contained"
                style={{ backgroundColor: corDeFundo }}
                onClick={handleSalvarEdicao}
              >
                Salvar
              </Button>
              <Button
                className="rodape-edicao__botoes__cancelar"
                onClick={handleCancelarEdicao}
                style={{ color: corDeFundo }}
              >
                Cancelar
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <h4 style={{ color: corDeFundo }}>{nome}</h4>
            <div className="rodape-logos">
              <a href={`//wa.me/+55${telefoneSemFormatacao}?`}>
                <img src="/imagens/wpp.svg" alt="logo-wpp" />
              </a>
              <a href={`mailto:${email}`}>
                <img src="/imagens/gmail.svg" alt="logo-gmail" />
              </a>
            </div>
            <Button
              className="rodape-editar"
              variant="contained"
              startIcon={<EditIcon />}
              style={{
                color: "white",
                backgroundColor: corDeFundo,
                marginTop: 20,
              }}
              onClick={handleEditarCliente}
            >
              Editar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cliente;
