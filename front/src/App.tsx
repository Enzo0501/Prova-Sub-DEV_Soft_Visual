import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ListarAlunos from "./components/ListarAlunos";
import CadastrarAluno from "./components/CadastrarAluno";
import CadastrarImc from "./components/CadastrarImc";
import ListarIMCs from "./components/ListarIMCs";
import ListarIMCsPorAluno from "./components/ListarIMCsPorAluno";
import AlterarIMC from "./components/AlterarIMC";

function App() {
  return (
    <div>
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/pages/aluno/listar"}>Listar Alunos</Link>
            </li>
            <li>
              <Link to={"/pages/aluno/cadastrar"}>Cadastrar Aluno</Link>
            </li>
            <li>
              <Link to={"/pages/imc/cadastrar"}>Cadastrar IMC</Link>
            </li>
            <li>
              <Link to={"/pages/imc/listar"}>Listar IMCs</Link>
            </li>
            <li>
              <Link to={"/pages/imc/listar-por-aluno"}>Listar IMCs por Aluno</Link>
            </li>
            <li>
              <Link to={"/pages/imc/alterar"}>Alterar IMC</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<h1>Gerenciador de Alunos e IMCs!</h1>} />
          <Route path="/pages/aluno/listar" element={<ListarAlunos />} />
          <Route path="/pages/aluno/cadastrar" element={<CadastrarAluno />} />
          <Route path="/pages/imc/cadastrar" element={<CadastrarImc />} />
          <Route path="/pages/imc/listar" element={<ListarIMCs />} />
          <Route path="/pages/imc/listar-por-aluno" element={<ListarIMCsPorAluno />} />
          <Route path="/pages/imc/alterar" element={<AlterarIMC />} />
        </Routes>
        <footer>
          <p>Desenvolvido para Gerenciamento de Alunos e IMCs</p>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
