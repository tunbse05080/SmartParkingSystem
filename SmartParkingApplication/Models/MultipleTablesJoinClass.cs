using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SmartParkingApplication.Models
{
    public class MultipleTablesJoinClass
    {
        public Schedule schedule { get; set; }
        public User user { get; set; }
        public UserSchedule userSchedule { get; set; }
    }
}