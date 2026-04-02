import { Link } from 'react-router-dom';

function Products() {
  const products = [
    { id: 1, name: 'Laptop', price: '₹75,000' },
    { id: 2, name: 'Smartphone', price: '₹45,000' },
    { id: 3, name: 'Headphones', price: '₹5,000' },
  ];

  return (
    <div className="page-card">
      <h2>Products List</h2>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <Link to={`/products/${product.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;