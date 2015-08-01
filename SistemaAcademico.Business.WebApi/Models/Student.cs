using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SistemaAcademico.Business.WebApi.Models
{
    /// <summary>
    /// Aluno
    /// </summary>
    public class Student : User
    {
        public virtual ICollection<Score> Scores { get; private set; }

        public virtual ICollection<SchoolClass> SchoolClasses { get; private set; }

        public int CourseId { get; set; }
        public virtual Course Course { get; set; }

        #region ctor
        //TODO: Refatorar no codigo para criar um objeto do tipo Student com construtuor. Para isso, deverá alterar a classe pai.
        //protected Student()
        //{ }

        public Student()
        {
            //this.CourseId = courseId;
            this.Scores = new List<Score>();
        }
        #endregion
    }
}