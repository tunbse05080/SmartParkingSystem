using SmartParkingApplication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Helpers;
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
                var data = db.Users.Where(s => s.Account.UserName.Equals(username) && s.Account.PassWord.Equals(password)&& s.Account.RoleID != 1).ToList();
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
                    ViewBag.ErrorMessage = "Đăng nhập lỗi";

                   
                    //ViewBag.ErrorMessage = "Đăng nhập lỗi";
                }
                
            }
            return RedirectToAction("Index");
        }

        public ActionResult Logout()
        {
            Session.Clear();
            FormsAuthentication.SignOut();
            return RedirectToAction("Index", "LoginUS");
        }
        public ActionResult ll()
        {
            return View();
        }
        
        public ActionResult Forgot()
        {
            return View();
        }
        [HttpPost][AllowAnonymous]
    public ActionResult Forgot (string emailUser){
            string subject = "Yêu cầu đổi mật khẩu";
            string body = "Mật khẩu mới là: Aa@1234";

            WebMail.Send(emailUser, subject, body, null, null, null, true, null, null, null, null, null, null);
            ViewBag.mes = "Gửi mail thành công.Bạn vào kiểm tra mật khẩu tại gmail";

            return View();

        }


    }
}