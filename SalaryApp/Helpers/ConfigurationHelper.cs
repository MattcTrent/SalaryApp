namespace SalaryApplication.Helpers
{
    public class ConfigurationHelper
    {
        public static IConfiguration GetConfiguration()
        {
            IConfigurationBuilder builder = new ConfigurationBuilder();
            _ = builder.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

            return builder.Build();
        }
    }
}
