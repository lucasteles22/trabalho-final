using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace SistemaAcademico.Business.WebApi.Models.Mapping
{
    public class ScoreMapping : EntityTypeConfiguration<Score>
    {
        public ScoreMapping()
        {
            ToTable("Scores");

            HasRequired(x => x.SchoolClass)
                .WithMany(u => u.Scores)
                .HasForeignKey(x => x.SchoolClassId)
                .WillCascadeOnDelete(true);

            HasRequired(x => x.Student)
                .WithMany(p => p.Scores)
                .HasForeignKey(x => x.UserId)
                .WillCascadeOnDelete(true);

            Property(x => x.UserId)
                .HasColumnName("UserId");
        }
    }
}