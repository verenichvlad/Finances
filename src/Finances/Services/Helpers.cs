using System;

namespace Finances.Services
{
    public static class Helper
    {
        public static void WriteInOutput(string mark, string info)
        {
            Console.WriteLine(mark + " " + info ?? "-");
        }

        public static bool IsNorE(this string str)
        {
            return string.IsNullOrEmpty(str);
        }

        public static bool IsNullOrDbNull(this object obj)
        {
            return obj == null || Convert.IsDBNull(obj);
        }

        public static string FormatAsAmount(decimal amount)
        {
            string format = "### ### ### ###.00";
            if (amount > 0.00m)
                return amount.ToString(format);
            else
                if (amount < 0.00m)
            {
                decimal a = Math.Abs(amount);
                return "-" + a.ToString(format).Trim();
            }
            else
                return "0.00";
        }

        public static TGet? ValOrNull<TGet>(this object obj, TGet val) where TGet : struct
        {
            if (obj == null) return null;
            return val;
        }

        public static T ToVal<T>(this object obj, T def_value) where T : struct
        {
            return obj.ToVal<T>() ?? def_value;
        }

        public static T? ToVal<T>(this object obj) where T : struct
        {
            if (IsNullOrDbNull(obj)) return null;
            if (string.IsNullOrEmpty(obj.ToString())) return null;

            Type type_dst = typeof(T);
            Type type_src = obj.GetType();

            if (obj is T)
                return (T)obj;
            else if (type_dst == typeof(DateTime))
            {
                DateTime dt;
                bool ok = DateTime.TryParse(obj.ToStr(), out dt);
                return ok ? (T?)(object)dt : null;
            }
            else if ((type_dst == typeof(decimal) || type_dst == typeof(double) || type_dst == typeof(float) ||
                             type_dst == typeof(int) || type_dst == typeof(short) || type_dst == typeof(byte)) &&
                             type_src == typeof(string))
                return (T)Convert.ChangeType(TryGetDecimal(obj as string), type_dst);
            else if (type_dst.IsEnum)
                return (T)Convert.ChangeType(obj, typeof(int));
            else
                return (T)Convert.ChangeType(obj, type_dst);
        }

        private static bool IsNumeric(Type t)
        {
            TypeCode tc = Type.GetTypeCode(t);
            return (tc == TypeCode.Byte || tc == TypeCode.Decimal || tc == TypeCode.Double ||
                    tc == TypeCode.Int16 || tc == TypeCode.Int32 || tc == TypeCode.Int64 || tc == TypeCode.Single ||
                    tc == TypeCode.UInt16 || tc == TypeCode.UInt32 || tc == TypeCode.UInt64);
        }

        public static object TryGetValue(string str_val, Type type_dest)
        {
            if (IsNullOrDbNull(str_val)) return null;
            if (string.IsNullOrEmpty(str_val)) return null;


            if (IsNumeric(type_dest))
            {
                decimal? dec_val = TryGetDecimal(str_val);
                if (dec_val == null) return null;
                return Convert.ChangeType(dec_val, type_dest);
            }
            else if (type_dest == typeof(DateTime))
                return TryGetDateTime(str_val);
            else if (type_dest == typeof(string))
                return str_val;
            else
                throw new NotImplementedException("TryGetValue from string");
        }

        public static int? TryGetInt(string val)
        {
            return (int?)TryGetDecimal(val);
        }

        public static decimal? TryGetDecimal(string val)
        {
            if (IsNullOrDbNull(val)) return null;
            if (string.IsNullOrEmpty(val)) return null;

            string s_val = val.Replace(",", ".");
            decimal dec_val = 0.00m;
            System.Globalization.NumberStyles num_style = System.Globalization.NumberStyles.AllowDecimalPoint |
                                                          System.Globalization.NumberStyles.AllowLeadingSign;

            if (decimal.TryParse(s_val, num_style, System.Globalization.CultureInfo.InvariantCulture, out dec_val))
                return (decimal)dec_val;
            else
                return null;
        }

        public static DateTime? TryGetDateFromYYMMDD(string str_date)
        {
            if (string.IsNullOrEmpty(str_date) || str_date.Length != 6) return null;

            int? y = TryGetInt(str_date.Substring(0, 2));
            int? m = TryGetInt(str_date.Substring(2, 2));
            int? d = TryGetInt(str_date.Substring(4, 2));
            if (y == null || m == null || d == null) return null;
            return new DateTime((int)(2000 + y.Value), (int)m.Value, (int)d.Value);
        }

        public static DateTime? TryGetDateFromYYYYMMDD(string str_date)
        {
            if (string.IsNullOrEmpty(str_date) || str_date.Length != 8) return null;

            int? y = TryGetInt(str_date.Substring(0, 4));
            int? m = TryGetInt(str_date.Substring(4, 2));
            int? d = TryGetInt(str_date.Substring(6, 2));
            if (y == null || m == null || d == null) return null;
            return new DateTime((int)(y.Value), (int)m.Value, (int)d.Value);
        }

        public static DateTime? TryGetDateTime(string str_val)
        {
            if (IsNullOrDbNull(str_val)) return null;
            if (string.IsNullOrEmpty(str_val)) return null;

            DateTime dt = DateTime.MinValue;
            if (DateTime.TryParse(str_val, out dt))
                return dt;
            else
                return null;
        }

        public static string ToStr(this object obj)
        {
            if (IsNullOrDbNull(obj)) return string.Empty;
            if (string.IsNullOrEmpty(obj.ToString())) return string.Empty;
            return obj.ToString();
        }

        public static string ToStr(this object obj, string def)
        {
            if (IsNullOrDbNull(obj)) return def;
            if (string.IsNullOrEmpty(obj.ToString())) return def;
            return obj.ToString();
        }

        public static bool IsNull(this object obj)
        {
            return obj == null;
        }
    }

}