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
    //[Authorize(Roles = "Quản lý")]
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
            var total = 0;
            List<Object> list = new List<object>();
            try
            {
                var ticket = from t in db.MonthlyTickets
                             join c in db.Cards on t.CardID equals c.CardID into table1
                             from c in table1.DefaultIfEmpty()
                             orderby t.MonthlyTicketID
                             select new { t.MonthlyTicketID, t.CusName, t.IdentityCard, t.Phone, t.Email, t.TypeOfVehicle, t.LicensePlates, t.RegisDate, t.ExpiryDate, c.CardNumber };

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
                total = list.Count();
            }
            catch (Exception)
            {
                return Json("LoadFalse", JsonRequestBehavior.AllowGet);
            }
            return Json(new { dataTicket = list, total }, JsonRequestBehavior.AllowGet);
        }
        
        //check license plate exist or not if not exist update info monthly ticket
        [HttpPost]
        public JsonResult CheckExistLicensePlatesToUpdate(MonthlyTicket monthlyTicket)
        {
            var check = true;
            try
            {
                var result = (from m in db.MonthlyTickets
                              where m.LicensePlates == monthlyTicket.LicensePlates && m.ParkingPlaceID == monthlyTicket.ParkingPlaceID
                              select new { m.LicensePlates }).FirstOrDefault();
                var result2 = (from m in db.MonthlyTickets
                               where m.MonthlyTicketID == monthlyTicket.MonthlyTicketID
                               select new { m.LicensePlates }).FirstOrDefault();
                var cardID = (from m in db.MonthlyTickets
                              where m.MonthlyTicketID == monthlyTicket.MonthlyTicketID
                              select new { m.CardID }).FirstOrDefault();
                Card card = db.Cards.Find(cardID.CardID);

                if (result == null || result2.LicensePlates == monthlyTicket.LicensePlates)
                {
                    if (cardID.CardID != monthlyTicket.CardID)
                    {
                        card.Status = 0;
                    }
                    else
                    {
                        card.Status = 1;
                    }
                    UpdateOldCard(card);
                    UpdateTicket(monthlyTicket);
                    check = false;
                }
            }
            catch (Exception)
            {
                return Json("UpdateFalse", JsonRequestBehavior.AllowGet);
            }
            return Json(check, JsonRequestBehavior.AllowGet);
        }

        //check license plate exist or not if not exist add monthly ticket
        [HttpPost]
        public JsonResult CheckExistLicensePlatesToAdd(MonthlyTicket monthlyTicket)
        {
            var check = true;
            MonthlyTicket ticket = new MonthlyTicket();
            try
            {
                var result = (from m in db.MonthlyTickets
                              where m.LicensePlates == monthlyTicket.LicensePlates && m.ParkingPlaceID == monthlyTicket.ParkingPlaceID
                              select new { m.LicensePlates }).FirstOrDefault();

                if (result == null)
                {
                    ticket = Create(monthlyTicket);
                    check = false;
                }
            }
            catch (Exception)
            {
                return Json("AddFalse", JsonRequestBehavior.AllowGet);
            }
            return Json(new { check, ticket.MonthlyTicketID }, JsonRequestBehavior.AllowGet);
        }

        public MonthlyTicket Create(MonthlyTicket ticket)
        {
            if (ModelState.IsValid)
            {
                db.MonthlyTickets.Add(ticket);
                db.SaveChanges();
            }

            return ticket;
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
            try
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
                var result = new { ticket.MonthlyTicketID, ticket.CusName, ticket.IdentityCard, ticket.Phone, ticket.Email, typeOfVehicle, RegisDate, ExpiryDate, ticket.LicensePlates, cardId = ticket.CardID, cardNumber = ticket.Card.CardNumber, ticket.TypeOfVehicle, ticket.ParkingPlaceID, ticket.ParkingPlace.NameOfParking };
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json("LoadFalse", JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult UpdateTicket(MonthlyTicket ticket)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    db.Entry(ticket).State = EntityState.Modified;
                    db.SaveChanges();
                }
            }
            catch (Exception)
            {
                return Json("UpdateFalse", JsonRequestBehavior.AllowGet);
            }

            return Json(ticket, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public void UpdateOldCard(Card card)
        {
            if (ModelState.IsValid)
            {
                db.Entry(card).State = EntityState.Modified;
                db.SaveChanges();
            }
        }

        //Create MonthlyIncomeStatement
        [HttpPost]
        public JsonResult CreateMonthlyIncome(int id, string totalPrice)
        {
            try
            {
                string[] temp = totalPrice.Split(' ');
                int price = Convert.ToInt32(temp[0].Replace(",", string.Empty));
                MonthlyIncomeStatement monthlyIncome = new MonthlyIncomeStatement { MonthlyTicketID = id, TotalPrice = price, PaymentDate = DateTime.Now };
                if (ModelState.IsValid)
                {
                    db.MonthlyIncomeStatements.Add(monthlyIncome);
                    db.SaveChanges();
                }
                return Json(monthlyIncome, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json("AddFalse", JsonRequestBehavior.AllowGet);
            }
        }

        //Xuat file Exel Ticket
        public ActionResult XuatFileExel()
        {
            try
            {
                var dateNow = DateTime.Now.AddDays(+7);
                List<MonthlyTicket> monthlyTicket = db.MonthlyTickets.Where(x => x.ExpiryDate <= dateNow && x.ExpiryDate >= DateTime.Now).ToList();
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


                foreach (var item in monthlyTicket)
                {
                    DataRow newRow = dt.NewRow();

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
            catch (Exception)
            {
                return Redirect("/ErrorPage");
            }
        }

        public JsonResult ComboboxTicket()
        {
            try
            {
                var typeOfVehicles = new { motobike = "Xe máy", car = "Ô tô" };
                var numberCards = (from c in db.Cards
                                   where c.Status == 0
                                   select new { c.CardNumber, c.CardID }).ToList();
                return Json(new { numberCards, typeOfVehicles }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json("LoadFalse", JsonRequestBehavior.AllowGet);
            }

        }

        //get price of monthly ticket base on typeOfVehicle
        public JsonResult GetPriceMonthly(int typeOfVehicle, int parkingPlaceID)
        {
            try
            {
                var result = (from p in db.MothlyPrices
                              where p.TypeOfvehicle == typeOfVehicle && p.ParkingPlaceID == parkingPlaceID && p.TimeOfApplyMontlhyPrice <= DateTime.Now
                              orderby p.TimeOfApplyMontlhyPrice descending
                              select new { p.MonthlyPrice }).FirstOrDefault();
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json("LoadFalse", JsonRequestBehavior.AllowGet);
            }

        }
    }
}