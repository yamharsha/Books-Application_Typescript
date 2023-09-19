namespace backend
{
    public class QuoteDTO
    {
        public string QuoteText { get; set; } = string.Empty;
        public string Quotee { get; set; } = string.Empty;
        public string? UserId { get; set; }
        public string? Id { get; set; }
    }
}