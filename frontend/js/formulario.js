window.onload = () => {
    const qs = (selector) => document.querySelector(selector);

    const title = qs("#title");
    const rating = qs("#rating");
    const awards = qs("#awards");
    const release_date = qs("#release_date");
    const length = qs("#length");
    const movieId = qs("#movieId");
    const editar = qs("#edit");
    const crear = qs("#create");
    const eliminar = qs("#delete");
  
    const id = prompt("Colocar ID de pelicula que desea modificar o eliminar. Si desea crear una nueva película, presione Cancelar");
  
    if (id) {
        fetch(`http://localhost:3031/api/movies/${id}`)
            .then((response) => response.json())
            .then((data) => {
                let movie = data.data;
                movieId.value = movie.id;
                title.value = movie.title;
                rating.value = movie.rating;
                awards.value = movie.awards;
                release_date.value = movie.release_date.slice(0, 10);
                length.value = movie.length;
            })
            .catch((error) => {
                console.log(error);
                alert("Error");
            });
    }
  
    editar.addEventListener("click", () => {
        let editedMovie = {
            title: title.value,
            rating: rating.value,
            awards: awards.value,
            release_date: release_date.value,
            length: length.value,
        };
  
        let settings = {
            method: "PUT",
            body: JSON.stringify(editedMovie),
            headers: { "Content-Type": "application/json" }
        };
  
        let url = `http://localhost:3031/api/movies/update/${movieId.value}`;
  
        fetch(url, settings)
            .then((response) => response.json())
            .then(() => {
                alert("Se ha modificado la película con éxito");
            })
            .catch((error) => {
                console.log(error);
                alert("Error");
            });
    });
  
    crear.addEventListener("click", () => {
        let newMovie = {
            title: title.value,
            rating: rating.value,
            awards: awards.value,
            release_date: release_date.value,
            length: length.value,
        };
  
        let settings = {
            method: "POST",
            body: JSON.stringify(newMovie),
            headers: { "Content-Type": "application/json" }
        };
  
        let url = `http://localhost:3031/api/movies/create`;
  
        fetch(url, settings)
            .then((response) => response.json())
            .then(() => {
                alert("Película creada");
                if (response.ok) {
                    window.location.href = "./home.html";
                }
            })
            .catch((error) => {
                console.log(error);
            });
    });
  
    eliminar.addEventListener("click", () => {
  
        let url = `http://localhost:3031/api/movies/delete/${id}`
  
        let settings = {
            method: "DELETE",
            headers: {"Content-Type" : "application/json"}
        }

  
        fetch(url, settings)
            .then((response => console.log(response)))
            .then(() => alert("Película borrada"))
            if (response.ok) {
                window.location.href = "./home.html";
          }
    })
  }