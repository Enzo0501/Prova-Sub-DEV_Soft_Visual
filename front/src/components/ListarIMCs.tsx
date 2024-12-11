import { useEffect, useState } from "react";
import { IMC } from "../models/imc";

function ListarIMCs() {
  const [imcs, setIMCs] = useState<IMC[]>([]);

  useEffect(() => {
    fetch("http://localhost:5275/api/imc/listar")
      .then((resposta) => resposta.json())
      .then((dados) => setIMCs(dados))
      .catch((erro) => alert("Erro ao carregar IMCs: " + erro));
  }, []);

  return (
    <div>
      <h1>Lista de IMCs</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Sobrenome</th>
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
              <td>{imc.aluno?.nome}</td>
              <td>{imc.aluno?.sobrenome}</td>
              <td>{imc.altura} m</td>
              <td>{imc.peso} kg</td>
              <td>{imc.valorIMC}</td>
              <td>{imc.classificacao}</td>
              <td>{new Date(imc.criadoEm!).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarIMCs;
