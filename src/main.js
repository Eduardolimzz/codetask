const CHAVE_TAREFAS = "codetask_tarefas";

function obterTarefas() {
  const tarefasSalvas = localStorage.getItem(CHAVE_TAREFAS);
  return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
}

function salvarTarefas(tarefas) {
  localStorage.setItem(CHAVE_TAREFAS, JSON.stringify(tarefas));
}

function inicializarCadastro() {
  const form = document.getElementById("form-cadastro");
  const mensagemErro = document.getElementById("mensagem-erro");

  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const disciplina = document.getElementById("disciplina").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const prazo = document.getElementById("prazo").value;
    const prioridade = document.getElementById("prioridade").value;
    const status = document.getElementById("status").value;

    if (!titulo || !disciplina || !descricao || !prazo || !prioridade || !status) {
      mensagemErro.textContent = "Preencha todos os campos.";
      return;
    }

    mensagemErro.textContent = "";

    const novaTarefa = {
      id: Date.now(),
      titulo,
      disciplina,
      descricao,
      prazo,
      prioridade,
      status,
    };

    const tarefas = obterTarefas();
    tarefas.push(novaTarefa);
    salvarTarefas(tarefas);

    form.reset();
    alert("Tarefa cadastrada com sucesso!");

    window.location.href = "listagem.html";
  });
}

function inicializarListagem() {
  const lista = document.getElementById("lista-tarefas");
  const semTarefas = document.getElementById("sem-tarefas");

  if (!lista) return;

  const tarefas = obterTarefas();

  if (tarefas.length === 0) {
    return;
  }

  if (semTarefas) {
    semTarefas.remove();
  }

  tarefas.forEach(function (tarefa) {
    const item = document.createElement("li");

    item.innerHTML = `
      <h3>${tarefa.titulo}</h3>
      <p><strong>Disciplina:</strong> ${tarefa.disciplina}</p>
      <p><strong>Descrição:</strong> ${tarefa.descricao}</p>
      <p><strong>Prazo:</strong> ${tarefa.prazo}</p>
      <p><strong>Prioridade:</strong> ${tarefa.prioridade}</p>
      <p><strong>Status:</strong> ${tarefa.status}</p>
    `;

    lista.appendChild(item);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  inicializarCadastro();
  inicializarListagem();
});