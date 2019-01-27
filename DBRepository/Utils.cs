using System;
using Models;

namespace DBRepository
{
    public static class Utils
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="State">1 - OK; 0 - Ошибка</param>
        /// <param name="ex"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        public static Result GetResult(bool State = false, Exception ex = null, object data = null)
        {
            return new Result
            {
                State = State,
                Error = ex == null ? string.Empty : ex.Message,
                Data = data
            };
        }
    }
}
