﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SmartParkingApplication.Controllers
{
    public class ManagePPlaceController : Controller
    {
        // GET: ManagePPlace
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult CreateParkingPlace()
        {
            return View();
        }
    }
}