using Microsoft.AspNetCore.Mvc;
using TodoApi.Data;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [Route("api/todo")] 
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly TodoContext _context;

        public TodoController(TodoContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetTodos()
        {
            var todos = _context.Todos.ToList();
            return Ok(todos);
        }

        [HttpGet("{id}")]
        public IActionResult GetTodo(int id)
        {
            var todo = _context.Todos.Find(id);
            if (todo == null) return NotFound();

            return Ok(todo);
        }

        [HttpPost]
        public IActionResult AddTodo(Todo todo)
        {
            _context.Todos.Add(todo);
            _context.SaveChanges();
            return Ok(todo);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTodo(int id, Todo updatedTodo)
        {
            var todo = _context.Todos.Find(id);
            if (todo == null) return NotFound();

            todo.Title = updatedTodo.Title;
            todo.IsCompleted = updatedTodo.IsCompleted;
            todo.Priority = updatedTodo.Priority; // Added for Priority feature

            _context.SaveChanges();
            return Ok(todo);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTodo(int id)
        {
            var todo = _context.Todos.Find(id);
            if (todo == null) return NotFound();

            _context.Todos.Remove(todo);
            _context.SaveChanges();

            return NoContent();
        }

        // Search tasks [cite: 112]
        [HttpGet("Search/{title}")]
        public IActionResult SearchTodo(string title)
        {
            if (string.IsNullOrEmpty(title))
                return BadRequest("Title cannot be null or empty");

            var todos = _context.Todos
                               .Where(t => t.Title != null && t.Title.Contains(title))
                               .ToList();

            if (!todos.Any())
                return NotFound();

            return Ok(todos);
        }
    }
}