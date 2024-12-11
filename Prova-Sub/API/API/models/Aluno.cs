namespace API.Models;

public class Aluno
{
    public string AlunoId { get; set; } = Guid.NewGuid().ToString();
    public string Nome { get; set; } = string.Empty;
    public string Sobrenome { get; set; } = string.Empty;
    public DateTime CriadoEm { get; set; } = DateTime.Now;
}