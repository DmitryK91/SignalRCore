using System;
using Microsoft.EntityFrameworkCore;
using Models;

namespace DBRepository {
    public class RepositoryContext : DbContext
    {
        public RepositoryContext (DbContextOptions<RepositoryContext> options) : base (options)
        {
            Database.EnsureCreated ();
        }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}