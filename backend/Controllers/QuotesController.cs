using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend;
using System.Security.Claims;
using shortid;
using shortid.Configuration;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class QuotesController : Controller
    {
        private readonly QuoteContext _quoteContext;
        public static User user = new User();
        public QuotesController(QuoteContext quoteContext)
        {
            _quoteContext = quoteContext;
        }
        [HttpGet, Authorize]
        public async Task<ActionResult<IEnumerable<Quote>>> getQuotes()
        {

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            return Ok(await _quoteContext.Quote.Where(quote => quote.UserId == userId).ToListAsync());
        }
        [HttpPost, Authorize]
        public async Task<ActionResult<Quote>> PostNewQuote(QuoteDTO quoteRequest)
        {

            var options = new GenerationOptions(length: 10);
            string uniqueId = ShortId.Generate(options);

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            Quote newQuote = new Quote
            {
                QuoteText = quoteRequest.QuoteText,
                Quotee = quoteRequest.Quotee,
                UserId = userId,
                Id = uniqueId,
            };

            _quoteContext.Quote.Add(newQuote);
            await _quoteContext.SaveChangesAsync();

            return Ok(newQuote);
        }
        [HttpDelete("{id}"), Authorize]
        public async Task<ActionResult<Quote>> DeleteQuote(string id)
        {
            var quoteItem = await _quoteContext.Quote.FindAsync(id);
            if (quoteItem == null)
            {
                return NotFound("Quote not Found");
            }

            _quoteContext.Quote.Remove(quoteItem);
            await _quoteContext.SaveChangesAsync();
            var response = new { Message = "Quote Deleted", DeletedItem = quoteItem };
            return Ok(response);
        }

        [HttpPut("{id}"), Authorize]
        public async Task<ActionResult<Quote>> EditQuote(string id, Quote updatedQuote)
        {
            if (id != updatedQuote.Id)
            {
                return BadRequest();
            }

            var quoteItem = await _quoteContext.Quote.FindAsync(id);
            if (quoteItem == null)
            {
                return NotFound("Quote not Found");
            }

            quoteItem.QuoteText = updatedQuote.QuoteText;
            quoteItem.Quotee = updatedQuote.Quotee;

            try
            {
                await _quoteContext.SaveChangesAsync();
                var response = new { Message = "Quote Edited", EditedQuote = updatedQuote };
                return Ok(response);
            }
            catch (DbUpdateConcurrencyException) when (quoteItem.Id == id)
            {
                return BadRequest("Db error");
            }
        }
    }
}