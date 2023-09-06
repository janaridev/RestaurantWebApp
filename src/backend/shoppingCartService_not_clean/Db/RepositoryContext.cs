using Microsoft.EntityFrameworkCore;
using Models;

namespace Db;

public class RepositoryContext : DbContext
{
    public RepositoryContext(DbContextOptions options) : base(options)
    { }

    public DbSet<CartHeader> CartHeaders { get; set; }
    public DbSet<CartDetails> CartDetails { get; set; }
}