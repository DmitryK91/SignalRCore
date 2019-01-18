using System;
using Models;

namespace DBRepository
{
    public static class Utils
    {
        public static Result GetResult(bool State = false, Exception ex = null)
        {
            return new Result
            {
                State = State,
                Error = ex.Message
            };
        }
    }
}
