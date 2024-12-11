import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Aluno } from "../models/aluno";

function CadastrarAluno() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");

  function cadastrarAluno(e: React.FormEvent) {
    const aluno: Aluno = {
      nome: nome,
      sobrenome: sobrenome,
    };
    
    fetch("http://localhost:5275/api/aluno/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(aluno),
    })
      .then((resposta) => {
        if (!resposta.ok) throw new Error("Erro ao cadastrar aluno");
        return resposta.json();
      })
      .then(() => navigate("/alunos/listar"))
      .catch((erro) => alert(erro.message));

    e.preventDefault();
  }

  return (
    <div>
      <h1>Cadastrar Aluno</h1>
      <form onSubmit={cadastrarAluno}>
        <label>Nome:</label>
        <input
          type="text"
          placeholder="Digite o nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <br />
        <label>Sobrenome:</label>
        <input
          type="text"
          placeholder="Digite o sobrenome"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          required
        />
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastrarAluno;
