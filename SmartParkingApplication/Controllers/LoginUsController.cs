using SmartParkingApplication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace SmartParkingApplication.Controllers
{
    public class LoginUsController : Controller
    {
        private SmartParkingsEntities db = new SmartParkingsEntities();
        // GET: LoginUs
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(string username, string password)
        {
            if (ModelState.IsValid)
            {
                var data = db.Users.Where(s => s.Account.UserName.Equals(username) && s.Account.PassWord.Equals(password)).ToList();
                if (data.Count() > 0)
                {
                    string name = data.FirstOrDefault().Account.UserName; 
                    //add session
                    Session["UserName"] = data.FirstOrDefault().Account.UserName;
                    Session["Name"] = data.FirstOrDefault().Name;
                    Session["idAccount"] = data.FirstOrDefault().AccountID;
                    FormsAuthentication.SetAuthCookie(name, false);
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                   ModelState.AddModelError ("","Đăng nhập lỗi ");
                   return RedirectToAction("Index", "LoginUs");
                }
            }
            return View();
        }

        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Index", "LoginUS");
        }
        public ActionResult ll()
        {
            return View();
        }
    public ActionResult Forgot (){
            return View();

        }

    }
}