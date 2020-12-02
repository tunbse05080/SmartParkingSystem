using SmartParkingApplication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

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

        public JsonResult LoadData(string nameT, int pageTicket, int pageSizeTicket = 5)
        {
            var ticket = from t in db.MonthlyTickets select new {t.MonthlyTicketID, t.CusName , t.IdentityCard , t.Phone, t.Email , t.LicensePlates , t.RegisDate, t.ExpiryDate};
            if (!string.IsNullOrEmpty(nameT))
            {
                ticket = ticket.Where(x => x.CusName.Contains(nameT));
            }

            List<Object> list = new List<object>();
            foreach (var item in ticket)
            {
                var RegisDate = item.RegisDate.Value.ToString("dd/MM/yyyy HH:mm:ss tt");
                var ExpiryDate = item.ExpiryDate.Value.ToString("dd/MM/yyyy HH:mm:ss tt");
                var tr = new { MonthlyTicketID = item.MonthlyTicketID, CusName = item.CusName, IdentityCard = item.IdentityCard, Phone = item.Phone, LicensePlates = item.LicensePlates, RegisDate, ExpiryDate };
                list.Add(tr);
            }

            var totalRow = ticket.Count();
            ticket = ticket.OrderByDescending(x => x.MonthlyTicketID).Skip((pageTicket - 1) * pageSizeTicket).Take(pageSizeTicket);

            return Json(new { dataCard = list, total = totalRow }, JsonRequestBehavior.AllowGet);
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

    }
}