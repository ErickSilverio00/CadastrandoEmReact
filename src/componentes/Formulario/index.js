import "./Formulario.css";
import CampoTexto from "../CampoTexto";
import ListaSuspensa from "../ListaSuspensa";
import Botao from "../Botao";
import { useState } from "react";
import { validarEmail, validarNome, validarTelefone } from "./validacoes";

const Formulario = (props) => {
  const [nome, setNome] = useState("");
  const [setor, setSetor] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [imagem, setImagem] = useState("");

  const [erros, setErros] = useState({
    nome: { valido: true, texto: "" },
    email: { valido: true, texto: "" },
    telefone: { valido: true, texto: "" },
  });

  const aoSalvar = (evento) => {
    evento.preventDefault();
    if (erros.nome.valido && erros.email.valido && erros.telefone.valido) {
      props.aoClienteCadastrado({
        id: Date.now(),
        nome,
        setor,
        telefone,
        email,
        imagem,
      });

      setNome("");
      setSetor("");
      setTelefone("");
      setEmail("");
      setImagem("");
    } else {
      alert("Por favor, corrija os erros antes de enviar o formulário.");
    }
  };

  const aoAlterarNome = (valor) => {
    const ehValido = validarNome(valor);
    setErros((prevState) => ({ ...prevState, nome: ehValido }));
    setNome(valor);
  };

  const aoAlterarEmail = (valor) => {
    const ehValido = validarEmail(valor);
    setErros((prevState) => ({ ...prevState, email: ehValido }));
    setEmail(valor);
  };

  const aoAlterarTelefone = (valor) => {
    const ehValido = validarTelefone(valor);
    setErros((prevState) => ({ ...prevState, telefone: ehValido }));
    setTelefone(valor);
  };

  return (
    <section className="formulario">
      <form onSubmit={aoSalvar}>
        <h2>Preencha os dados para criar o card do cliente</h2>
        <CampoTexto
          obrigatorio={true}
          label="Nome"
          placeholder="Digite o nome da empresa"
          valor={nome}
          aoAlterado={aoAlterarNome}
          onBlur={() => {
            const ehValido = validarNome(nome);
            setErros((prevState) => ({ ...prevState, nome: ehValido }));
          }}
          error={!erros.nome.valido}
          helperText={erros.nome.texto}
        />
        <ListaSuspensa
          required={true}
          label="Setor"
          itens={props.setores}
          valor={setor}
          aoAlterado={(valor) => setSetor(valor)}
        />
        <CampoTexto
          obrigatorio={true}
          label="Telefone"
          placeholder="Digite o telefone da empresa"
          valor={telefone}
          aoAlterado={aoAlterarTelefone}
          onBlur={() => {
            const ehValido = validarTelefone(telefone);
            setErros((prevState) => ({ ...prevState, telefone: ehValido }));
          }}
          error={!erros.telefone.valido}
          helperText={erros.telefone.texto}
        />
        <CampoTexto
          obrigatorio={true}
          label="Email"
          placeholder="Digite o email da empresa"
          valor={email}
          aoAlterado={aoAlterarEmail}
          onBlur={() => {
            const ehValido = validarEmail(email);
            setErros((prevState) => ({ ...prevState, email: ehValido }));
          }}
          error={!erros.email.valido}
          helperText={erros.email.texto}
        />
        <CampoTexto
          label="Imagem"
          placeholder="Digite o endereço da imagem"
          valor={imagem}
          aoAlterado={(valor) => setImagem(valor)}
        />

        <Botao>Criar Card</Botao>
      </form>
    </section>
  );
};

export default Formulario;
