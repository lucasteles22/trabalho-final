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

        public int CourseId { get; private set; }
        public virtual Course Course { get; private set; }

        #region ctor
        protected Student()
        { }

        public Student(int courseId)
        {
            this.CourseId = courseId;
            this.Scores = new List<Score>();
        }
        #endregion

    }
}