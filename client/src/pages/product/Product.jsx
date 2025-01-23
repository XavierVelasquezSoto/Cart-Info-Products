import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Product = () => {
	const [product, setProduct] = useState();
	const { id } = useParams();

	useEffect(() => {
		getProductById(id, setProduct);
	}, []);

	return (
		<>
			<h1>PRODUCT</h1>
			{product && (
				<>
					<div>
						<h2>{product.name}</h2>
						<p>{product.descriptionProduct}</p>
						<p>{product.price}</p>
					</div>

					<form
						onSubmit={event => updateProduct(event, id, product, setProduct)}
					>
						<div>
							<label htmlFor='name'>Name</label>
							<input
								type='text'
								id='name'
								name='name'
								defaultValue={product.name}
							/>
						</div>
						<div>
							<label htmlFor='descriptionProduct'>Description Product</label>
							<input
								type='text'
								id='descriptionProduct'
								name='descriptionProduct'
								defaultValue={product.descriptionProduct}
							/>
						</div>
						<div>
							<label htmlFor='price'>Price</label>
							<input
								type='text'
								id='price'
								name='price'
								defaultValue={product.price}
							/>
						</div>

						<input type='submit' value='Update product' />
					</form>
				</>
			)}
			<Link to='/'>
				<button>Back to product</button>
			</Link>
		</>
	);
};

const getProductById = async (id, setProduct) => {
	const response = await fetch(`http://localhost:4000/${id}`);
	const product = await response.json();
	setProduct(product);
};

const updateProduct = async (event, id, product, setProduct) => {
	event.preventDefault();
	const newProductInfo = {
		name: event.target.name.value || product.name,
		descriptionProduct:
			event.target.descriptionProduct.value || product.descriptionProduct,
		price: event.target.price.value || product.price
	};
	const response = await fetch(`http://localhost:4000/${id}`, {
		method: 'PATCH',
		body: JSON.stringify(newProductInfo),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const productUpdated = await response.json();
	setProduct(productUpdated);
};

export default Product;
