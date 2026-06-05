import { createContext, useState } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tarefas, setTarefas] = useState([]);

  const adicionarTarefa = (novaTarefa) => {
    setTarefas([...tarefas, { ...novaTarefa, id: Date.now() }]);
  };

  return (
    <TaskContext.Provider value={{ tarefas, adicionarTarefa }}>
      {children}
    </TaskContext.Provider>
  );
};