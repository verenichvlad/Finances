using System;
using System.Collections.Generic;
using Finances.Models;

namespace Finances.Services.ConvertToTransactionStrategy
{
    public class CsvConvertToTransactionsStrategy : IConvertToTransactionsStrategy
    {
        private readonly string[] _lines;
        private readonly User _user;

        public CsvConvertToTransactionsStrategy(string[] lines, User user)
        {
            _lines = lines;
            _user = user;
        }

        public List<Transaction> Convert()
        {
            List<string> transactionLines = new List<string>();
            bool findLineHeaders = false;

            foreach (string line in _lines)
            {
                if (line.Contains("#Saldo końcowe;")) break;

                if (!findLineHeaders)
                    findLineHeaders = line.Contains("#Data operacji;#Data księgowania;#Opis operacji;#Tytuł;#Nadawca/Odbiorca;#Numer konta;#Kwota;#Saldo po operacji;");
                else
                    transactionLines.Add(line);
            }


            List<Transaction> list = new List<Transaction>();
            foreach (var transactionLine in transactionLines)
            {
                if(transactionLine.Trim().IsNorE())
                    continue;
                string[] items = transactionLine.Split(new char[] {';'}, StringSplitOptions.RemoveEmptyEntries);
                list.Add(new Transaction
                {
                    Amount = items[6].Replace(" ", string.Empty).ToVal<decimal>(0.00m),
                    CreationDate = items[0].ToVal<DateTime>(DateTime.Now),
                    Description = string.Empty,
                    Title = items[3].ToStr(),
                    TransactionType = GetTransactionTypeByStr(items[2].ToStr().Trim()),
                    User = _user
                });
            }
            return list;
        }

        public TransactionType GetTransactionTypeByStr(string type)
        {
            switch (type)
            {
                case "ZAKUP PRZY UŻYCIU KARTY":
                case "OPŁATA ZA KARTĘ":
                case "PRZELEW WEWNĘTRZNY WYCHODZĽCY":
                case "ZAKUP KARTĽ Z WYPŁATĽ GOTÓWKI":
                case "PRZELEW ZEWNĘTRZNY WYCHODZĄCY":
                case "PRZELEW MTRANSFER WYCHODZACY":
                case "PRZELEW ZEWNĘTRZNY WYCHODZĽCY":
                case "PODATEK OD ODSETEK KAPITAŁOWYCH":
                case "WYPŁATA W BANKOMACIE":
                    return TransactionType.BankOut;

                case "PRZELEW WEWNĘTRZNY PRZYCHODZĽCY":
                case "KAPITALIZACJA ODSETEK":
                case "PRZELEW ZEWNĘTRZNY PRZYCHODZĽCY":
                    return TransactionType.BankIn;
            }
            throw new Exception("Unable to cast transaction type");
        }
    }
}
