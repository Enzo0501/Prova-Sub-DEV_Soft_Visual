import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMC } from "../models/imc";
import { Aluno } from "../models/aluno";

function CadastrarImc() {
  const navigate = useNavigate();
  const [alunoId, setAlunoId] = useState("");
  const [altura, setAltura] = useState<number>(0);
  const [peso, setPeso] = useState<number>(0);
  const [alunos, setAlunos] = useState<Aluno[]>([]);

  useEffect(() => {
    fetch("http://localhost:5275/api/aluno/listar")
      .then((resposta) => resposta.json())
      .then((dados: Aluno[]) => setAlunos(dados))
      .catch((erro) => alert("Erro ao carregar alunos: " + erro));
  }, []);

  function cadastrarIMC(e: React.FormEvent) {
    const imc: IMC = {
      alunoId: alunoId,
      altura: altura,
      peso: peso,
    };

    fetch("http://localhost:5275/api/imc/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(imc),
    })
      .then((resposta) => {
        if (!resposta.ok) throw new Error("Erro ao cadastrar IMC");
        return resposta.json();
      })
      .then(() => navigate("/imcs/listar"))
      .catch((erro) => alert(erro.message));

    e.preventDefault();
  }

  return (
    <div>
      <h1>Cadastrar IMC</h1>
      <form onSubmit={cadastrarIMC}>
        <label>Aluno:</label>
        <select
          value={alunoId}
          onChange={(e) => setAlunoId(e.target.value)}
          required
        >
          <option value="">Selecione um aluno</option>
          {alunos.map((aluno) => (
            <option key={aluno.alunoId} value={aluno.alunoId}>
              {aluno.nome} {aluno.sobrenome}
            </option>
          ))}
        </select>
        <br />
        <label>Altura (metros):</label>
        <input
          type="number"
          placeholder="Digite a altura"
          value={altura}
          onChange={(e) => setAltura(parseFloat(e.target.value))}
          required
        />
        <br />
        <label>Peso (quilos):</label>
        <input
          type="number"
          placeholder="Digite o peso"
          value={peso}
          onChange={(e) => setPeso(parseFloat(e.target.value))}
          required
        />
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastrarImc;
