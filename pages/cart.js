import { useState, useEffect } from 'react';
import styles from '../styles/Cart.module.css';
import { useSelector, useDispatch } from 'react-redux';
import OrderDetailed from '../components/OrderDetailed';
import axios from 'axios';
import {useRouter} from 'next/router';
import Alert from '../components/Alert';
import Image from 'next/image';

// import {
// 	PayPalScriptProvider,
// 	PayPalButtons,
// 	usePayPalScriptReducer
// } from '@paypal/react-paypal-js';

// const amount = '2';
// const currency = 'usd';


const Cart = props => {
	const dispatch = useDispatch();
	const router = useRouter();
	const cart = useSelector(state => state.cart);
	const [cash, setCash] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');
	const [success, setSuccess] = useState(false);


	useEffect(() => {
		if(success){
			setTimeout(() => {
				setSuccess(false)
			}, 3000);			
		}
	}, [success]);

	const url = 'http://localhost:3000/api';

	const createOrder = async data => {
		
		try {
			console.log('data', data)
			
			const res = await axios.post(`${url}/orders`, data);
			console.log(res.data)
			setSuccess(true);
			setSuccessMessage('تم الطلب وسيتم التواصل معك قريبا')
			dispatch(reset());
			
			// router.push(`/orders/${res.data._id}`);
		
		} catch(err) {

		}
	}

	const handleCash = (bool) => setCash(bool);

	return(
		<div className={styles.container}>
			<div className={successMessage ? styles.alert : styles.none}>
				{success && (
					<Alert message={successMessage} />
				)}
			</div>
			<div className={styles.left}>
				<table className={styles.table}>
					<tr className={styles.trTitle}>
						<th>المنتج</th>
						<th>الاسم</th>
						<th>السعر</th>
						<th>الكمية</th>
						<th>الاجمالي</th>
					</tr>
					{cart.products.map(product => (
						<tr className={styles.tr} key={product._id}>
							<td className={styles.td}>
								<div className={styles.imgContainer}>
									<Image 
										src={product.image}
										alt={product.title}
										width={'100%'}
										height={'100%'}
										style={{objectFit: 'cover'}}
									/>
								</div>
							</td>
							<td className={styles.td}>
								<span className={styles.name} >{product.title}</span>
							</td>
							<td className={styles.td}>
								<span className={styles.price}>
									${product.price}
								</span>
							</td>
							<td className={styles.td}>
								<span className={styles.qty}>
									{product.qty}
								</span>
							</td>
							<td className={styles.td}>
								<span className={styles.total}>
									${product.price * product.qty}
								</span>
							</td>
						</tr>
					))}
					
				</table>
			</div>
			<div className={styles.right}>
				<div className={styles.wrapper}>
					<h2 className={styles.title}>إجمالي العربة</h2>
					<div className={styles.totalText}>
						<b className={styles.totalTextTitle}>الاجمالي قبل الخصم: </b>${cart.total}
					</div>
					<div className={styles.totalText}>
						<b className={styles.totalTextTitle}>الخصم: </b>$0.00
					</div>
					<div className={styles.totalText}>
						<b className={styles.totalTextTitle}>الاجمالي بعد الخصم: </b>${cart.total}
					</div>
					<button onClick={() => setCash(true)} className={styles.btn}>أطلب</button>
				</div>
			</div>
			{cash && (
				<OrderDetailed total={cart.total} cart={cart} handleCashProp={handleCash} createOrder={createOrder} />
			)}
		</div>
	)
}

export default Cart;