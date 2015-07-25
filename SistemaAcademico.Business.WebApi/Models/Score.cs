using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SistemaAcademico.Business.WebApi.Models
{
    /// <summary>
    /// Nota
    /// </summary>
    public class Score
    {
        public int Id { get; private set; }

        public double Value { get; private set; }

        public string UserId { get; private set; }
        public virtual Student Student { get; private set; }

        public int ClassId { get; private set; }
        public virtual SchoolClass SchoolClass { get; private set; }

        #region ctor
        protected Score()
        { }

        public Score(string userId, int classId, double value)
        {
            this.UserId = userId;
            this.ClassId = classId;
            this.Value = value;
        }
        #endregion

        #region public methods
        public void UpdateValue(double newValue)
        {
            this.Value = newValue;
        }
        #endregion
    }
}