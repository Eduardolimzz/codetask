import { useEffect, useState } from "react";
import { useItems } from "../context/ItemsContext.jsx";
import { buscarTarefasDaApi } from "../services/api.js";

function formatarData(iso) {
  if (!iso) return "Sem prazo informado";

  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}

function formatarTexto(valor) {
  if (!valor) return "Não informado";

  return valor
    .replace("-", " ")
    .replace(/\b\w/g, (letra) => letra.toUpperCase());
}

export default function Listagem() {
  const { items } = useItems();

  const [tarefasApi, setTarefasApi] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

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

  const todasAsTarefas = [...tarefasCadastradas, ...tarefasApi];

  return (
    <section className="page">
      <section className="listagemHeader">
        <div>
          <h1>Listagem</h1>
          <p>
            Veja as tarefas cadastradas no app e os dados carregados de uma API
            REST pública.
          </p>
        </div>

        <section className="resumoListagem">
          <p>
            <strong>{tarefasCadastradas.length}</strong> tarefa(s) cadastrada(s)
          </p>
          <p>
            <strong>{tarefasApi.length}</strong> item(ns) da API
          </p>
        </section>
      </section>

      <section className="statusBox">
        <p>
          <strong>Dados do cadastro:</strong> tarefas criadas pelo formulário da
          aplicação.
        </p>
        <p>
          <strong>Dados da API:</strong> tarefas externas carregadas de
          JSONPlaceholder.
        </p>
      </section>

      {carregando && (
        <p className="loading">Carregando dados da API...</p>
      )}

      {erro && (
        <p className="erroBox" role="alert">
          {erro}
        </p>
      )}

      {!carregando && todasAsTarefas.length === 0 ? (
        <p className="muted">
          Nenhum item cadastrado ainda. Vá em “Cadastro” para adicionar.
        </p>
      ) : (
        <section className="grid">
          {todasAsTarefas.map((tarefa) => (
            <article className="card" key={tarefa.id}>
              <section className="cardTop">
                <span
                  className={
                    tarefa.origem === "API REST"
                      ? "badge badgeApi"
                      : "badge badgeCadastro"
                  }
                >
                  {tarefa.origem}
                </span>
              </section>

              <h3 className="cardTitle">{tarefa.titulo}</h3>

              <p className="cardText">
                <strong>Disciplina:</strong> {tarefa.disciplina}
              </p>

              <p className="cardText">
                <strong>Prazo:</strong> {formatarData(tarefa.prazo)}
              </p>

              <section className="cardMeta">
                <p>
                  <strong>Prioridade:</strong>{" "}
                  {formatarTexto(tarefa.prioridade)}
                </p>

                <p>
                  <strong>Status:</strong> {formatarTexto(tarefa.status)}
                </p>
              </section>

              <p className="cardText descricao">{tarefa.descricao}</p>
            </article>
          ))}
        </section>
      )}
    </section>
  );
}