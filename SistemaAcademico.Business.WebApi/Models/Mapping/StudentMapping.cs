using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace SistemaAcademico.Business.WebApi.Models.Mapping
{
    public class StudentMapping : EntityTypeConfiguration<Student>
    {
        public StudentMapping()
        {
            ToTable("Students");

            HasRequired(x => x.Course)
                .WithMany(s => s.Students)
                .HasForeignKey(x => x.CourseId)
                .WillCascadeOnDelete(true);
        }
    }
}