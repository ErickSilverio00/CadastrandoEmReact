import { useEffect, useState } from "react";
import Banner from "./componentes/Banner";
import Formulario from "./componentes/Formulario";
import Setor from "./componentes/Setor";
import Rodape from "./componentes/Rodape";
import Titulo from "./componentes/Titulo";

function App() {
  const setores = [
    {
      nome: "Vendas",
      corPrimaria: "#57C278",
      corSecundaria: "#D9F7E9",
    },
    {
      nome: "Marketing",
      corPrimaria: "#82CFFA",
      corSecundaria: "#E8F8FF",
    },
    {
      nome: "RH",
      corPrimaria: "#A6D157",
      corSecundaria: "F0F8E2",
    },
    {
      nome: "Financeiro",
      corPrimaria: "#E06B69",
      corSecundaria: "#FDE7E8",
    },
    {
      nome: "Suporte",
      corPrimaria: "#DB6EBF",
      corSecundaria: "#FAE9F5",
    },
    {
      nome: "Desenvolvimento",
      corPrimaria: "#FFBA05",
      corSecundaria: "#FFF5D9",
    },
    {
      nome: "Logística",
      corPrimaria: "#FF8A29",
      corSecundaria: "#FFEEDF",
    },
  ];

  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const dadosSalvos = localStorage.getItem("dadosClientes");
    if (dadosSalvos) {
      setClientes(JSON.parse(dadosSalvos));
    }
  }, []);

  const salvarDadosLocalStorage = (dados) => {
    localStorage.setItem("dadosClientes", JSON.stringify(dados));
  };

  const aoNovoClienteAdicionado = (cliente) => {
    const novoCliente = { ...cliente, id: Date.now() };
    const novosClientes = [...clientes, novoCliente];
    setClientes(novosClientes);
    salvarDadosLocalStorage(novosClientes); 
  };

  const aoExcluirCliente = (cliente) => {
    const novosClientes = clientes.filter((c) => c.id !== cliente.id);
    setClientes(novosClientes);
    salvarDadosLocalStorage(novosClientes);
  };

  const aoAlterarCliente = (cliente) => {
    const clienteAtualizado = clientes.map((c) =>
      c.id === cliente.id ? cliente : c
    );
    setClientes(clienteAtualizado);
    salvarDadosLocalStorage(clienteAtualizado);
  };

  return (
    <div className="App">
      <Banner />
      <Formulario
        setores={setores.map((setor) => setor.nome)}
        aoClienteCadastrado={(cliente) => aoNovoClienteAdicionado(cliente)}
      />
      <Titulo titulo="Meus Clientes" />
      {setores.map((setor) => (
        <Setor
          key={setor.nome}
          nome={setor.nome}
          corPrimaria={setor.corPrimaria}
          corSecundaria={setor.corSecundaria}
          clientes={clientes.filter((cliente) => cliente.setor === setor.nome)}
          aoExcluirCliente={aoExcluirCliente}
          aoAlterarCliente={aoAlterarCliente}
        />
      ))}
      <Rodape />
    </div>
  );
}

export default App;
