using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SistemaAcademico.Business.WebApi.Models
{
    /// <summary>
    /// Turma
    /// </summary>
    public class SchoolClass
    {
        public int Id { get; private set; }
        /// <summary>
        /// Formato: MAT2012-1 | AED2011-2 -> Sigla + ano + semestre
        /// </summary>
        public string Name { get; private set; }
        public int Capacity { get; private set; }
        public DateTime StarDate { get; private set; }
        public DateTime EndDate { get; private set; }
        public ICollection<Student> Students { get; private set; }
        public ICollection<Score> Scores { get; private set; }

        public int SubjectId { get; private set; }
        public virtual Subject Subject { get; private set; }


        #region ctor
        protected SchoolClass()
        { }

        public SchoolClass(string name, int subjectId, int capacity, DateTime startDate, DateTime endDate)
        {
            this.Name = name;
            this.SubjectId = subjectId;
            this.Capacity = capacity;
            this.StarDate = startDate;
            this.EndDate = endDate;
            this.Students = new List<Student>();
            this.Scores = new List<Score>();
        }
        #endregion

        public void AddStudent(Student student)
        {
            this.Students.Add(student);
        }

        public void AddScore(Score score)
        {
            this.Scores.Add(score);
        }
    }
}