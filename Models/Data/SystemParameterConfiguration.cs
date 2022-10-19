using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Models.Models;
using System.Reflection.Emit;

namespace Models.Data
{
    public class SystemParameterConfiguration : IEntityTypeConfiguration<SystemParameter>
    {
        public void Configure(EntityTypeBuilder<SystemParameter> builder)
        {
            _ = builder.HasData(
                    new SystemParameter()
                    {
                        Id = 1,
                        Group = "Tax",
                        Name = "Basic",
                        Rate = 20.00m,
                        LowerThreshold = 12570.00m,
                        UpperThreshold = 50570.00m
                    },
                    new SystemParameter()
                    {
                        Id = 2,
                        Group = "Tax",
                        Name = "Higher",
                        Rate = 40.00m,
                        LowerThreshold = 50570.00m,
                        UpperThreshold = 150000.00m
                    },
                    new SystemParameter()
                    {
                        Id = 3,
                        Group = "Tax",
                        Name = "Additional",
                        Rate = 45.00m,
                        LowerThreshold = 150000.00m,
                        UpperThreshold = null
                    },
                    new SystemParameter()
                    {
                        Id = 4,
                        Group = "NI",
                        Name = "Basic",
                        Rate = 13.25m,
                        LowerThreshold = 12576.00m,
                        UpperThreshold = 50268.00m
                    },
                    new SystemParameter()
                    {
                        Id = 5,
                        Group = "NI",
                        Name = "Additional",
                        Rate = 3.25m,
                        LowerThreshold = 50268.00m,
                        UpperThreshold = null
                    },
                    new SystemParameter()
                    {
                        Id = 6,
                        Group = "Student Finance",
                        Name = "Plan 1",
                        Rate = 9.00m,
                        LowerThreshold = 19895.00m,
                        UpperThreshold = null
                    },
                    new SystemParameter()
                    {
                        Id = 7,
                        Group = "Student Finance",
                        Name = "Plan 2",
                        Rate = 9.00m,
                        LowerThreshold = 27275.00m,
                        UpperThreshold = null
                    }
                );
        }
    }
}
