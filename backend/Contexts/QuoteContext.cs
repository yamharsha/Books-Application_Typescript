using Microsoft.EntityFrameworkCore;

namespace backend
{
    public class QuoteContext : DbContext
    {
        public QuoteContext(DbContextOptions<QuoteContext> options)
            : base(options)
        {
        }

        public DbSet<Quote> Quote { get; set; } = null!;
    }
}