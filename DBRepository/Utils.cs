using System;
using Models;

namespace DBRepository
{
    public static class Utils
    {
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
