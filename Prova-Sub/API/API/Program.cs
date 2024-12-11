using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();

builder.Services.AddCors(options =>
    options.AddPolicy("Acesso Total",
        configs => configs
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod())
);

var app = builder.Build();

app.MapGet("/", () => "Prova Sub");

//Função para classificar IMC
string ClassificarIMC(double valorIMC)
{
    if (valorIMC < 18.5) return "Abaixo do peso";
    if (valorIMC >= 18.5 && valorIMC <= 24.9) return "Peso normal";
    if (valorIMC >= 25 && valorIMC <= 29.9) return "Sobrepeso";
    return "Obesidade";
}

//Listar Alunos
app.MapGet("/api/aluno/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Alunos.Any())
    {
        return Results.Ok(ctx.Alunos.ToList());
    }
    return Results.NotFound("Nenhum aluno cadastrado");
});

//Cadastrar Aluno
app.MapPost("/api/aluno/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Aluno aluno) =>
{
    var alunoExistente = ctx.Alunos.FirstOrDefault(a => a.Nome == aluno.Nome && a.Sobrenome == aluno.Sobrenome);
    if (alunoExistente != null)
    {
        return Results.BadRequest("Aluno com o mesmo nome e sobrenome já existe.");
    }

    ctx.Alunos.Add(aluno);
    ctx.SaveChanges();
    return Results.Created("", aluno);
});

//Cadastrar IMC
app.MapPost("/api/imc/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] IMC imc) =>
{
    var aluno = ctx.Alunos.Find(imc.AlunoId);
    if (aluno == null)
    {
        return Results.NotFound("Aluno não encontrado.");
    }

    imc.ValorIMC = Math.Round(imc.Peso / (imc.Altura * imc.Altura), 2);
    imc.Classificacao = ClassificarIMC(imc.ValorIMC);
    imc.Aluno = aluno;

    ctx.IMCs.Add(imc);
    ctx.SaveChanges();
    return Results.Created("", imc);
});

//Listar IMCs
app.MapGet("/api/imc/listar", ([FromServices] AppDataContext ctx) =>
{
    var imcs = ctx.IMCs.Include(i => i.Aluno).Select(i => new
    {
        i.IMCId,
        Nome = i.Aluno.Nome,
        Sobrenome = i.Aluno.Sobrenome,
        i.Altura,
        i.Peso,
        i.ValorIMC,
        i.Classificacao,
        i.CriadoEm
    }).ToList();
    return Results.Ok(imcs);
});

//Listar IMCs por aluno
app.MapGet("/api/imc/listar-por-aluno/{alunoId}", ([FromServices] AppDataContext ctx, string alunoId) =>
{
    var imcs = ctx.IMCs.Include(i => i.Aluno).Where(i => i.AlunoId == alunoId).Select(i => new
    {
        i.IMCId,
        Nome = i.Aluno.Nome,
        Sobrenome = i.Aluno.Sobrenome,
        i.Altura,
        i.Peso,
        i.ValorIMC,
        i.Classificacao,
        i.CriadoEm
    }).ToList();

    if (!imcs.Any())
    {
        return Results.NotFound("Nenhum IMC encontrado para o aluno especificado.");
    }

    return Results.Ok(imcs);
});

//Alterar IMC
app.MapPut("/api/imc/alterar/{imcId}", ([FromServices] AppDataContext ctx, string imcId, [FromBody] IMC updatedImc) =>
{
    var imc = ctx.IMCs.Find(imcId);
    if (imc == null)
    {
        return Results.NotFound("IMC não encontrado.");
    }

    imc.Altura = updatedImc.Altura;
    imc.Peso = updatedImc.Peso;
    imc.ValorIMC = Math.Round(updatedImc.Peso / (updatedImc.Altura * updatedImc.Altura), 2);
    imc.Classificacao = ClassificarIMC(imc.ValorIMC);

    ctx.SaveChanges();
    return Results.Ok(imc);
});


app.UseCors("Acesso Total");
app.Run();