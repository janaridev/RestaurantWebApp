using domain.entities;
using Microsoft.EntityFrameworkCore;
using Models;

namespace infrastructure;

public class RepositoryContext : DbContext
{
    public RepositoryContext(DbContextOptions options) : base(options)
    { }

    public DbSet<CartHeader> CartHeaders { get; set; }
    public DbSet<CartDetails> CartDetails { get; set; }
}