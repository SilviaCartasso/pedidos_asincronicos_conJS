window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  let favorite = JSON.parse(localStorage.getItem("favoriteMovies"));

  if (favorite === null || favorite.length === 0) {
    const card = document.createElement("div");
    card.setAttribute("class", "card");

    const message = document.createElement("p");
    message.textContent = "Aún no hay películas favoritas";

    container.appendChild(card);
    card.appendChild(message);
  } else {  

    favorite.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null && movie.genre !== undefined) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);
    });
  }
  }