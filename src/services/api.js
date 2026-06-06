const API_URL = "https://jsonplaceholder.typicode.com/posts";

export async function buscarTarefasDaApi() {
  const resposta = await fetch(`${API_URL}?_limit=6`);

  if (!resposta.ok) {
    throw new Error("Não foi possível carregar os dados da API.");
  }

  const dados = await resposta.json();

  return dados.map((post) => ({
    id: `api-${post.id}`,
    titulo: post.title,
    disciplina: `Usuário ${post.userId}`,
    descricao: post.body,
    prazo: "",
    prioridade: "externa",
    status: "api",
    origem: "API REST",
  }));
}