import { useContext } from 'react';
import { TaskContext } from './TaskContext';

export default function Listagem() {
  const { tarefas } = useContext(TaskContext);

  return (
    <div>
      <h2>Minhas Tarefas</h2>
      {tarefas.length === 0 ? (
        <p>Nenhuma tarefa cadastrada ainda.</p>
      ) : (
        <ul>
          {tarefas.map((tarefa) => (
            <li key={tarefa.id} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
              <strong>{tarefa.titulo}</strong> - {tarefa.disciplina}
              <p>{tarefa.descricao}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}