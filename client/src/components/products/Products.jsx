import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';

const Products = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		getAllProducts(setProducts);
	}, []);

	return (
		<>
			<h1>PRODUCTS</h1>
			{products.length === 0 && <h2>No Products</h2>}
			<form onSubmit={event => createProduct(event, setProducts)}>
				<div>
					<label htmlFor='name'>Name</label>
					<input type='text' id='name' name='name' />
				</div>
				<div>
					<label htmlFor='descriptionProduct'>Description Product</label>
					<input
						type='text'
						id='descriptionProduct'
						name='descriptionProduct'
					/>
				</div>
				<input type='submit' value='Create Product' />
			</form>
			{products.length > 0 &&
				products.map(product => (
					<div key={product.productId}>
						<h2>{product.name}</h2>
						<p>{product.descriptionProduct}</p>
						<p>{product.price}</p>
						<Link to={`/product/${product.productId}`}>
							<button>View Product Info</button>
						</Link>
						<button
							onClick={() => deleteProduct(product.productId, setProducts)}
						>
							Delete Product
						</button>
					</div>
				))}
		</>
	);
};

const getAllProducts = async setProducts => {
	const response = await fetch('http://localhost:4000');
	const products = await response.json();
	setProducts(products);
};

const createProduct = async (event, setProducts) => {
	event.preventDefault();
	const newProduct = {
		productId: v4(),
		name: event.target.name.value,
		descriptionProduct: event.target.descriptionProduct.value,
		price: event.target.price.value
	};
	const response = await fetch('http://localhost:4000', {
		method: 'POST',
		body: JSON.stringify(newProduct),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const products = await response.json();
	setProducts(products);
};

const deleteProduct = async (id, setProducts) => {
	const response = await fetch(`http://localhost:4000/${id}`, {
		method: 'DELETE'
	});
	const products = await response.json();
	setProducts(products);
};

// ASINCRONISMO

export default Products;
