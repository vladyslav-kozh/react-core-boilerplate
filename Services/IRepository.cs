using React_Template.Models;

namespace React_Template.Services
{
    public interface IRepository
    {
        public User Auth(LoginModel login);
        public void Register(LoginModel login);
        public User Get(string email);
    }
}
