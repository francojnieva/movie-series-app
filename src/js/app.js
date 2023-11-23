// MENÚ MÓVIL - TABLET
const btnMenu = document.querySelector("#btnMenu")
const sidebar = document.querySelector("#sidebar")
const imgMenu = document.querySelector("#imgMenu")
const imgCloseMenu = document.querySelector("#imgCloseMenu")

btnMenu.addEventListener("click", () => {
  sidebar.classList.toggle("-left-full")
  sidebar.classList.add('-left-0')
  imgMenu.classList.toggle("hidden")
  imgCloseMenu.classList.toggle("hidden")
})

// CHANGE THEME: LIGHT OR DARK
const btnChangeTheme = document.querySelector("#btnChangeTheme")
const imgSun = document.querySelector("#imgSun")
const imgMoon = document.querySelector("#imgMoon")

btnChangeTheme.addEventListener("click", () => {
  imgSun.classList.toggle("hidden")
  imgMoon.classList.toggle("hidden")
  document.documentElement.classList.toggle("dark")
})

// MOVIES - API
const moviesContainer = document.querySelector("#movies-container")
const moviesTop = document.querySelector("#moviesTop")
const moviesPopular = document.querySelector("#moviesPopular")
const moviesUpcoming = document.querySelector("#moviesUpcoming")
const titleCategory = document.querySelector("#titleCategory")
const searchInput = document.querySelector("#searchInput")

const urlMoviePopular = "https://api.themoviedb.org/3/movie/popular"
const urlMovieTopRated = "https://api.themoviedb.org/3/movie/top_rated"
const urlMovieUpcoming = "https://api.themoviedb.org/3/movie/upcoming"
const apiKey = ''
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZGZkYjA3MDA4YTQ2NDE5OWNjYmM3NzJjY2EzMjU0ZiIsInN1YiI6IjY1NWRmYmEwZDM5OWU2MDBjYjQ4NWYxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7BZNKzO2SZQSjiD8O2LMBHLIxz9gF1qjUKvyz3fL9j8'
  }
}

async function getMovies(url, options, totalPages) {
  try {
    const pagesToShow = Math.min(totalPages, 5)

    for (let page = 1; page <= pagesToShow; page++) {
      const response = await fetch(`${url}?language=en-US&page=${page}`, options)
      if (!response.ok) {
        throw new Error()
      }
      const data = await response.json()
      const movies = data.results
    movies.forEach((movie) => {
      const { title, poster_path, vote_average, release_date } = movie
      const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`
      const cardMovies = document.createElement("div")
      cardMovies.innerHTML = `
	  	<div class="card w-36 bg-base-100 shadow-lg image-full md:w-40 md:mb-3 xl:w-48 hover:cursor-pointer">
	  		<figure><img src="${imageUrl}" alt="${title}" /></figure>
	  		<div class="card-body py-3 px-2 flex justify-between">
		  		<div class="space-y-4">
			  		<h2 class="card-title text-[.9rem] font-bold lg:text-base xl:text-xl">${title}</h2>
			  		<div class="badge badge-secondary text-sm font-medium lg:text-base xl:text-lg py-3">${vote_average.toFixed(1)}</div>
			  		<p class="text-xs xl:text-sm">${release_date.split('-')[0]}</p>
		  		</div>
		  		<div>
			  		<img class="icon-[material-symbols--add-circle-rounded] text-3xl text-white" role="img" aria-hidden="true" />
		  		</div>
	  		</div>
  		</div>
        `
        moviesContainer.appendChild(cardMovies)
        cardMovies.addEventListener('click', () => ShowInfoMovie(movie))
    })}
    } catch (error) {
    console.error("Error en la solicitud:", error)
    const errorMessage = document.createElement("div")
    errorMessage.innerHTML = "Hubo un error al cargar las películas.<br> Por favor, intenta nuevamente."
    errorMessage.classList.add('text-red-600')
    moviesContainer.appendChild(errorMessage)
    }
}

async function getTotalPages(url, options) {
  try {
    const response = await fetch(`${url}?language=en-US`, options)
    if (!response.ok) {
      throw new Error()
    }
    const data = await response.json()
    getMovies(url, options, data.total_pages)

  } catch (error) {
    console.error("Error en la solicitud:", error)
    const errorMessage = document.createElement("p")
    errorMessage.innerHTML = "Hubo un error al cargar las películas.<br> Por favor, intenta nuevamente."
    errorMessage.classList.add('text-red-600', 'text-center')
    moviesContainer.appendChild(errorMessage)
  }
}

getTotalPages(urlMoviePopular, options)

function changeCategory(element, title, category, url, options) {
  element.addEventListener('click', () => {
    title.textContent = `${category}`
    moviesContainer.innerHTML = ''
    getTotalPages(url, options)
  })
}

changeCategory(moviesTop, titleCategory , 'Top Ranking', urlMovieTopRated, options)
changeCategory(moviesUpcoming, titleCategory , 'Estrenos', urlMovieUpcoming, options)

function ShowInfoMovie(movie) {
    moviesContainer.innerHTML = ''
    const { title, overview, vote_average, release_date} = movie
    const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
  
    const movieDetails = document.createElement("div")
    movieDetails.innerHTML = `
        <div class="flex flex-col items-center mt-3 lg:flex-row lg:px-6 lg:pt-4">
            <img src="${imageUrl}" alt="${title}" class="w-40 mb-4 lg:w-52 xl:w-64">
            <div class="space-y-3 px-5 text-white dark:text-gray-900">
                <h2 class="text-2xl font-bold lg:text-3xl">${title}</h2>
                <p class="text-md ">${overview}</p>
                <p class="text-md font-bold ">Año: ${release_date.split('-')[0]}</p>
                <p class="text-md font-bold ">Puntuación: ${vote_average.toFixed(1)}</p>
            </div>
        </div>
        `
    moviesContainer.appendChild(movieDetails)
}