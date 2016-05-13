using System.Collections.Generic;
using Finances.Models;

namespace Finances.Services.ConvertToTransactionStrategy
{
    public class TxtConvertToTransactionsStrategy : IConvertToTransactionsStrategy
    {
        public TxtConvertToTransactionsStrategy(string fileTxt)
        {

        }

        public List<Transaction> Convert()
        {
            return null;
        }
    }
}
