using SmartParkingApplication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SmartParkingApplication.Controllers
{
    public class ManageStatisticController : Controller
    {
        // GET: ManageStatistic
        private SmartParkingsEntities db = new SmartParkingsEntities();

        public ActionResult IncomeStatistic()
        {
            return View();
        }

        public JsonResult LoadDataIncome(int idParking, int idTypeOfTicket)
        {
            List<double> listIncomeMoto = new List<double>();
            List<double> listIncomeCar = new List<double>();
            for (int i = 0; i < 12; i++)
            {
                var dataMoto = (from tr in db.Transactions
                                where (tr.TimeOutv.Value.Month == DateTime.Now.Month - i) && (tr.TypeOfVerhicleTran == 0) && (tr.ParkingPlaceID == idParking) && (tr.TypeOfTicket == idTypeOfTicket)
                                select new { tr.TotalPrice }).ToList();
                var sumMoto = dataMoto.Select(s => s.TotalPrice).Sum();
                listIncomeMoto.Add((double)sumMoto);

                var dataCar = (from tr in db.Transactions
                               where (tr.TimeOutv.Value.Month == DateTime.Now.Month - i) && (tr.TypeOfVerhicleTran == 1) && (tr.ParkingPlaceID == idParking) && (tr.TypeOfTicket == idTypeOfTicket)
                               select new { tr.TotalPrice }).ToList();
                var sumCar = dataCar.Select(s => s.TotalPrice).Sum();
                listIncomeCar.Add((double)sumCar);
            }
            listIncomeMoto.Reverse();
            listIncomeCar.Reverse();
            return Json(new { listIncomeMoto, listIncomeCar }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult DensityStatistic()
        {
            return View();
        }

        public JsonResult loadChartCarDensity(int idParking)
        {
            List<double> listMotoDestiny = new List<double>();
            List<double> listCarDestiny = new List<double>();
            for (int i = 0; i < 12; i++)
            {
                var dataMoto = (from tr in db.Transactions
                                where (tr.TimeOutv.Value.Month == DateTime.Now.Month - i) && (tr.TypeOfVerhicleTran == 0) && (tr.ParkingPlaceID == idParking)
                                select new { tr.TypeOfVerhicleTran }).ToList();

                listMotoDestiny.Add(dataMoto.Count());

                var dataCar = (from tr in db.Transactions
                               where (tr.TimeOutv.Value.Month == DateTime.Now.Month - i) && (tr.TypeOfVerhicleTran == 1) && (tr.ParkingPlaceID == idParking)
                               select new { tr.TypeOfVerhicleTran }).ToList();
                listCarDestiny.Add(dataCar.Count());
            }
            listMotoDestiny.Reverse();
            listCarDestiny.Reverse();
            return Json(new { listMotoDestiny, listCarDestiny }, JsonRequestBehavior.AllowGet);
        }

        //combobox Gender
        public JsonResult ComboboxNameParking()
        {
            var list = (from p in db.ParkingPlaces
                        select new { p.ParkingPlaceID, p.NameOfParking }).ToList();

            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }
}