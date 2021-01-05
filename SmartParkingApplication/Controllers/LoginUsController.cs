using SmartParkingApplication.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
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
                var data = db.Users.Where(s => s.Account.UserName.Equals(username) && s.Account.PassWord.Equals(password) && s.Account.RoleID != 1).ToList();
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
        public ActionResult CheckCode()
        {
            return View();

        }
        [HttpPost]
        [AllowAnonymous]
        public ActionResult CheckCode(string checkCode, string emailUser)
        {
            var data = db.Users.Where(s => s.email == emailUser).FirstOrDefault();
            if (checkCode == "Aa@1234")
            {
                Account acc = db.Accounts.Find(data.AccountID);
                acc.PassWord = "Aa@1234";
                Update(acc);
            }
            else
            {
                ViewBag.mes = "Mã code sai.Nhập lại mã code";
                return View();
            }
            return View("Index");

        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult Forgot(string emailUser)
        {
            var data = db.Users.Where(s => s.email == emailUser).FirstOrDefault();
           
            if(data == null)
            {
                ViewBag.mes = "Tài khoản không tồn tại trong hệ thống";
                return View();
            }
            else{
               
                
                    string subject = "Yêu cầu đổi mật khẩu";
                    string body = "Mã code của bạn là: Aa@1234";
                    string checkCode = "Aa@1234";

                    WebMail.Send(emailUser, subject, body, null, null, null, true, null, null, null, null, null, null);

                    ViewBag.mes = "Gửi mail thành công.Bạn kiểm tra mã Code tại gmail";

                    return RedirectToAction("CheckCode", "LoginUs",new { checkCode,emailUser });


            }
           

        }
        
        
       
     
        public JsonResult Update(Account account)
        {
            if (ModelState.IsValid)
            {
                db.Entry(account).State = EntityState.Modified;
                db.SaveChanges();
            }

            return Json(account, JsonRequestBehavior.AllowGet);
        }
    }
}