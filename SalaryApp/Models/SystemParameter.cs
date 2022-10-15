using SalaryApp.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SalaryApplication.Models
{
    [Table(nameof(SystemParameter), Schema = "SalaryApp")]
    public class SystemParameter : BaseEntity
    {
        public string Name { get; set; } = string.Empty;

        public string Group { get; set; } = string.Empty;

        public string Value { get; set; } = string.Empty;

        public string? SecondValue { get; set; } = string.Empty;
    }
}
