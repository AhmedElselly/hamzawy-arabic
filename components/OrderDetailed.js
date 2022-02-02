import { useState } from 'react';
import styles from '../styles/OrderDetailed.module.css';

const OrderDetailed = ({total, createOrder, handleCashProp, cart}) => {
	const [customer, setCustomer] = useState({
		name: '',
		email: '',
		address: '',
		phone: ''
	})

	const handleChange = e => {
		setCustomer({...customer, [e.target.name]:e.target.value});
	}

	const {
		name,
		email,
		address,
		phone
	} = customer;

	const handleClick = e => {
		createOrder({name, email, address, phone, total, cart});
		handleCashProp(false)
	}

	const close = () => {
		handleCashProp(false);
	}


	return(
		<div className={styles.container}>
			<div className={styles.wrapper}>
			<span className={styles.close} onClick={close}>X</span>
				<h1>ستدفع {total} جنيه مصري عند الاستلام</h1>
				<div className={styles.item}>
					<label className={styles.label}>الإيميل</label>
					<input 
						type='text' 
						className={styles.input}
						name='email'
						value={customer.email}
						onChange={handleChange}
					/>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>الاسم</label>
					<input 
						type='text' 
						className={styles.input}
						name='name'
						value={customer.name}
						onChange={handleChange}
					/>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>رقم الموبايل</label>
					<input 
						type='text' 
						className={styles.input}
						name='phone'
						value={customer.phone}
						onChange={handleChange}
					/>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>العنوان</label>
					<input 
						type='text' 
						className={styles.input}
						name='address'
						value={customer.address}
						onChange={handleChange}
					/>
				</div>
				<button className={styles.btn} onClick={handleClick}>إرسل الطلب</button>
			</div>
		</div>
	)
}

export default OrderDetailed;