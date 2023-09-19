namespace backend
{
    public class BookDTO
    {
        public string Title { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public string publishDate { get; set; } = string.Empty;
        public string? Id { get; set; }
    }
}