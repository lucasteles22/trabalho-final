using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace SistemaAcademico.Business.WebApi.Models.Mapping
{
    public class SchoolClassMapping : EntityTypeConfiguration<SchoolClass>
    {
        public SchoolClassMapping()
        {
            ToTable("SchoolClasses");

            HasKey(x => x.Id)
                .Property(x => x.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            Property(x => x.Name)
                .IsRequired()
                .HasMaxLength(100);

            Property(x => x.Capacity)
                .IsRequired();

            Property(x => x.StarDate)
                .HasColumnType("Date")
                .IsRequired();

            Property(x => x.EndDate)
                .HasColumnType("Date")
                .IsRequired();

            HasRequired(x => x.Subject)
                .WithMany(u => u.SchoolClasses)
                .HasForeignKey(x => x.SubjectId)
                .WillCascadeOnDelete(true);
        }
    }
}