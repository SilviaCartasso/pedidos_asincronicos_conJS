window.onload = async () => {
  const app = document.getElementById("root");
  const forButton = document.getElementById("forButton");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  // Aqui debemos agregar nuestro fetch
  const response = await fetch("http://localhost:3031/api/movies");
  const peliculas = await response.json();
  console.log(peliculas);


  /* Codigo que debemos usar para mostrar los datos en el frontend*/
  let data = peliculas.data;

  data.forEach((movie) => {
    const card = document.createElement("div");
    card.setAttribute("class", "card");

    const h1 = document.createElement("h1");
    h1.textContent = movie.title;

    const p = document.createElement("p");
    p.textContent = `Rating: ${movie.rating}`;

    const duracion = document.createElement("p");
    duracion.textContent = `Duración: ${movie.length}`;

    const star = document.createElement("i");
    star.setAttribute("class", "fa-regular fa-star");
    star.setAttribute("data-movieID", movie.id);

    h1.appendChild(star);
    star.addEventListener("click", () => {
      const favoriteMovie = {
        id: star.getAttribute("data-movieID"),
        title: movie.title,
        rating: movie.rating,
        length: movie.length,
      };

      let favoriteMovies = [];

      const storedFavoriteMovies = localStorage.getItem("favoriteMovies");
      if (storedFavoriteMovies) {
        favoriteMovies = JSON.parse(storedFavoriteMovies);
      }

      const movieIndex = favoriteMovies.findIndex(
        (movie) => movie.id === favoriteMovie.id
      );

      if (movieIndex === -1) {
        favoriteMovies.push(favoriteMovie);
        star.classList.add("star-selected");
      } else {
        favoriteMovies.splice(movieIndex, 1);
        star.classList.remove("star-selected");
      }
      console.log(favoriteMovies);

      localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
    });

    container.appendChild(card);
    card.appendChild(h1);
    card.appendChild(p);
    if (movie.genre !== null) {
      const genero = document.createElement("p");
      genero.textContent = `Genero: ${movie.genre.name}`;
      card.appendChild(genero);
    }
    card.appendChild(duracion);
  });

  const storedFavoriteMovies = localStorage.getItem("favoriteMovies");
  console.log(storedFavoriteMovies.includes("id"))
  if (storedFavoriteMovies.includes("id") ) {
    const buttonFav = document.createElement("button");
    buttonFav.setAttribute("class", "favorites botonFavoritos");
    const aFav = document.createElement("a");
    aFav.textContent = "Mis películas favoritas";
    aFav.setAttribute("href", "./favoritas.html");
    forButton.appendChild(buttonFav);
    buttonFav.appendChild(aFav)
  }

  
};
