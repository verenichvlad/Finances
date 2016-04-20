using System.Collections.Generic;
using Finances.Models;

namespace Finances.Services
{
    public interface ITransactionImportService
    {
        bool ImportTransactions(string fileName, User user);
    }
}
