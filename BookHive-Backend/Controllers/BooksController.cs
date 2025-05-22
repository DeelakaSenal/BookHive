using Microsoft.AspNetCore.Mvc;
using BookHive_Backend.Models;
using BookHive_Backend.Services;

namespace BookHive_Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly BookService _bookService;

        public BooksController(BookService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Book>> GetAll()
        {
            var books = _bookService.GetAll();
            return Ok(books);
        }

        [HttpGet("{id}")]
        public ActionResult<Book> GetById(int id)
        {
            var book = _bookService.GetById(id);
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }

        [HttpPost]
        public ActionResult<Book> Create([FromBody] Book book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdBook = _bookService.Add(book);
            return CreatedAtAction(nameof(GetById), new { id = createdBook.Id }, createdBook);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Book book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!_bookService.Update(id, book))
            {
                return NotFound();
            }
            return Ok(new { message = "Book updated successfully" });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (!_bookService.Delete(id))
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
