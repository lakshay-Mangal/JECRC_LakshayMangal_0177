import { NavLink, Outlet, useParams } from 'react-router-dom';

function ProductDetails() {
  const { productId } = useParams();

  return (
    <div className="page-card">
      <h2>Product Details - Product {productId}</h2>
      <p>This page shows detailed information for product ID: {productId}</p>

      <div className="nested-nav">
        <NavLink to="reviews">Reviews</NavLink>
        <NavLink to="specs">Specs</NavLink>
      </div>

      <div className="nested-content">
        <Outlet />
      </div>
    </div>
  );
}

export default ProductDetails;