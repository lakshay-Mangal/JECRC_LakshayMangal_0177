# Smart Course Management System

## Project Structure

```
SmartCourseAPI/               ← ASP.NET Core 8 Web API
│
├── Controllers/
│   ├── CoursesController.cs      FR1,2,3,4,5 – CRUD + Search
│   ├── EnrollmentsController.cs  FR6,7,8 – Enroll, Drop, History
│   ├── StudentsController.cs     Student CRUD
│   └── DepartmentsController.cs  Department CRUD
│
├── Models/
│   ├── Student.cs
│   ├── Department.cs
│   ├── Course.cs
│   └── Enrollment.cs
│
├── DTOs/
│   └── Dtos.cs                   All request/response DTOs
│
├── Data/
│   └── AppDbContext.cs            EF Core DbContext + seed data
│
├── Program.cs                     Swagger, CORS, EF, DI setup
└── appsettings.json               SQL Server connection string

SmartCourseFrontend/           ← Vanilla JS Frontend (ES6 Modules)
├── index.html
├── styles.css
├── api.js                        All fetch() API calls
├── ui.js                         DOM rendering (map, template literals)
└── app.js                        App logic (async/await, filter, Modules)```
