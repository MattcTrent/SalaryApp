using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models.Models
{
    [Table(nameof(SystemParameter), Schema = "SalaryApp")]
    public class SystemParameter
    {
        public SystemParameter()
        {

        }
        [JsonConstructor]
        public SystemParameter(int id, string group, string name, decimal rate, decimal? lowerThreshold, decimal? upperThreshold)
        {
            Id = id;
            Group = group;
            Name = name;
            Rate = rate;
            LowerThreshold = lowerThreshold;
            UpperThreshold = upperThreshold;
        }

        [Key]
        public int Id { get; set; }

        [Required]
        public string Group { get; set; }

        [Required]
        public string Name { get; set; }

        [Required, Column(TypeName = "decimal(20,4)")]
        public decimal Rate { get; set; }

        [Column(TypeName = "decimal(20,4)")]
        public decimal? LowerThreshold { get; set; }

        [Column(TypeName = "decimal(20,4)")]
        public decimal? UpperThreshold { get; set; }
    }
}
