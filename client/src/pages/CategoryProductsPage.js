import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './CategoryProductsPage.module.css';
import ProductCard from '../components/ProductCard'; // Import the ProductCard

// MOCK DATA - Replace with API call later
const allProducts = [
  // Plants
  { id: 'p1', category: 'plants', name: 'Monstera Deliciosa', price: 1200, imageUrl: '/images/monstera.jpg' },
  { id: 'p2', category: 'plants', name: 'Snake Plant', price: 800, imageUrl: '/images/snake-plant.jpg' },
  { id: 'p3', category: 'plants', name: 'Fiddle Leaf Fig', price: 2500, imageUrl: '/images/fiddle-leaf.jpg' },
  { id: 'p4', category: 'plants', name: 'Rose Bush (Red)', price: 500, imageUrl: '/images/rose-bush.jpg' },
  // Seeds
  { id: 's1', category: 'seeds', name: 'Tomato Seeds', price: 150, imageUrl: '/images/tomato-seeds.jpg' },
  { id: 's2', category: 'seeds', name: 'Marigold Seeds', price: 120, imageUrl: '/images/marigold-seeds.jpg' },
  // Pots
  { id: 'pt1', category: 'pots', name: 'Terracotta Pot (Medium)', price: 300, imageUrl: '/images/terracotta-pot.jpg' },
  { id: 'pt2', category: 'pots', name: 'Ceramic Planter (Blue)', price: 750, imageUrl: '/images/ceramic-planter.jpg' },
  // Plant Care
  { id: 'pc1', category: 'plant-care', name: 'Organic Fertilizer', price: 250, imageUrl: '/images/fertilizer.jpg' },
  { id: 'pc2', category: 'plant-care', name: 'Gardening Tool Set', price: 900, imageUrl: '/images/gardening-tools.jpg' },
];
// Make sure to add these images to your public/images folder or update paths

function CategoryProductsPage() {
  const { categoryName } = useParams(); // Get category name from URL (e.g., "plants")
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simulate fetching products
    const filteredProducts = allProducts.filter(
      (product) => product.category.toLowerCase() === categoryName.toLowerCase()
    );
    // In a real app, you would fetch from an API:
    // fetch(`/api/products?category=${categoryName}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     setProducts(data);
    //     setLoading(false);
    //   });
    setTimeout(() => { // Simulate network delay
        setProducts(filteredProducts);
        setLoading(false);
    }, 500);
  }, [categoryName]);

  const pageTitle = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  if (loading) {
    return <div className={styles.loading}>Loading products...</div>; // Basic loading state
  }

  return (
    <div className={styles.categoryProductsContainer}>
      <nav aria-label="breadcrumb" className={styles.breadcrumbs}>
        <Link to="/products">Categories</Link> <span>&gt;</span> {pageTitle}
      </nav>
      <h1 className={styles.pageTitle}>{pageTitle}</h1>
      {products.length > 0 ? (
        <div className={styles.productsGrid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className={styles.noProducts}>No products found in this category yet.</p>
      )}
    </div>
  );
}

export default CategoryProductsPage;