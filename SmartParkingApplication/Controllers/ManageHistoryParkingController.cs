using SmartParkingApplication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SmartParkingApplication.Controllers
{
    public class ManageHistoryParkingController : Controller
    {
        private SmartParkingsEntities db = new SmartParkingsEntities();
        // GET: ManageHistoryParking
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult LoadHistoryParking(int ParkingPlaceID)
        {
            var trans = (from t in db.Transactions
                         where t.ParkingPlaceID == ParkingPlaceID && t.TimeOutv != null
                        join c in db.Cards on t.CardID equals c.CardID into table1
                        from c in table1.DefaultIfEmpty()
                        orderby t.CardID
                        select new { t.TransactionID, t.LicensePlates, t.TimeIn, t.TimeOutv, t.TypeOfTicket, c.CardNumber, t.TypeOfVerhicleTran ,t.TotalPrice}).ToList();

            List<Object> list = new List<object>();
            foreach (var item in trans)
            {
                var timeIn = item.TimeIn.Value.ToString("dd/MM/yyyy HH:mm:ss tt");
                var timeOut = item.TimeOutv.Value.ToString("dd/MM/yyyy HH:mm:ss tt");
                string typeofTicket = string.Empty;
                string typeOfVehicle = string.Empty;
                switch (item.TypeOfTicket)
                {
                    case 0:
                        typeofTicket = "Vé Lượt";
                        break;
                    case 1:
                        typeofTicket = "Vé Tháng";
                        break;
                }
                switch (item.TypeOfVerhicleTran)
                {
                    case 0:
                        typeOfVehicle = "Xe máy";
                        break;
                    case 1:
                        typeOfVehicle = "Ô tô";
                        break;
                }
                var tr = new { item.TransactionID,  item.LicensePlates, timeIn, timeOut, typeofTicket, item.CardNumber, typeOfVehicle ,item.TotalPrice};
                list.Add(tr);
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }
}