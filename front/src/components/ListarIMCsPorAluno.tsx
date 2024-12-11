import { useEffect, useState } from "react";
import { IMC } from "../models/imc";
import { Aluno } from "../models/aluno";

function ListarIMCsPorAluno() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [alunoId, setAlunoId] = useState("");
  const [imcs, setIMCs] = useState<IMC[]>([]);

  useEffect(() => {
    fetch("http://localhost:5275/api/aluno/listar")
      .then((resposta) => resposta.json())
      .then((dados) => setAlunos(dados))
      .catch((erro) => alert("Erro ao carregar alunos: " + erro));
  }, []);

  function carregarIMCs() {
    fetch(`http://localhost:5275/api/imc/listar-por-aluno/${alunoId}`)
      .then((resposta) => resposta.json())
      .then((dados) => setIMCs(dados))
      .catch((erro) => alert("Erro ao carregar IMCs: " + erro));
  }

  return (
    <div>
      <h1>Lista de IMCs por Aluno</h1>
      <select onChange={(e) => setAlunoId(e.target.value)}>
        <option value="">Selecione um aluno</option>
        {alunos.map((aluno) => (
          <option key={aluno.alunoId} value={aluno.alunoId}>
            {aluno.nome} {aluno.sobrenome}
          </option>
        ))}
      </select>
      <button onClick={carregarIMCs}>Carregar IMCs</button>

      {imcs.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Altura</th>
              <th>Peso</th>
              <th>IMC</th>
              <th>Classificação</th>
              <th>Data de Criação</th>
            </tr>
          </thead>
          <tbody>
            {imcs.map((imc) => (
              <tr key={imc.imcId}>
                <td>{imc.imcId}</td>
                <td>{imc.altura} m</td>
                <td>{imc.peso} kg</td>
                <td>{imc.valorIMC}</td>
                <td>{imc.classificacao}</td>
                <td>{new Date(imc.criadoEm!).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListarIMCsPorAluno;
