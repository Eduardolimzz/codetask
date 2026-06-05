import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskContext } from './TaskContext'; // Importando o nosso contexto

export default function Cadastro() {
  const [formData, setFormData] = useState({
    titulo: '', disciplina: '', descricao: '', prazo: '', prioridade: 'baixa', status: 'pendente'
  });
  const [erro, setErro] = useState('');
  
  const { adicionarTarefa } = useContext(TaskContext); // Acessando a função do Contexto
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação simples
    if (!formData.titulo || !formData.disciplina || !formData.descricao) {
      setErro("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    
    // Chamando a função do Contexto para salvar a tarefa globalmente
    adicionarTarefa(formData);
    
    console.log("Tarefa salva no estado global:", formData);
    navigate('/listagem'); // Redireciona para a listagem
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Tarefa</h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      
      <input type="text" placeholder="Título" 
        onChange={(e) => setFormData({...formData, titulo: e.target.value})} />
      
      <input type="text" placeholder="Disciplina" 
        onChange={(e) => setFormData({...formData, disciplina: e.target.value})} />
      
      <textarea placeholder="Descrição" 
        onChange={(e) => setFormData({...formData, descricao: e.target.value})} />
      
      <button type="submit">Salvar Tarefa</button>
    </form>
  );
}