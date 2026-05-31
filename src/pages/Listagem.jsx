import { useItems } from "../context/ItemsContext.jsx";

function formatarData(iso) {
  if (!iso) return "—";
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}

export default function Listagem() {
  const { items } = useItems();

  return (
    <section className="page">
      <h1>Listagem</h1>
      <p>Itens cadastrados (estado compartilhado via Context API).</p>

      {items.length === 0 ? (
        <p className="muted">Nenhum item cadastrado ainda. Vá em “Cadastro” para adicionar.</p>
      ) : (
        <section className="grid">
          {items.map((tarefa) => (
            <article className="card" key={tarefa.id}>
              <h3 className="cardTitle">{tarefa.titulo}</h3>
              <p className="cardText">
                <strong>Disciplina:</strong> {tarefa.disciplina}
              </p>
              <p className="cardText">
                <strong>Prazo:</strong> {formatarData(tarefa.prazo)}
              </p>
              <p className="cardText">
                <strong>Prioridade:</strong> {tarefa.prioridade}
              </p>
              <p className="cardText">
                <strong>Status:</strong> {tarefa.status}
              </p>
              <p className="cardText">{tarefa.descricao}</p>
            </article>
          ))}
        </section>
      )}
    </section>
  );
}
