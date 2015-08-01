namespace SistemaAcademico.Business.WebApi.Migrations
{
    using Microsoft.AspNet.Identity;
    using SistemaAcademico.Business.WebApi.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<SistemaAcademico.Business.WebApi.Models.Context.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(SistemaAcademico.Business.WebApi.Models.Context.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
            var passwordHash = new PasswordHasher();
            string defaultPassword = passwordHash.HashPassword("123456");

            context.Coordinators.AddOrUpdate(x => x.UserName, new Coordinator() { UserName = "coord", Email = "coord@teste.com", PasswordHash = defaultPassword });
            context.SaveChanges();

            context.Courses.AddOrUpdate(x => x.Name, new Course("Ciência da Computação", context.Coordinators.First().Id ) );
        }
    }
}
