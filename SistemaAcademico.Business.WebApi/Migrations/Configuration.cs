namespace SistemaAcademico.Business.WebApi.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
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

            #region Roles
            CreateRole(context, "student");
            CreateRole(context, "coordinator");
            CreateRole(context, "secretary");
            #endregion
   
            if (!(context.Users.Any(u => u.UserName == "teste")))
            {
                var userStore = new UserStore<User>(context);
                var userManager = new UserManager<User>(userStore);
                var userToInsert = new User { UserName = "teste", Email = "teste@teste.com" };
                userManager.Create(userToInsert, "123456");
                userManager.AddToRole(userToInsert.Id, "student");
            }

            #region Coordenadores
            AddCoordinator(context, "coordenador1", "coodenador1@teste.com", "123456");
            #endregion

            #region Cursos
            AddCourse(context, "curso1");
            AddCourse(context, "curso2");
            #endregion

            #region Estudantes
            AddStudent(context, "estudante1", "estudante1@teste.com", "123456");
            AddStudent(context, "estudante2", "estudante2@teste.com", "123456");
            AddStudent(context, "estudante3", "estudante3@teste.com", "123456");
            AddStudent(context, "estudante4", "estudante4@teste.com", "123456");
            AddStudent(context, "estudante5", "estudante5@teste.com", "123456");
            #endregion
        }


        private void AddStudent(SistemaAcademico.Business.WebApi.Models.Context.ApplicationDbContext context, string userName, string email, string password)
        {
            if (!(context.Users.Any(u => u.UserName == userName)))
            {
                var userStore = new UserStore<User>(context);
                var userManager = new UserManager<User>(userStore);
                var userToInsert = new Student(context.Courses.FirstOrDefault().Id) { UserName = userName, Email = email };
                userManager.Create(userToInsert, password);
                userManager.AddToRole(userToInsert.Id, "student");
            }
        }

        private void AddCourse(SistemaAcademico.Business.WebApi.Models.Context.ApplicationDbContext context, string name)
        {
            if(!context.Courses.Any(x => x.Name == name))
            {
                var course = new Course(name, context.Coordinators.FirstOrDefault().Id);
                context.Courses.Add(course);
                context.SaveChanges();
            }
        }

        public void AddCoordinator(SistemaAcademico.Business.WebApi.Models.Context.ApplicationDbContext context, string userName, string email, string password)
        {
            if(!context.Coordinators.Any(x => x.UserName == userName))
            {
                var userStore = new UserStore<User>(context);
                var userManager = new UserManager<User>(userStore);
                var userToInsert = new Coordinator() { UserName = userName, Email = email };
                userManager.Create(userToInsert, password);
                userManager.AddToRole(userToInsert.Id, "coordinator");
            }
        }


        public void CreateRole(SistemaAcademico.Business.WebApi.Models.Context.ApplicationDbContext context, string role)
        {
            if (!context.Roles.Any(r => r.Name == role))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var r = new IdentityRole { Name = role };
                manager.Create(r);
            }
        }
    }
}
