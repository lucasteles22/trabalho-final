using Microsoft.AspNet.Identity.EntityFramework;
using SistemaAcademico.Business.WebApi.Models.Mapping;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Data.Entity.Infrastructure.Annotations;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;

namespace SistemaAcademico.Business.WebApi.Models.Context
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext()
            : base("SistemaAcademico", throwIfV1Schema: false)
        { }

        public DbSet<Secretary> Secretaries { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Coordinator> Coordinators { get; set; }
        public DbSet<Score> Scores { get; set; }
        public DbSet<SchoolClass> SchoolClasses { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Course> Courses { get; set; }

        protected override void OnModelCreating(System.Data.Entity.DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            #region Remove convenções
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
            modelBuilder.Conventions.Remove<ManyToManyCascadeDeleteConvention>();
            #endregion

            #region Convenção varchar
            modelBuilder.Properties<string>()
                .Configure(p => p.HasColumnType("varchar"));

            modelBuilder.Properties<string>()
                .Configure(p => p.HasMaxLength(256));
            #endregion

            #region Tabelas de usuários
            modelBuilder.Entity<User>().ToTable("Users").Property(x => x.Id).HasColumnName("UserId");
            modelBuilder.Entity<User>().Property(x => x.Email).IsRequired().HasMaxLength(256).HasColumnAnnotation("Index", new IndexAnnotation(new IndexAttribute("IX_Email") { IsUnique = true }));
            modelBuilder.Entity<User>().Property(x => x.UserName).IsRequired().HasMaxLength(256).HasColumnAnnotation("Index", new IndexAnnotation(new IndexAttribute("IX_Username") { IsUnique = true }));
            modelBuilder.Entity<IdentityUserRole>().ToTable("UserRoles").Property(x => x.UserId).HasColumnName("UserId");
            modelBuilder.Entity<IdentityUserLogin>().ToTable("UserLogins").Property(x => x.UserId).HasColumnName("UserId");
            modelBuilder.Entity<IdentityUserClaim>().ToTable("UserClaims").Property(x => x.UserId).HasColumnName("UserId");
            modelBuilder.Entity<IdentityRole>().ToTable("Roles");
            #endregion

            #region -- Model Mapping --
            modelBuilder.Configurations.Add(new CoordinatorMapping());
            modelBuilder.Configurations.Add(new StudentMapping());
            modelBuilder.Configurations.Add(new SecretaryMapping());
            modelBuilder.Configurations.Add(new ScoreMapping());
            modelBuilder.Configurations.Add(new SchoolClassMapping());
            modelBuilder.Configurations.Add(new SubjectMapping());
            modelBuilder.Configurations.Add(new CourseMapping());
            #endregion
        }
        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}