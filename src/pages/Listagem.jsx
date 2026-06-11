import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useItems } from "../context/ItemsContext.jsx";
import { buscarTarefasDaApi } from "../services/api.js";

function formatarData(iso) {
  if (!iso) return "Sem prazo informado";
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}

function formatarTexto(valor) {
  if (!valor) return "Não informado";
  return valor.replace("-", " ").replace(/\b\w/g, (letra) => letra.toUpperCase());
}

function classePrioridade(valor) {
  const mapa = {
    alta: "prioridadeAlta",
    media: "prioridadeMedia",
    baixa: "prioridadeBaixa",
    externa: "prioridadeExterna",
  };
  return mapa[valor] ?? "prioridadeExterna";
}

function classeStatus(valor) {
  const mapa = {
    pendente: "statusPendente",
    "em-andamento": "statusEmAndamento",
    concluida: "statusConcluida",
    api: "statusApi",
  };
  return mapa[valor] ?? "statusApi";
}

export default function Listagem() {
  const { items, removeItem } = useItems();
  const navigate = useNavigate();

  const [tarefasApi, setTarefasApi] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [ordenacao, setOrdenacao] = useState("padrao");

  useEffect(() => {
    async function carregarDadosApi() {
      try {
        setCarregando(true);
        setErro("");
        const dados = await buscarTarefasDaApi();
        setTarefasApi(dados);
      } catch (error) {
        setErro("Erro ao carregar tarefas da API. Tente novamente mais tarde.");
        console.error("Erro na API:", error);
      } finally {
        setCarregando(false);
      }
    }
    carregarDadosApi();
  }, []);

  const tarefasCadastradas = items.map((item) => ({
    ...item,
    origem: "Cadastro no app",
  }));

  function ordenarTarefas(lista) {
    if (ordenacao === "prazo") {
      return [...lista].sort((a, b) => {
        if (!a.prazo) return 1;
        if (!b.prazo) return -1;
        return new Date(a.prazo) - new Date(b.prazo);
      });
    }
    if (ordenacao === "prioridade") {
      const ordem = { alta: 0, media: 1, baixa: 2, externa: 3 };
      return [...lista].sort(
        (a, b) => (ordem[a.prioridade] ?? 9) - (ordem[b.prioridade] ?? 9)
      );
    }
    if (ordenacao === "status") {
      const ordem = { pendente: 0, "em-andamento": 1, concluida: 2, api: 3 };
      return [...lista].sort(
        (a, b) => (ordem[a.status] ?? 9) - (ordem[b.status] ?? 9)
      );
    }
    return lista;
  }

  const todasAsTarefas = ordenarTarefas([...tarefasCadastradas, ...tarefasApi]);

  return (
    <section className="page">
      <section className="listagemHeader">
        <div>
          <h1>Listagem</h1>
          <p>Veja as tarefas cadastradas no app e os dados carregados de uma API REST pública.</p>
        </div>
        <section className="resumoListagem">
          <p><strong>{tarefasCadastradas.length}</strong> tarefa(s) cadastrada(s)</p>
          <p><strong>{tarefasApi.length}</strong> item(ns) da API</p>
        </section>
      </section>

      <section className="statusBox">
        <p><strong>Dados do cadastro:</strong> tarefas criadas pelo formulário da aplicação.</p>
        <p><strong>Dados da API:</strong> tarefas externas carregadas de JSONPlaceholder.</p>
      </section>

      <section className="field" style={{ maxWidth: "250px", marginBottom: "1.5rem" }}>
        <label htmlFor="ordenacao">Ordenar por</label>
        <select
          id="ordenacao"
          value={ordenacao}
          onChange={(e) => setOrdenacao(e.target.value)}
        >
          <option value="padrao">Padrão</option>
          <option value="prazo">Prazo</option>
          <option value="prioridade">Prioridade</option>
          <option value="status">Status</option>
        </select>
      </section>

      {carregando && <p className="loading">Carregando dados da API...</p>}
      {erro && <p className="erroBox" role="alert">{erro}</p>}

      {!carregando && todasAsTarefas.length === 0 ? (
        <p className="muted">Nenhum item cadastrado ainda. Vá em "Cadastro" para adicionar.</p>
      ) : (
        <section className="grid">
          {todasAsTarefas.map((tarefa) => (
            <article className="card" key={tarefa.id}>
              <section className="cardTop">
                <span className={tarefa.origem === "API REST" ? "badge badgeApi" : "badge badgeCadastro"}>
                  {tarefa.origem}
                </span>
              </section>

              <h3 className="cardTitle">{tarefa.titulo}</h3>
              <p className="cardText"><strong>Disciplina:</strong> {tarefa.disciplina}</p>
              <p className="cardText"><strong>Prazo:</strong> {formatarData(tarefa.prazo)}</p>

              <section className="cardMeta">
                <p className={classePrioridade(tarefa.prioridade)}>
                  <strong>Prioridade:</strong> {formatarTexto(tarefa.prioridade)}
                </p>
                <p className={classeStatus(tarefa.status)}>
                  <strong>Status:</strong> {formatarTexto(tarefa.status)}
                </p>
              </section>

              <p className="cardText descricao">{tarefa.descricao}</p>

              {tarefa.origem !== "API REST" && (
                <section className="cardActions">
                  <button
                    className="btn btnSecundario"
                    onClick={() => navigate(`/cadastro/${tarefa.id}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btnPerigo"
                    onClick={() => {
                      if (confirm("Deseja excluir esta tarefa?")) {
                        removeItem(tarefa.id);
                      }
                    }}
                  >
                    Excluir
                  </button>
                </section>
              )}
            </article>
          ))}
        </section>
      )}
    </section>
  );
}