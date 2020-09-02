import React from "react";
import { uuid } from "uuidv4";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = React.useState([]);

  React.useEffect(() => {
    async function loadRepositories() {
      const response = await api.get("/repositories");

      setRepositories(response.data);
    }

    loadRepositories();
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      id: uuid(),
      title: "Repositório 1",
      url: "https://github.com/lfoliveir4",
      techs: ["Go", "React"],
      like: 0,
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter((repository) => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repositorie) => (
          <li key={repositorie.id}>
            {repositorie.title}

            <div>
              <button onClick={() => handleRemoveRepository(repositorie.id)}>
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
