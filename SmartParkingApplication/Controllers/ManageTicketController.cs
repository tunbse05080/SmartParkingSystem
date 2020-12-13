using SmartParkingApplication.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SmartParkingApplication.Controllers
{
    public class ManageTicketController : Controller
    {
        // GET: ManageTicket
        private SmartParkingsEntities db = new SmartParkingsEntities();
        // GET: ManageUser
        public ActionResult Index()
        {
           return View();
        }

        //load list monthly ticket
        public JsonResult LoadData()
        {

            var ticket = from t in db.MonthlyTickets
                         join c in db.Cards on t.CardID equals c.CardID into table1
                         from c in table1.DefaultIfEmpty()
                         orderby t.MonthlyTicketID
                         select new { t.MonthlyTicketID, t.CusName, t.IdentityCard, t.Phone, t.Email, t.TypeOfVehicle, t.LicensePlates, t.RegisDate, t.ExpiryDate, c.CardNumber};

            List<Object> list = new List<object>();
            foreach (var item in ticket)
            {
                var regisDate = item.RegisDate.Value.ToString("dd/MM/yyyy");
                var expiryDate = item.ExpiryDate.Value.ToString("dd/MM/yyyy");
                var expiryDateES = item.ExpiryDate.Value.ToString("yyyy/MM/dd");
                string typeOfVehicle = string.Empty;
                switch (item.TypeOfVehicle)
                {
                    case 0:
                        typeOfVehicle = "Xe máy";
                        break;
                    case 1:
                        typeOfVehicle = "Ô tô";
                        break;
                }
                var tr = new
                {
                    MonthlyTicketID = item.MonthlyTicketID,
                    CusName = item.CusName,
                    IdentityCard = item.IdentityCard,
                    Phone = item.Phone,
                    Email = item.Email,
                    typeOfVehicle,
                    LicensePlates = item.LicensePlates,
                    RegisDate = regisDate,
                    ExpiryDate = expiryDate,
                    CardNumber = item.CardNumber,
                    ExpiryDateES = expiryDateES,
                };
                
                list.Add(tr);
            }
            var total = list.Count();
            return Json(new { dataTicket = list, total }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Create(MonthlyTicket ticket)
        {
            if (ModelState.IsValid)
            {
                db.MonthlyTickets.Add(ticket);
                db.SaveChanges();
            }

            return Json(ticket, JsonRequestBehavior.AllowGet);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        public JsonResult TicketDetails(int id)
        {
            var ticket = db.MonthlyTickets.Find(id);
            var typeOfVehicle = "";
            switch (ticket.TypeOfVehicle)
            {
                case 0:
                    typeOfVehicle = "Xe máy";
                    break;
                case 1:
                    typeOfVehicle = "Ô tô";
                    break;
            }
            var RegisDate = ticket.RegisDate.Value.ToString("MM/dd/yyyy");
            var ExpiryDate = ticket.ExpiryDate.Value.ToString("MM/dd/yyyy");
            var result = new { ticket.MonthlyTicketID, ticket.CusName, ticket.IdentityCard, ticket.Phone, ticket.Email, typeOfVehicle, RegisDate, ExpiryDate, ticket.LicensePlates, cardId = ticket.CardID, cardNumber = ticket.Card.CardNumber, ticket.TypeOfVehicle };
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateTicket(MonthlyTicket ticket)
        {
            //MonthlyTicket ticket = GetTicket(data);
            if (ModelState.IsValid)
            {
                db.Entry(ticket).State = EntityState.Modified;
                db.SaveChanges();
            }
            return Json(ticket, JsonRequestBehavior.AllowGet);
        }

        //Create MonthlyIncomeStatement
        public JsonResult CreateMonthlyIncome(int id,string totalPrice)
        {
            string[] temp = totalPrice.Split(' ');
            int price = Convert.ToInt32(temp[0].Replace(",", string.Empty));
            MonthlyIncomeStatement monthlyIncome = new MonthlyIncomeStatement { MonthlyTicketID = id, TotalPrice = price };
            if (ModelState.IsValid)
            {
                db.MonthlyIncomeStatements.Add(monthlyIncome);
                db.SaveChanges();
            }
            return Json(monthlyIncome, JsonRequestBehavior.AllowGet);
        }

        //public MonthlyTicket GetTicket(MonthlyTicket ticket)
        //{
        //    var data = db.Cards.Where(c => c.CardNumber.Equals(ticket.CardID));
        //    MonthlyTicket result = null;
        //    foreach (var item in data)
        //    {
        //        result = new MonthlyTicket { MonthlyTicketID = ticket.MonthlyTicketID, CusName = ticket.CusName, Email = ticket.Email, Phone = ticket.Phone, RegisDate = ticket.RegisDate, ExpiryDate = ticket.ExpiryDate, LicensePlates = ticket.LicensePlates, IdentityCard = ticket.IdentityCard, TypeOfVehicle = ticket.TypeOfVehicle, CardID = item.CardID };
        //    }
        //    return result;
        //}

        //public JsonResult GetIdCardFromNumber(string CardNumber)
        //{

        //    var result = db.Cards.Where(c => c.CardNumber.Equals(CardNumber)).Select(c => c.CardID);
        //    return Json(result, JsonRequestBehavior.AllowGet);
        //}

        //Xuat file Exel Ticket
        public ActionResult XuatFileExel()
        {

            var MonthlyTicketUser = db.MonthlyTickets.ToList();
            var parking = db.ParkingPlaces.ToList();
           // var role = db.Roles.ToList();
            var alluser = new GridView();
            //===================================================
            DataTable dt = new DataTable();
            //Add Datacolumn
            DataColumn workCol = dt.Columns.Add("Tên chủ thẻ", typeof(String));

            dt.Columns.Add("Số CMND", typeof(String));
            dt.Columns.Add("Số điện thoại", typeof(String));
            dt.Columns.Add("Email", typeof(String));
            dt.Columns.Add("Loại xe", typeof(String));
            dt.Columns.Add("Ngày đăng kí", typeof(String));
            dt.Columns.Add("Ngày hết hạn", typeof(String));
          
            // them ngay gia han

            //Add in the datarow


            foreach (var item in MonthlyTicketUser)
            {
                DataRow newRow = dt.NewRow();
                // newRow["Họ tên"] = item.UserName;
                //newRow["Phòng ban"] = item.email;
                //newRow["Chức vụ"] = item.ParkingPlace.NameOfParking;
                //newRow["Học vấn"] = item.Name;
                //newRow["Chuyên ngành"] = item.UserAddress;
                string typeVehicle = "";
                switch (item.TypeOfVehicle)
                {
                    case 0:
                        typeVehicle = "Xe Máy";
                        break;
                    case 1:
                        typeVehicle = "Ô tô";
                        break;
                }
                newRow["Tên chủ thẻ"] = item.CusName;
                newRow["Số CMND"] = item.IdentityCard;
                newRow["Số điện thoại"] = item.Phone;
                newRow["Email"] = item.Email;
                newRow["Loại xe"] = typeVehicle;
                newRow["Ngày đăng kí"] = item.RegisDate;
                newRow["Ngày hết hạn"] = item.ExpiryDate;
                //newRow["Số CMND"] = item.IdentityCard;
                //// newRow["Ngày ký HĐ"] = item.UserName;
                //// newRow["Ngày hết HĐ"] = item.UserName;
                //newRow["Ngày Ký HĐ"] = item.ContractSigningDate;
                //newRow["Ngày Hết HĐ"] = item.ContractExpirationDate;
                //newRow["Ngày Gia hạn"] = item.ContractRenewalDate;
                //newRow["Chức vụ"] = item.Role.RoleName;
                //newRow["Bãi làm việc"] = item.ParkingPlace.NameOfParking;
                // newRow["Số CMND"] = item.UserName;
                //full fesh

                dt.Rows.Add(newRow);
            }

            //====================================================
            alluser.DataSource = dt;
            // gv.DataSource = ds;
            alluser.DataBind();

            Response.ClearContent();
            Response.Buffer = true;

            Response.AddHeader("content-disposition", "attachment; filename=danh-sach.xls");
            Response.ContentType = "application/ms-excel";

            Response.Charset = "";
            StringWriter objStringWriter = new StringWriter();
            HtmlTextWriter objHtmlTextWriter = new HtmlTextWriter(objStringWriter);

            alluser.RenderControl(objHtmlTextWriter);

            Response.Output.Write(objStringWriter.ToString());
            Response.Flush();
            Response.End();
            return Redirect("/ManageTicket");
        }

        public JsonResult ComboboxTicket()
        {
            var typeOfVehicles = new { motobike = "Xe máy", car = "Ô tô" };
            var numberCards = from c in db.Cards
                              where c.Status == 0
                              select new { c.CardNumber,c.CardID };
            return Json( new { numberCards , typeOfVehicles } , JsonRequestBehavior.AllowGet);
        }

        //get price of monthly ticket base on typeOfVehicle
        public JsonResult GetPriceMonthly(int typeOfVehicle)
        {
            var result = (from p in db.Prices
                         where p.TypeOfvehicle == typeOfVehicle
                         select new { p.MonthPrice }).FirstOrDefault();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

    }

}