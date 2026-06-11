import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useItems } from "../context/ItemsContext.jsx";

export default function Cadastro() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { items, addItem, updateItem } = useItems();

  const modoEdicao = Boolean(id);

  const [titulo, setTitulo] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prazo, setPrazo] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const [status, setStatus] = useState("");
  const [erros, setErros] = useState({});

  useEffect(() => {
    if (modoEdicao) {
      const item = items.find((i) => String(i.id) === String(id));
      if (item) {
        setTitulo(item.titulo);
        setDisciplina(item.disciplina);
        setDescricao(item.descricao);
        setPrazo(item.prazo);
        setPrioridade(item.prioridade);
        setStatus(item.status);
      } else {
        navigate("/listagem");
      }
    }
  }, [id, modoEdicao]);

  function validar() {
    const next = {};
    if (!titulo.trim()) next.titulo = "Informe o título.";
    if (!disciplina.trim()) next.disciplina = "Informe a disciplina.";
    if (!descricao.trim()) next.descricao = "Informe a descrição.";
    if (!prazo) next.prazo = "Informe o prazo.";
    if (!prioridade) next.prioridade = "Selecione a prioridade.";
    if (!status) next.status = "Selecione o status.";
    return next;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErros = validar();
    setErros(nextErros);
    if (Object.keys(nextErros).length > 0) return;

    const item = {
      id: modoEdicao ? Number(id) : Date.now(),
      titulo: titulo.trim(),
      disciplina: disciplina.trim(),
      descricao: descricao.trim(),
      prazo,
      prioridade,
      status,
    };

    if (modoEdicao) {
      updateItem(item);
      navigate("/listagem");
    } else {
      addItem(item);
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: item.titulo,
          body: item.descricao,
          userId: 1,
        }),
      })
        .then((res) => res.json())
        .then(() => navigate("/listagem"))
        .catch(() => navigate("/listagem"));
    }
  }

  return (
    <section className="page">
      <h1>{modoEdicao ? "Editar Tarefa" : "Cadastro"}</h1>
      <p>
        {modoEdicao
          ? "Altere os campos e salve para atualizar a tarefa."
          : "Preencha o formulário para cadastrar uma tarefa."}
      </p>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <fieldset className="fieldset">
          <section className="field">
            <label htmlFor="titulo">Título</label>
            <input
              id="titulo"
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ex: Trabalho de Tecnologias Web"
            />
            {erros.titulo && <p className="fieldError" role="alert">{erros.titulo}</p>}
          </section>

          <section className="field">
            <label htmlFor="disciplina">Disciplina</label>
            <input
              id="disciplina"
              type="text"
              value={disciplina}
              onChange={(e) => setDisciplina(e.target.value)}
              placeholder="Ex: Tecnologias Web"
            />
            {erros.disciplina && <p className="fieldError" role="alert">{erros.disciplina}</p>}
          </section>

          <section className="field">
            <label htmlFor="descricao">Descrição</label>
            <textarea
              id="descricao"
              rows={4}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descreva os detalhes da tarefa..."
            />
            {erros.descricao && <p className="fieldError" role="alert">{erros.descricao}</p>}
          </section>

          <section className="fieldRow">
            <section className="field">
              <label htmlFor="prazo">Prazo</label>
              <input
                id="prazo"
                type="date"
                value={prazo}
                onChange={(e) => setPrazo(e.target.value)}
              />
              {erros.prazo && <p className="fieldError" role="alert">{erros.prazo}</p>}
            </section>

            <section className="field">
              <label htmlFor="prioridade">Prioridade</label>
              <select
                id="prioridade"
                value={prioridade}
                onChange={(e) => setPrioridade(e.target.value)}
              >
                <option value="">Selecione</option>
                <option value="baixa">🟢 Baixa</option>
                <option value="media">🟡 Média</option>
                <option value="alta">🔴 Alta</option>
              </select>
              {erros.prioridade && <p className="fieldError" role="alert">{erros.prioridade}</p>}
            </section>

            <section className="field">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Selecione</option>
                <option value="pendente">🔴 Pendente</option>
                <option value="em-andamento">🟡 Em andamento</option>
                <option value="concluida">🟢 Concluída</option>
              </select>
              {erros.status && <p className="fieldError" role="alert">{erros.status}</p>}
            </section>
          </section>
        </fieldset>

        <button className="btn" type="submit">
          {modoEdicao ? "Salvar alterações" : "Cadastrar"}
        </button>
      </form>
    </section>
  );
}