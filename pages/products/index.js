import { Fragment, useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router, { useRouter, withRouter } from 'next/router';
import axios from 'axios';
import styles from '../../styles/Products.module.css';
import queryString from 'query-string';
import Card from '../../components/Card';
import ReactPaginate from 'react-paginate';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

const url = 'http://localhost:3000/api/products';

const Products = (props) => {
	const [search, setSearch] = useState('');
	const [val, setVal] = useState([50, 900]);
	const [min, setMin] = useState(val[0]);
	const [max, setMax] = useState(val[1]);
	const [searched, setSearched] = useState(false);
	const [products, setProducts] = useState([]);
	const [count, setCount] = useState([]);


	const [isLoading, setLoading] = useState(false); //State for the loading indicator
	const startLoading = () => setLoading(true);
	const stopLoading = () => setLoading(false);

	useEffect(() => { //After the component is mounted set router event handlers
		Router.events.on('routeChangeStart', startLoading); 
		Router.events.on('routeChangeComplete', stopLoading);

		return () => {
			Router.events.off('routeChangeStart', startLoading);
			Router.events.off('routeChangeComplete', stopLoading);
		}		
	}, []);


	const pagginationHandler = (page) => {
		const currentPath = props.router.pathname;
		const currentQuery = props.router.query;
		currentQuery.page = page;

		props.router.push(`/products?page=${page}`)

		setSearched(false)
	};
	
	const handleChange = e => {
		if(e.target.name === 'search'){
			setSearch(e.target.value);
		}
		
		if(e.target.name === 'min'){
			setMin(e.target.value);
		}
		
		if(e.target.name === 'max'){
			setMax(e.target.value);
		}		
	}

	const handleClick = async e => {
		e.preventDefault();
		const res = await axios.get(`${url}/search`, {
			params: {
				search,
				min,
				max
			},
			paramsSerializer: params => {
				console.log(queryString.stringify(params));
				return queryString.stringify(params, {arrayFormat: 'repeat'});
			}
		});
		console.log('res.data', res.data);
		setProducts(res.data);
		setSearched(true)
	}
	

	const listingProducts = () => {
		let content = null;
		if(!isLoading && !searched){
			content = props.docs.map(product => (
				<Card key={product._id} _id={product._id} title={product.title} subtitle={product.subtitle} desc={product.desc} image={product.image} price={product.price} />
			))
		} else if (searched){
			content = products.map(product => (
				<Card key={product._id} _id={product._id} title={product.title} subtitle={product.subtitle} desc={product.desc} image={product.image} price={product.price} />
			))
		} else {
			content = <div>Loading...</div>;
			
		}
		return content;
	}

	const countPages = () => {
		let counting = [];
		for(let i = 1; i <= props.totalPages; i++){
			counting.push(i)
		}
		return counting;
	}

	const handleSliderChange = async val => {
		setMin(val[0])
		setMax(val[1])
		setVal(val);

		console.log(min, max)
		props.router.push(`/products/?min=${min}&max=${max}`)
		// const res = await axios.get(`${url}/search`);
		// console.log(res.data);
	}

	return(
		<Fragment>
		<Head>
        <title>البحث</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
		<div className={styles.container}>
			<div className={styles.right}>
				<form onSubmit={handleClick}>
				<div className={styles.item}>

					<label className={styles.label}>البحث</label>
					<input 
						type='text' 
						placeholder='اسم المنتج او الوصف' 
						className={styles.input}
						name='search'
						value={search}
						onChange={handleChange}
					/>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>أقل سعر</label>
					<input 
						type='number' 
						placeholder='أقل سعر' 
						className={styles.input}
						name='min'
						value={min}
						onChange={handleChange}
					/>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>أعلى سعر</label>
					<input 
						type='number' 
						placeholder='أعلى سعر' 
						className={styles.input}
						name='max'
						value={max}
						onChange={handleChange}
					/>
				</div>
				<Range
					allowCross={false}
					draggableTrack
					value={val}
					min={50}
					max={1000}
					onChange={handleSliderChange}
					step={10}
				/>
				<button className={styles.btn}>بحث</button>
				</form>
			</div>
			<div className={styles.left}>
				<h1 className={styles.searchTitle}>نتيجة البحث</h1>
				{/* Pagination */}
				<div className={styles.paginationContainer}>
					{countPages().map(c => {
						// {props.router.query.page === String(c) ? (
						// <div onClick={() => pagginationHandler(c)} key={c} className={styles.page}>{c}</div>
						// ) : (

						// )}
						return <div onClick={() => pagginationHandler(c)} key={c} className={Number(props.router.query.page) !== c ? (styles.page) : (styles.page1)} >{c}</div>
					})}
				</div>
				{/* Pagination */}
				<div className={styles.products}>
					{props.docs && listingProducts()}
				</div>
			</div>
		</div>
		</Fragment>
	)
}

export const getServerSideProps = async ctx => {
	const page = ctx.query.page || 1;
	const {min, max} = ctx.query;
	const res = await axios.get(`${url}`, {
		params: {
			page,
			min,
			max
		},
		paramsSerializer: params => {
			console.log(queryString.stringify(params));
			return queryString.stringify(params, {arrayFormat: 'repeat'});
		}
	});
	// console.log(`query ${ctx.query.min}`)
	// console.log(res.data)
	const {
		docs,
		totalDocs,
		limit,
		totalPages,
		pagingCounter,
		hasPrevPage,
		hasNextPage,
		prevPage,
		nextPage
	} = res.data;
	return {
		props: {
			docs,
			totalDocs,
			limit,
			totalPages,
			pagingCounter,
			hasPrevPage,
			hasNextPage,
			prevPage,
			nextPage
		}
	}
}

export default withRouter(Products);