import { useEffect, useState } from "react";
import { Aluno } from "../models/aluno";

function ListarAlunos() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);

  useEffect(() => {
    fetch("http://localhost:5275/api/aluno/listar")
      .then((resposta) => resposta.json())
      .then((dados: Aluno[]) => setAlunos(dados))
      .catch((erro) => alert("Erro ao carregar alunos: " + erro));
  }, []);

  return (
    <div>
      <h1>Lista de Alunos</h1>
      {alunos.length > 0 ? (
        <ul>
          {alunos.map((aluno) => (
            <li key={aluno.alunoId}>
              {aluno.nome} {aluno.sobrenome} - Criado em: {aluno.criadoEm}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum aluno cadastrado.</p>
      )}
    </div>
  );
}

export default ListarAlunos;
