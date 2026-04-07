import { NavLink, Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h2> Shopity </h2>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/login">Login</NavLink>
        </nav>
      </aside>

      <div className="main-area">
        <header className="header">
          <h1> E-Commerce Shopping App</h1>
        </header>

        <main className="content">
          <Outlet />
        </main>

        <footer className="footer">
          <p>© 2026 Enterprise E-Commerce | All Rights Reserved</p>
        </footer>
      </div>
    </div>
  );
}

export default MainLayout;