import { useEffect, useState } from "react";
import { IMC } from "../models/imc";

function AlterarIMC() {
  const [imcId, setIMCId] = useState("");
  const [altura, setAltura] = useState<number>();
  const [peso, setPeso] = useState<number>();
  const [mensagem, setMensagem] = useState("");

  function buscarIMC() {
    //FECTH ou AXIOS
    fetch(`http://localhost:5275/api/imc/listar`)
      .then((resposta) => resposta.json())
      .then((imcs: IMC[]) => {
        const imc = imcs.find((imc) => imc.imcId === imcId);
        if (imc) {
          setAltura(imc.altura);
          setPeso(imc.peso);
        } else {
          alert("IMC não encontrado.");
        }
      });
  }

  function alterarIMC(e: React.FormEvent) {
    e.preventDefault();
    const updatedIMC = {
      altura: altura!,
      peso: peso!,
    };

    fetch(`http://localhost:5275/api/imc/alterar/${imcId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedIMC),
    })
      .then((resposta) => {
        if (resposta.ok) {
          setMensagem("IMC alterado com sucesso!");
        } else {
          setMensagem("Erro ao alterar IMC.");
        }
      })
      .catch((erro) => alert("Erro: " + erro));
  }

  return (
    <div>
      <h1>Alterar IMC</h1>
      <form onSubmit={alterarIMC}>
        <label>ID do IMC:</label>
        <input
          type="text"
          placeholder="Digite o ID do IMC"
          onChange={(e) => setIMCId(e.target.value)}
          required
        />
        <button type="button" onClick={buscarIMC}>
          Buscar IMC
        </button>
        <br />
        <label>Altura (m):</label>
        <input
          type="number"
          step="0.01"
          value={altura || ""}
          onChange={(e) => setAltura(Number(e.target.value))}
          required
        />
        <br />
        <label>Peso (kg):</label>
        <input
          type="number"
          step="0.01"
          value={peso || ""}
          onChange={(e) => setPeso(Number(e.target.value))}
          required
        />
        <br />
        <button type="submit">Salvar Alterações</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default AlterarIMC;
