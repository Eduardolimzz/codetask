import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.slice(0, 6));
        setCarregando(false);
      })
      .catch((error) => {
        console.error("Erro na requisição GET:", error);
        setErro("Não foi possível carregar os dados da API.");
        setCarregando(false);
      });
  }, []);

  return (
    <section className="page">
      <h1>Bem-vindo ao CodeTask</h1>
      <p>Cadastre e acompanhe suas tarefas acadêmicas em um app React.</p>

      <h2 className="mt">Exemplo de dados da API (JSONPlaceholder)</h2>
      {carregando && <p className="muted">Carregando...</p>}
      {erro && (
        <p className="error" role="alert">
          {erro}
        </p>
      )}

      {!carregando && !erro && (
        <section className="grid">
          {posts.map((item) => (
            <article className="card" key={item.id}>
              <h3 className="cardTitle">{item.title}</h3>
              <p className="cardText">{item.body}</p>
            </article>
          ))}
        </section>
      )}
    </section>
  );
}
