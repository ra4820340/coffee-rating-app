import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/api/coffees";

function App() {
  const [coffees, setCoffees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState("All");
  const [selectedRoast, setSelectedRoast] = useState("All");

  const loadCoffees = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch coffees");
      }

      const data = await response.json();

      setCoffees(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const voteCoffee = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}/vote`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to vote");
      }

      const data = await response.json();

      setCoffees((current) =>
        current.map((coffee) =>
          coffee.id === id ? data.coffee : coffee
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCoffees();
  }, []);

  const origins = [
    "All",
    ...new Set(coffees.map((coffee) => coffee.origin)),
  ];

  const roasts = [
    "All",
    ...new Set(coffees.map((coffee) => coffee.roast)),
  ];

  const filteredCoffees = coffees.filter((coffee) => {
    const matchesSearch =
      coffee.name.toLowerCase().includes(search.toLowerCase()) ||
      coffee.origin.toLowerCase().includes(search.toLowerCase());

    const matchesOrigin =
      selectedOrigin === "All" ||
      coffee.origin === selectedOrigin;

    const matchesRoast =
      selectedRoast === "All" ||
      coffee.roast === selectedRoast;

    return matchesSearch && matchesOrigin && matchesRoast;
  });

  return (
    <div className="app">
      <header className="header">
        <h1>☕ Coffee Rating App</h1>
        <p>Discover and rate coffee from around the world.</p>
      </header>

      <main className="container">
        <section className="filters">
          <input
            type="text"
            placeholder="Search coffee..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            value={selectedOrigin}
            onChange={(event) =>
              setSelectedOrigin(event.target.value)
            }
          >
            {origins.map((origin) => (
              <option key={origin} value={origin}>
                {origin}
              </option>
            ))}
          </select>

          <select
            value={selectedRoast}
            onChange={(event) =>
              setSelectedRoast(event.target.value)
            }
          >
            {roasts.map((roast) => (
              <option key={roast} value={roast}>
                {roast}
              </option>
            ))}
          </select>
        </section>

        {loading ? (
          <p className="message">Loading coffees...</p>
        ) : filteredCoffees.length === 0 ? (
          <p className="message">No coffees found.</p>
        ) : (
          <section className="coffee-grid">
            {filteredCoffees.map((coffee) => (
              <article className="coffee-card" key={coffee.id}>
                <div className="coffee-icon">☕</div>

                <h2>{coffee.name}</h2>

                <p>
                  <strong>Origin:</strong> {coffee.origin}
                </p>

                <p>
                  <strong>Roast:</strong> {coffee.roast}
                </p>

                <div className="rating">
                  ⭐ {coffee.rating.toFixed(1)}
                </div>

                <p className="votes">
                  {coffee.votes} votes
                </p>

                <button onClick={() => voteCoffee(coffee.id)}>
                  👍 Vote
                </button>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;