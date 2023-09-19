namespace backend
{
    public class User
    {
        public string Username { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public byte[]? PasswordHash { get; set; }
        public byte[]? PasswordSalt { get; set; }
    }
}