using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SmartParkingApplication.Models
{
    public class Validate
    {
        [MaxLength(50, ErrorMessage = "Vượt quá số kí tự 50")]
        public string HoTen { get; set; }

        public string TenDangNhap { get; set; }

        [DataType(DataType.Password)]
        [Required(ErrorMessage = "Nhập mật khẩu")]
        [MaxLength(50, ErrorMessage = "Vượt quá số kí tự 50")]
        public string MatKhau { get; set; }

        public Nullable<System.DateTime> NgaySinh { get; set; }

        public string GioiTinh { get; set; }

        public string DiaChi { get; set; }

        [RegularExpression(@"[A-Za-z0-9]*$", ErrorMessage = "Chứa kí tự đặc biệt")]
        [MaxLength(15, ErrorMessage = "sdt tối đa 15 số")]
        public string SoCMND { get; set; }

        [MaxLength(11, ErrorMessage = "sdt tối đa 11 số")]
        [RegularExpression(@"[0-9]*$", ErrorMessage = "chỉ được nhập số")]
        public string sdt_NhanVien { get; set; }
    }
}