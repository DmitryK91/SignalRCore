using System;
using Microsoft.EntityFrameworkCore;
using Models;

namespace DBRepository {
    public class RepositoryContext : DbContext {
        public RepositoryContext (DbContextOptions<RepositoryContext> options) : base (options) {
            Database.EnsureCreated ();
        }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Message> Messages { get; set; }
    }
}