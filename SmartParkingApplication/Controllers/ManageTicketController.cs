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
        public JsonResult LoadData(string nameT, int pageTicket, int pageSizeTicket = 5)
        {

            //var ticket = from t in db.MonthlyTickets
            //             join c in db.Cards on t.CardID  equals c.CardID into table1
            //             from c in table1.DefaultIfEmpty()
            //             join p in db.ParkingPlaces on t.ParkingPlaceID equals p.ParkingPlaceID into table2
            //             from p in table2.DefaultIfEmpty()   
            //             orderby t.MonthlyTicketID
            //             select new { t.MonthlyTicketID, t.CusName, t.IdentityCard, t.Phone, t.Email, t.TypeOfVehicle, t.LicensePlates, t.RegisDate, t.ExpiryDate, c.CardNumber , p.NameOfParking };
            var ticket = from t in db.MonthlyTickets select new { t.MonthlyTicketID, t.CusName, t.IdentityCard, t.Phone, t.Email, t.TypeOfVehicle, t.LicensePlates, t.RegisDate, t.ExpiryDate };
            if (!string.IsNullOrEmpty(nameT))
            {
                ticket = ticket.Where(x => x.CusName.Contains(nameT));
            }

            List<Object> list = new List<object>();
            foreach (var item in ticket)
            {
                var regisDate = item.RegisDate.Value.ToString("dd/MM/yyyy HH:mm:ss tt");
                var expiryDate = item.ExpiryDate.Value.ToString("dd/MM/yyyy HH:mm:ss tt");
                string typeOfVehicle = string.Empty;
                switch (item.TypeOfVehicle)
                {
                    case 0:
                        typeOfVehicle = "Xe máy";
                        break;
                    case 1:
                        typeOfVehicle = "Ô tô";
                        break;
                    case 2:
                        typeOfVehicle = "Máy bay";
                        break;
                    case 3:
                        typeOfVehicle = "Tàu hỏa";
                        break;
                }
                //var tr = new { MonthlyTicketID = item.MonthlyTicketID, CusName = item.CusName, IdentityCard = item.IdentityCard, Phone = item.Phone, Email = item.Email, TypeOfVehicle = item.TypeOfVehicle,
                //    LicensePlates = item.LicensePlates, RegisDate = regisDate, ExpiryDate = expiryDate ,
                //    CardNumber = item.CardNumber,
                //    NameOfParking = item.NameOfParking
                //};
                var tr = new { MonthlyTicketID = item.MonthlyTicketID, CusName = item.CusName, IdentityCard = item.IdentityCard, Phone = item.Phone, Email = item.Email, TypeOfVehicle = typeOfVehicle, LicensePlates = item.LicensePlates, RegisDate = regisDate, ExpiryDate = expiryDate };
                list.Add(tr);
            }

            var totalRowTicket = ticket.Count();
            //ticket = ticket.Skip((pageTicket - 1) * pageSizeTicket).Take(pageSizeTicket);
            ticket = ticket.OrderByDescending(x => x.MonthlyTicketID).Skip((pageTicket - 1) * pageSizeTicket).Take(pageSizeTicket);

            return Json(new { dataTicket = list, total = totalRowTicket }, JsonRequestBehavior.AllowGet);
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
            if (ticket.TypeOfVehicle == 0)
            {
                typeOfVehicle = "Xe máy";
            }
            if (ticket.TypeOfVehicle == 1)
            {
                typeOfVehicle = "Ô tô";
            }

            var RegisDate = ticket.RegisDate.Value.ToString("dd/MM/yyyy");
            var ExpiryDate = ticket.ExpiryDate.Value.ToString("dd/MM/yyyy");
            var result = new { ticket.MonthlyTicketID, ticket.CusName, ticket.IdentityCard, ticket.Phone, ticket.Email, typeOfVehicle, RegisDate, ExpiryDate };
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateTicket(MonthlyTicket ticket)
        {
            if (ModelState.IsValid)
            {
                db.Entry(ticket).State = EntityState.Modified;
                db.SaveChanges();
            }
            return Json(ticket, JsonRequestBehavior.AllowGet);
        }

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

                newRow["Tên chủ thẻ"] = item.CusName;
                newRow["Số CMND"] = item.IdentityCard;
                newRow["Số điện thoại"] = item.Phone;
                newRow["Email"] = item.Email;
                newRow["Loại xe"] = item.TypeOfVehicle;
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
    }
}