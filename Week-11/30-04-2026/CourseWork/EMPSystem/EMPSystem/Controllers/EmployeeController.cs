//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using EMPSystem.Models;
//using EMPSystem.Data; 
//using System.Threading.Tasks;
//using System.Linq;
//using System;

//namespace EMPSystem.Controllers
//{
//    public class EmployeeController : Controller
//    {
//        private readonly AppDbContext _context;

//        public EmployeeController(AppDbContext context)
//        {   
//           _context=context;
//        }
//        public async Task<IActionResult> Index()
//        {
//            var employees = await _context.Employees.ToListAsync();
//            return View(employees);
//        }
//    }
//}
