namespace SistemaAcademico.Business.WebApi.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using SistemaAcademico.Business.WebApi.Models;
    using SistemaAcademico.Business.WebApi.Models.Context;
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

            #region Secretária
            AddSecretary(context, "secretaria", "secretaria@teste.com", "123456");
            #endregion

            #region Coordenadores
            AddCoordinator(context, "coordenador1", "coodenador1@teste.com", "123456");
            #endregion

            #region Cursos
            var coordinatorId = context.Coordinators.FirstOrDefault().Id;
            AddCourse(context, CourseName.CIENCIASCOMPUTACAO, coordinatorId);
            AddCourse(context, CourseName.SISTEMASINFORMACAO, coordinatorId);
            AddCourse(context, CourseName.ENGENHARIACOMPUTACAO, coordinatorId);
            #endregion

            #region Estudantes
            #region Ciências da Computação
            var computerScienceId = context.Courses.Where(x => x.Name == CourseName.CIENCIASCOMPUTACAO).FirstOrDefault().Id;
            AddStudentDb(context, "estudanteCC1", "estudante_CC-1@estudante.com", "123456", computerScienceId);
            AddStudentDb(context, "estudanteCC2", "estudante_CC-2@estudante.com", "123456", computerScienceId);
            AddStudentDb(context, "estudanteCC3", "estudante_CC-3@estudante.com", "123456", computerScienceId);
            AddStudentDb(context, "estudanteCC4", "estudante_CC-4@estudante.com", "123456", computerScienceId);
            AddStudentDb(context, "estudanteCC5", "estudante_CC-5@estudante.com", "123456", computerScienceId);
            AddStudentDb(context, "estudanteCC6", "estudante_CC-6@estudante.com", "123456", computerScienceId);
            #endregion

            #region Sistemas de Informação
            var informationSystems = context.Courses.Where(x => x.Name == CourseName.SISTEMASINFORMACAO).FirstOrDefault().Id;
            AddStudentDb(context, "estudanteSI1", "estudante_SI-1@estudante.com", "123456", informationSystems);
            AddStudentDb(context, "estudanteSI2", "estudante_SI-2@estudante.com", "123456", informationSystems);
            AddStudentDb(context, "estudanteSI3", "estudante_SI-3@estudante.com", "123456", informationSystems);
            AddStudentDb(context, "estudanteSI4", "estudante_SI-4@estudante.com", "123456", informationSystems);
            AddStudentDb(context, "estudanteSI5", "estudante_SI-5@estudante.com", "123456", informationSystems);
            AddStudentDb(context, "estudanteSI6", "estudante_SI-6@estudante.com", "123456", informationSystems);
            #endregion

            #region Engenharia da Computação
            var engineering = context.Courses.Where(x => x.Name == CourseName.ENGENHARIACOMPUTACAO).FirstOrDefault().Id;
            AddStudentDb(context, "estudanteEC1", "estudante_EC-1@estudante.com", "123456", engineering);
            AddStudentDb(context, "estudanteEC2", "estudante_EC-2@estudante.com", "123456", engineering);
            AddStudentDb(context, "estudanteEC3", "estudante_EC-3@estudante.com", "123456", engineering);
            AddStudentDb(context, "estudanteEC4", "estudante_EC-4@estudante.com", "123456", engineering);
            AddStudentDb(context, "estudanteEC5", "estudante_EC-5@estudante.com", "123456", engineering);
            AddStudentDb(context, "estudanteEC6", "estudante_EC-6@estudante.com", "123456", engineering);
            #endregion
            #endregion

            #region Disciplinas
            AddSubject(context, SubjectName.AEDS);
            AddSubject(context, SubjectName.REDES);
            AddSubject(context, SubjectName.IHC);
            AddSubject(context, SubjectName.OC);
            AddSubject(context, SubjectName.GAAL);
            AddSubject(context, SubjectName.CALCULO);
            #endregion

            #region Turmas
            AddAllSchoolClasses(context);
            #endregion

            #region Notas
            AddAllScores(context);
            #endregion
        }

        private void AddScore(ApplicationDbContext context, double value, int schoolClassId, string studentId)
        {
            if (!context.Scores.Any(x => x.Value == value && x.UserId == studentId && x.SchoolClassId == schoolClassId))
            {
                var score = new Score(studentId, schoolClassId, value);
                context.Scores.Add(score);
                context.SaveChanges();
            }
        }

        private void AddAllScores(ApplicationDbContext context)
        {        
            if (!context.Scores.Any())
            {
                foreach (var schoolClass in context.SchoolClasses.ToList())
                {
                    //Obtem 6 alunos distintos
                    var students = context.Students.OrderBy(x => Guid.NewGuid()).Take(6).ToList();

                    //Para cada estudante obtido
                    foreach (var student in students)
                    {
                        var scoreValue = new Random().Next(59, 101); //Nota entre 60 (inclusive) e 100 (inclusive)
                        var score = new Score(student.Id, schoolClass.Id, scoreValue); //Adiciona nota
                        context.Scores.Add(score);
                        schoolClass.AddStudent(student);
                        context.SaveChanges();      
                    }                    
                }                       
            }
        }

        private void AddAllSchoolClasses(ApplicationDbContext context)
        {
            if (!context.SchoolClasses.Any())
            {
                //Para cada disciplina
                foreach (var subject in context.Subjects)
                {
                    //Adiciona duas turmas - Segundo semestre 2014 e primeiro semestre 2015
                    var schoolClass1 = new SchoolClass(getSchoolNameFromSubject(subject.Name) + "2014-2", subject.Id, 50, new DateTime(2014, 7, 1), new DateTime(2014, 12, 31));
                    var schoolClass2 = new SchoolClass(getSchoolNameFromSubject(subject.Name) + "2015-1", subject.Id, 50, new DateTime(2015, 1, 1), new DateTime(2015, 6, 30));
                    
                    context.SchoolClasses.Add(schoolClass1);
                    context.SchoolClasses.Add(schoolClass2);                
                }
                context.SaveChanges();
            }
        }

        private void AddCourse(ApplicationDbContext context, string name, string coordinatorId)
        {
            if (!context.Courses.Any(x => x.Name == name))
            {
                var course = new Course(name, coordinatorId);
                context.Courses.Add(course);
                context.SaveChanges();
            }
        }

        private void AddSubject(ApplicationDbContext context, string name)
        {
            if (!context.Subjects.Any(x => x.Name == name))
            {
                var subject = new Subject(name);
                context.Subjects.Add(subject);
                context.SaveChanges();
            }
        }

        public void AddCoordinator(ApplicationDbContext context, string userName, string email, string password)
        {
            if (!context.Coordinators.Any(x => x.UserName == userName))
            {
                var userStore = new UserStore<User>(context);
                var userManager = new UserManager<User>(userStore);
                var userToInsert = new Coordinator() { UserName = userName, Email = email };
                userManager.Create(userToInsert, password);
                userManager.AddToRole(userToInsert.Id, "coordinator");
            }
        }

        private void AddSecretary(ApplicationDbContext context, string userName, string email, string password)
        {
            if (!(context.Users.Any(u => u.UserName == userName)))
            {
                var userStore = new UserStore<User>(context);
                var userManager = new UserManager<User>(userStore);
                var userToInsert = new Secretary() { UserName = userName, Email = email };
                var result = userManager.Create(userToInsert, password);
                userManager.AddToRole(userToInsert.Id, "secretary");
            }
        }

        private void AddStudentDb(ApplicationDbContext context, string userName, string email, string password, int courseId)
        {
            if (!(context.Users.Any(u => u.UserName == userName)))
            {
                var userStore = new UserStore<User>(context);
                var userManager = new UserManager<User>(userStore);
                var userToInsert = new Student(courseId) { UserName = userName, Email = email };
                var result = userManager.Create(userToInsert, password);
                if (!result.Succeeded)
                    throw new Exception("ERRO CRIACAO USUARIO: " + string.Join(",", result.Errors));
                userManager.AddToRole(userToInsert.Id, "student");
            }
        }

        public void CreateRole(ApplicationDbContext context, string role)
        {
            if (!context.Roles.Any(r => r.Name == role))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var r = new IdentityRole { Name = role };
                manager.Create(r);
            }
        }


        private string getSchoolNameFromSubject(string subjectName)
        {
            switch (subjectName)
            {
                case SubjectName.AEDS:
                    return "AED";

                case SubjectName.REDES:
                    return "RED";

                case SubjectName.IHC:
                    return "IHC";

                case SubjectName.OC:
                    return "OC";

                case SubjectName.GAAL:
                    return "GAAL";

                case SubjectName.CALCULO:
                    return "CAL";
                default:
                    return "";
            }
        }
    }

    public static class SubjectName
    {
        public const string AEDS = "Algoritmos e Estruturas de Dados";
        public const string REDES = "Redes de Computadores";
        public const string IHC = "Interação Humano Computador";
        public const string OC = "Organização de Computadores";
        public const string GAAL = "Geometria Analítica e Álgebra Linear";
        public const string CALCULO = "Cálculo Diferencial e Integral 1";
    }

    public static class CourseName
    {
        public const string CIENCIASCOMPUTACAO = "Ciências da Computação";
        public const string SISTEMASINFORMACAO = "Sistemas de Informação";
        public const string ENGENHARIACOMPUTACAO = "Engeharia da Computação";
    }
}
