import { Aluno } from "./aluno";

export interface IMC {
  imcId?: string;
  alunoId: string;
  aluno?: Aluno;
  altura: number;
  peso: number;
  valorIMC?: number;
  classificacao?: string;
  criadoEm?: string;
}
