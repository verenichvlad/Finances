using System;
using System.Collections.Generic;
using System.IO;
using Finances.Models;

namespace Finances.Services
{
    public class TransactionImportService
    {
        public List<Transaction> ImportTransactions()
        {
            return null;
        }
    }




    public interface IImportStrategy
    {
        List<Transaction> Import();
    }

    /// <summary>
    /// The 'Strategy' abstract class
    /// </summary>
    public abstract class ImportStrategy : IImportStrategy
    {
        public abstract List<Transaction> Import();
    }

    /// <summary>
    /// CSVImportStrategy
    /// </summary>
    public class CSVImportStrategy : ImportStrategy
    {
        public string FIleCSV { get; private set; }
        public CSVImportStrategy(string fileCSV)
        {
            FIleCSV = fileCSV;
        }

        public override List<Transaction> Import()
        {
            //   0                  1                2            3       4               5            6       7
            //"#Data operacji;#Data księgowania;#Opis operacji;#Tytuł;#Nadawca/Odbiorca;#Numer konta;#Kwota;#Saldo po operacji;
            //2016 - 03 - 14; 2016 - 03 - 15; OPŁATA ZA KARTĘ; "4056 XXXX XXXX 6533"; "  "; ''; -6,00; 4,12;
            //2016 - 04 - 03; 2016 - 04 - 03; PRZELEW WEWNĘTRZNY PRZYCHODZĄCY; "NE TRAĆ WSE ZRAZU."; "VLADYSLAV VERENICH  UL.JUDYMA 48                       20-716 LUBLIN"; '80000020040000340000086369'; 200,00; 214,12;
            //2016 - 04 - 04; 2016 - 04 - 04; PRZELEW WEWNĘTRZNY WYCHODZĄCY; "LBL001420855"; "NEXTBIKE POLSKA SP. Z O.O. POZNAŃ  "; '45114011240000290291001006'; -10,00; 204,12;
            //2016 - 04 - 08; 2016 - 04 - 08; ZAKUP KARTĄ Z WYPŁATĄ GOTÓWKI; "Freshmarket Z8361  /Lublin                                            DATA TRANSAKCJI: 2016-04-05"; "  "; ''; -105,98; 319,84;
            //2016 - 04 - 10; 2016 - 04 - 10; PRZELEW ZEWNĘTRZNY WYCHODZĄCY; "PRZELEW ŚRODKÓW"; "IAROSLAV SADOVSKI  "; '30105000031000000000121684'; -300,00; 19,84;
            //2016 - 04 - 12; 2016 - 04 - 13; OPŁATA ZA KARTĘ; "4056 XXXX XXXX 6533"; "  "; ''; -6,00; 13,84;

            string[] line = File.ReadAllLines(FIleCSV);
            List<string> lineTransaction = new List<string>();
            bool findLineHeaders = false;
            for (int i = 0; i < line.Length; i++)
            {
                if (line[i].Contains("#Saldo końcowe;"))
                    break;
                if (!findLineHeaders)
                    findLineHeaders = line[i].Contains("#Data operacji;#Data księgowania;#Opis operacji;#Tytuł;#Nadawca/Odbiorca;#Numer konta;#Kwota;#Saldo po operacji;");
                else
                {
                    lineTransaction.Add(line[i]);
                }
            }
            List<Transaction> tlist = new List<Transaction>();
            foreach(var item in lineTransaction)
            {
                string[] items = item.Split(new char[]{';'}, StringSplitOptions.RemoveEmptyEntries);
                Transaction tnew = new Transaction();
                tnew.Amount = item[6].ToVal<decimal>(0.00m);
                tnew.CreationDate = item[0].ToVal<DateTime>(DateTime.Now);
                tnew.Description = string.Empty;
                tnew.Title = item[3].ToStr();
                tnew.TransactionType = GetTransactionTypeByStr(item[2].ToStr().Trim());
                tnew.User = null;
                tlist.Add(tnew);
            }
            return tlist;
        }

        public TransactionType GetTransactionTypeByStr(string type)
        {
            switch (type)
            {
                case "OPŁATA ZA KARTĘ":
                    return TransactionType.BankOut;
                case "PRZELEW WEWNĘTRZNY PRZYCHODZĄCY":
                    return TransactionType.BankIn;
                case "PRZELEW WEWNĘTRZNY WYCHODZĄCY":
                    return TransactionType.BankOut;
                case "ZAKUP KARTĄ Z WYPŁATĄ GOTÓWKI":
                    return TransactionType.UserOut;
                case "PRZELEW ZEWNĘTRZNY WYCHODZĄCY":
                    return TransactionType.UserOut;
            }
            throw new Exception("Error cast TransactionType.");
        }
    }

    /// <summary>
    /// A 'ConcreteStrategy' class
    /// </summary>
    public class ConcreteStrategyB : ImportStrategy
    {
        public override List<Transaction> Import()
        {
            Console.WriteLine("Called ConcreteStrategyB.AlgorithmInterface()");
            return null;
        }
    }

    /// <summary>
    /// A 'ConcreteStrategy' class
    /// </summary>
    public class ConcreteStrategyC : ImportStrategy
    {
        public override List<Transaction> Import()
        {
            Console.WriteLine("Called ConcreteStrategyC.AlgorithmInterface()");
            return null;
        }
    }
}