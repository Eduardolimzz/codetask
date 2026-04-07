const CHAVE_TAREFAS = "codetask_tarefas";

function obterTarefas() {
  const tarefasSalvas = localStorage.getItem(CHAVE_TAREFAS);
  return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
}

function salvarTarefas(tarefas) {
  localStorage.setItem(CHAVE_TAREFAS, JSON.stringify(tarefas));
}

function inicializarCadastro() {
  
  const form         = document.getElementById("form-cadastro");
  const mensagemErro = document.getElementById("mensagem-erro");

  if (!form) return;

  // Verifica se está editando
  const params  = new URLSearchParams(window.location.search);
  const idEditar = params.get("editar");
  let tarefaEditando = null;

  if (idEditar) {
    tarefaEditando = obterTarefas().find(function (t) { return t.id === Number(idEditar); });
    if (tarefaEditando) {
      document.getElementById("titulo").value      = tarefaEditando.titulo;
      document.getElementById("disciplina").value  = tarefaEditando.disciplina;
      document.getElementById("descricao").value   = tarefaEditando.descricao;
      document.getElementById("prazo").value       = tarefaEditando.prazo;
      document.getElementById("prioridade").value  = tarefaEditando.prioridade;
      document.getElementById("status").value      = tarefaEditando.status;
      document.querySelector("h1").textContent     = "Editar Tarefa";
      form.querySelector("button[type='submit']").textContent = "Salvar Alterações";
    }
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const titulo     = document.getElementById("titulo").value.trim();
    const disciplina = document.getElementById("disciplina").value.trim();
    const descricao  = document.getElementById("descricao").value.trim();
    const prazo      = document.getElementById("prazo").value;
    const prioridade = document.getElementById("prioridade").value;
    const status     = document.getElementById("status").value;

    if (!titulo || !disciplina || !descricao || !prazo || !prioridade || !status) {
      mensagemErro.textContent = "Preencha todos os campos.";
      return;
    }

    mensagemErro.textContent = "";
    let tarefas = obterTarefas();

    if (tarefaEditando) {
      // Atualiza tarefa existente
      tarefas = tarefas.map(function (t) {
        return t.id === tarefaEditando.id
          ? { ...t, titulo, disciplina, descricao, prazo, prioridade, status }
          : t;
      });
      salvarTarefas(tarefas);
      alert("Tarefa atualizada com sucesso!");
    } else {
      // Cria nova tarefa
      const novaTarefa = { id: Date.now(), titulo, disciplina, descricao, prazo, prioridade, status };
      tarefas.push(novaTarefa);
      salvarTarefas(tarefas);
      alert("Tarefa cadastrada com sucesso!");
    }

    form.reset();
    window.location.href = "/listagem.html";
  });
}

function inicializarListagem() {
  const corpoTabela = document.getElementById("corpo-tabela");
  const semTarefas  = document.getElementById("sem-tarefas");
  const busca       = document.getElementById("busca");
  const filtroStatus     = document.getElementById("filtro-status");
  const filtroPrioridade = document.getElementById("filtro-prioridade");

  if (!corpoTabela) return;

  function formatarData(dataISO) {
    if (!dataISO) return "—";
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  function renderizar() {
    const tarefas   = obterTarefas();
    const textoBusca = busca.value.toLowerCase();
    const statusFiltro     = filtroStatus.value;
    const prioridadeFiltro = filtroPrioridade.value;

    const filtradas = tarefas.filter(function (t) {
      const bate = t.titulo.toLowerCase().includes(textoBusca) ||
                   t.disciplina.toLowerCase().includes(textoBusca);
      const bateStatus     = !statusFiltro     || t.status === statusFiltro;
      const batePrioridade = !prioridadeFiltro || t.prioridade === prioridadeFiltro;
      return bate && bateStatus && batePrioridade;
    });

    corpoTabela.innerHTML = "";

    if (filtradas.length === 0) {
      semTarefas.style.display = "flex";
      return;
    }

    semTarefas.style.display = "none";

    filtradas.forEach(function (tarefa) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${tarefa.titulo}</td>
        <td>${tarefa.disciplina}</td>
        <td>${formatarData(tarefa.prazo)}</td>
        <td><span class="badge prioridade-${tarefa.prioridade}">${tarefa.prioridade}</span></td>
        <td><span class="badge status-${tarefa.status}">${tarefa.status}</span></td>
        <td class="acoes">
          <button class="btn-editar" data-id="${tarefa.id}">Editar</button>
          <button class="btn-excluir" data-id="${tarefa.id}">Excluir</button>
        </td>
      `;
      corpoTabela.appendChild(tr);
    });

    // Excluir
    document.querySelectorAll(".btn-excluir").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const id = Number(btn.dataset.id);
        if (!confirm("Excluir esta tarefa?")) return;
        const atualizadas = obterTarefas().filter(function (t) { return t.id !== id; });
        salvarTarefas(atualizadas);
        renderizar();
      });
    });

    // Editar — redireciona para cadastro com id na URL
    document.querySelectorAll(".btn-editar").forEach(function (btn) {
      btn.addEventListener("click", function () {
        window.location.href = "/cadastro.html?editar=" + btn.dataset.id;
      });
    });
  }

  busca.addEventListener("input", renderizar);
  filtroStatus.addEventListener("change", renderizar);
  filtroPrioridade.addEventListener("change", renderizar);

  renderizar();
}

// Isso deve estar FORA de qualquer função, no final do arquivo:
document.addEventListener("DOMContentLoaded", function () {
  inicializarCadastro();
  inicializarListagem();
});
