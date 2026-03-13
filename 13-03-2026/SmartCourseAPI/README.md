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
└── app.js                        App logic (async/await, filter, Modules)
```

---

## Backend Setup

### 1. Copy files into your existing project

Copy each file from `SmartCourseAPI/` into your VS Code project at the matching path.

### 2. Install NuGet packages (run in your project folder)

```powershell
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer --version 8.0.0
dotnet add package Microsoft.AspNetCore.Identity.EntityFrameworkCore --version 8.0.0
dotnet add package Microsoft.EntityFrameworkCore.Design --version 8.0.0
dotnet add package Microsoft.EntityFrameworkCore.SqlServer --version 8.0.0
dotnet add package Swashbuckle.AspNetCore --version 6.4.0
```

### 3. Configure connection string

Edit `appsettings.json` — default uses LocalDB:

```json
"DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=SmartCourseDB;Trusted_Connection=True;"
```

For SQL Server Express use:
```
Server=.\\SQLEXPRESS;Database=SmartCourseDB;Trusted_Connection=True;
```

### 4. Run EF Core Migrations

```powershell
dotnet ef migrations add InitialCreate
dotnet ef database update
```

> If `ef` tool is not installed: `dotnet tool install --global dotnet-ef`

### 5. Run the API

```powershell
dotnet run
```

Swagger UI opens at: **http://localhost:5000** (or the port shown in terminal)

---

## Frontend Setup

### Option A – Open directly in browser

Since the frontend uses ES6 Modules (`type="module"`), you need a local server:

```powershell
# Python (if installed)
cd SmartCourseFrontend
python -m http.server 3000
# Open: http://localhost:3000
```

```powershell
# Or use VS Code Live Server extension (right-click index.html → Open with Live Server)
```

### Option B – Serve from ASP.NET Core

Copy the `SmartCourseFrontend/` folder into `wwwroot/` of your API project, then add:

```csharp
app.UseStaticFiles(); // in Program.cs
```

Access frontend at `http://localhost:5000/index.html`

---

## API Endpoints Summary

| Method | Endpoint | Functional Req |
|--------|----------|----------------|
| GET | /api/courses | FR1 – View all courses |
| GET | /api/courses/search?keyword= | FR2 – Search courses |
| POST | /api/courses | FR3 – Add course (Admin) |
| PUT | /api/courses/{id} | FR4 – Update course (Admin) |
| DELETE | /api/courses/{id} | FR5 – Delete course (Admin) |
| POST | /api/enrollments | FR6 – Enroll student |
| DELETE | /api/enrollments/{id} | FR7 – Drop course |
| GET | /api/enrollments | FR8 – View enrollment history |
| GET | /api/enrollments/student/{id} | Student's own enrollments |
| GET/POST | /api/students | Manage students |
| GET/POST | /api/departments | Manage departments |

---

## ES6 Features Used (per requirements)

| Feature | Where Used |
|---------|-----------|
| Arrow Functions | All callbacks in api.js, app.js |
| Modules (import/export) | api.js, ui.js imported into app.js |
| map() | renderCourseCards(), renderEnrollments() in ui.js |
| filter() | handleSearch() client-side filtering in app.js |
| Async/Await | All API calls in app.js |
| Template Literals | All HTML generation in ui.js |
