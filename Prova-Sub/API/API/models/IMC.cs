namespace API.Models;
public class IMC
{
    public string IMCId { get; set; } = Guid.NewGuid().ToString();
    public string AlunoId { get; set; }
    public Aluno? Aluno { get; set; }
    public double Altura { get; set; }
    public double Peso { get; set; }
    public double ValorIMC { get; set; }
    public string Classificacao { get; set; } = string.Empty;
    public DateTime CriadoEm { get; set; } = DateTime.Now;
}
