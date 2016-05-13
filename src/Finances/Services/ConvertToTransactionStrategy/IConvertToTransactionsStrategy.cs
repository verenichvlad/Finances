using System.Collections.Generic;
using Finances.Models;

namespace Finances.Services.ConvertToTransactionStrategy
{
    public interface IConvertToTransactionsStrategy
    {
        List<Transaction> Convert();
    }
}
