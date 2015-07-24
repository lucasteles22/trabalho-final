using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace SistemaAcademico.Business.WebApi.Models.Mapping
{
    public class CourseMapping : EntityTypeConfiguration<Course>
    {
        public CourseMapping()
        {
            ToTable("Courses");

            HasKey(x => x.Id)
                .Property(x => x.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            Property(x => x.Name)
                .IsRequired()
                .HasMaxLength(100);


            HasRequired(x => x.Coordinator)
                .WithMany(p => p.Courses)
                .HasForeignKey(x => x.UserId)
                .WillCascadeOnDelete(true);

            Property(x => x.UserId)
                .HasColumnName("UserId");
        }
    }
}