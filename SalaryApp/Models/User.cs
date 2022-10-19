using Microsoft.AspNetCore.Identity;
using SalaryApplication.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SalaryApp.Models
{
    [Table(nameof(User), Schema = "SalaryApp")]
    public class User
    {
        [Key]
        public int Id { get; set; }

        public int UserName { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        [Column(TypeName = "decimal(20,5)")]
        public decimal Salary { get; set; }

        public int pension { get; set; }
    }
}
