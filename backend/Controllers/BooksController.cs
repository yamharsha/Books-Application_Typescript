using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend;
using shortid;
using shortid.Configuration;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BooksController : Controller
    {
        private readonly BooksContext _booksContext;
        public BooksController(BooksContext booksContext)
        {
            _booksContext = booksContext;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> getBooks()
        {
            return Ok(await _booksContext.Book.ToListAsync());
        }
        [HttpPost, Authorize]
        public async Task<ActionResult<Book>> PostNewBook(BookDTO bookRequest)
        {

            var options = new GenerationOptions(length: 10);
            string uniqueId = ShortId.Generate(options);

            Book newBook = new Book
            {
                Title = bookRequest.Title,
                Author = bookRequest.Author,
                publishDate = bookRequest.publishDate,
                Id = uniqueId,
            };

            _booksContext.Book.Add(newBook);
            await _booksContext.SaveChangesAsync();

            return Ok(newBook);
        }
        [HttpDelete("{id}"), Authorize]
        public async Task<ActionResult<Book>> DeleteBook(string id)
        {
            var bookItem = await _booksContext.Book.FindAsync(id);
            if (bookItem == null)
            {
                return NotFound("book not Found");
            }

            _booksContext.Book.Remove(bookItem);
            await _booksContext.SaveChangesAsync();
            var response = new { Message = "Book Deleted", DeletedItem = bookItem };
            return Ok(response);
        }
        [HttpPut("{id}"), Authorize]
        public async Task<IActionResult> UpdateBook(string id, BookDTO bookRequest)
        {
            if (id != bookRequest.Id)
            {
                return BadRequest();
            }

            var bookItem = await _booksContext.Book.FindAsync(id);
            if (bookItem == null)
            {
                return NotFound("Book not found");
            }

            bookItem.Title = bookRequest.Title;
            bookItem.Author = bookRequest.Author;
            bookItem.publishDate = bookRequest.publishDate;


            try
            {
                await _booksContext.SaveChangesAsync();
                var response = new { Message = "Book Edited", EditedItem = bookRequest };
                return Ok(response);
            }
            catch (DbUpdateConcurrencyException) when (!BookItemExists(id))
            {
                if (!BookItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
        }
        private bool BookItemExists(string id)
        {
            return _booksContext.Book.Any(e => e.Id == id);
        }
    }
}