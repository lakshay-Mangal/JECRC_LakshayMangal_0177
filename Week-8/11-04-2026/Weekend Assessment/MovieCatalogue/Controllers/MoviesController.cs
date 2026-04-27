using Microsoft.AspNetCore.Mvc;
using MovieCatalogue.Models.DTOs;
using MovieCatalogue.Models.Entities;

namespace MovieCatalogue.Controllers
{
[Route("api/[Controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private static List<Movies> movies = new();


        //Insert new movie
        [HttpPost]
        public IActionResult CreateMovie(CreateMovieDto createMovieDto)
        {
          
                var newmovie = new Movies()
            {
                Id = Guid.NewGuid(),
                Name = createMovieDto.Name,
                ReleaseYear = createMovieDto.ReleaseYear,
                Length = createMovieDto.Length,
                Language = createMovieDto.Language
            };
            movies.Add(newmovie);

           return CreatedAtAction(nameof(CreateMovie), newmovie);
        }

        [HttpGet]
        public IActionResult GetAllMovies()
        {
            var moviesList = movies.Select(m => new DisplayMoviesDto
            {
                Id = m.Id,
                Name = m.Name,
                ReleaseYear = m.ReleaseYear,
                Length = m.Length,
                Language = m.Language
            }).ToList();

            return Ok (moviesList);
        }

        [HttpGet("{id}")]
        public IActionResult GetMovieById(Guid id)
        {
            var movie = movies.FirstOrDefault(m => m.Id == id);

            if (movie == null)
                return NotFound("This Movie does not exist in the Database");

            return Ok(movie);
        }

        [HttpGet("/name/{name}")]
        public IActionResult GetMovieByName(String name)
        {
            var movie = movies.FirstOrDefault(m => m.Name == name);

            if (movie == null)
                return NotFound("This Movie does not exist in the Database");

            return Ok(movie);
        }

        [HttpDelete]
        public IActionResult DeleteMovieById (Guid id)
        {
            var movie = movies.FirstOrDefault(m => m.Id == id);
            if (movie == null) return NotFound("Operation Could not be Completed! This movie does not exist in the database");

            movies.Remove(movie);

            return Ok("Movie deleted Sucessfully");
        }

        [HttpPatch("{id}")]
       public IActionResult PatchMovieLength(Guid id, decimal length )
        {
            var movie = movies.FirstOrDefault(m => m.Id == id);

            if (length != null) movie.Length = length;

            return Ok(movie);
            
        }


        [HttpPut]
        public IActionResult PutMovie (Guid id, UpdateMovieDto dto)
        {
            var movie = movies.FirstOrDefault(m => m.Id == id);

            if (dto.Name != null) movie.Name = dto.Name;
            if (dto.Length != 0) movie.Length = dto.Length;
            if (dto.Language != null) movie.Language = dto.Language;
            if (dto.ReleaseYear != 0) movie.ReleaseYear = dto.ReleaseYear;

            return Ok(movie);
        }


    }
}
