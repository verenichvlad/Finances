using System;
using System.Collections.Generic;
using System.IO;
using Finances.Models;
using Finances.Services.ConvertToTransactionStrategy;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;

namespace Finances.Services
{
    public class TransactionImportService : ITransactionImportService
    {
        private IConvertToTransactionsStrategy _convertStrategy;
        private IHostingEnvironment _env;
        private IFinancesRepo _repo;

        public TransactionImportService(IHostingEnvironment env, IFinancesRepo repo)
        {
            _env = env;
            _repo = repo;
        }

        public bool ImportTransactions(string fileName, User user)
        {
            var fileBody = GetFileBody(fileName);

            switch (Path.GetExtension(fileName))
            {
                case ".csv": _convertStrategy = new CsvConvertToTransactionsStrategy(fileBody, user); break;
                default: _convertStrategy = new CsvConvertToTransactionsStrategy(fileBody, user); break;
            }
            var transactions = _convertStrategy.Convert();
            if(transactions.Count > 0) _repo.AddTransactions(transactions);
            return _repo.SaveAll();
        }

        private string[] GetFileBody(string filename)
        {
            string filePath = $"{_env.WebRootPath}\\uploads\\{filename}";
            return System.IO.File.ReadAllLines(filePath);
        }
    }
}