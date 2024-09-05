using Microsoft.EntityFrameworkCore;
using SFN.Socafan.Common.Models;

namespace SFN.Socafan.Database.DataAccess
{
    public class SFNDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Entry> Entries { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<GamePlay> Games { get; set; }

        public SFNDbContext()
        {

        }

        public SFNDbContext(DbContextOptions<SFNDbContext> options) : base(options)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=SFN_DEV.db");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasKey(a => a.IdUser);

            modelBuilder.Entity<User>()
                .HasMany(p => p.Answers)
                .WithOne(b => b.User)
                .HasForeignKey(b => b.IdUser);

            // Configure Entry entity
            modelBuilder.Entity<Entry>()
                .HasKey(a => a.IdEntry);

            modelBuilder.Entity<Entry>()
                .HasMany(a => a.Answers)
                .WithOne(b => b.Entry)
                .HasForeignKey(b => b.IdEntry);

            // Configure Entry entity
            modelBuilder.Entity<GamePlay>()
                .HasKey(a => a.IdGamePlay);

            modelBuilder.Entity<GamePlay>()
                .HasMany(a => a.Answers)
                .WithOne(b => b.Game)
                .HasForeignKey(b => b.IdGamePlay);

            // Configure Answer entity
            modelBuilder.Entity<Answer>()
                .HasKey(b => b.IdAnswer);

            modelBuilder.Entity<Answer>()
                .HasOne(b => b.Entry)
                .WithMany(a => a.Answers)
                .HasForeignKey(b => b.IdEntry);

            modelBuilder.Entity<Answer>()
                .HasOne(b => b.User)
                .WithMany(p => p.Answers)
                .HasForeignKey(b => b.IdUser);

            modelBuilder.Entity<Answer>()
                .HasOne(b => b.Game)
                .WithMany(p => p.Answers)
                .HasForeignKey(b => b.IdGamePlay);
        }

    }
}
