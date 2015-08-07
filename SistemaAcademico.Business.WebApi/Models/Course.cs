using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SistemaAcademico.Business.WebApi.Models
{
    public class Course
    {
        public int Id { get; private set; }

        public string Name { get; private set; }

        public string UserId { get; private set; }
        public virtual Coordinator Coordinator { get; private set; }

        //public virtual ICollection<Subject> Subjects { get; private set; }
        public virtual ICollection<Student> Students { get; private set; }

        #region ctor
        protected Course()
        { }

        public Course(string name, string coordinatorId)
        {
            this.Name = name;
            this.UserId = coordinatorId;
            //this.Subjects = new List<Subject>();
            this.Students = new List<Student>();
        }
        #endregion
    }
}