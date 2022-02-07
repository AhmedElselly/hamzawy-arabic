import Head from 'next/head';
import { Fragment, useState } from 'react';
import ContactContainer from '../components/ContactContainer';
import styles from '../styles/Contact.module.css';

const Contact = props => {
	const [email, setEmail] = useState('diabshopping@gmail.com');
	const [phone, setPhone] = useState('01125894457');
	const [address, setAddress] = useState('ش المشروع - بشتيل - امبابة - جيزة');
	// const [message, setMessage] = useState('');

	const handleChange = e => {
		if(e.target.name === 'email'){
			setEmail(e.target.value);
		}
		if(e.target.name === 'phone'){
			setPhone(e.target.value);
		}
		if(e.target.name === 'message'){
			setMessage(e.target.value);
		}
		
	}

	const handleSubmit = e => {
		e.preventDefault();
	}
	return(
		<Fragment>
			<Head>
				<title>تواصل معنا</title>
				<meta name="تواصل معنا diab shopping" content="Diab shopping تواصل معنا" />
				<link rel="icon" href="/favicon.ico" />			
			</Head>
		<ContactContainer>
			<div className={styles.wrapper}>
				<div className={styles.innerContainer}>
					<h2 className={styles.title}>تواصل معنا</h2>
					<form onSubmit={handleSubmit}>
						<div className={styles.item}>
							<label className={styles.label}>إيميل</label>
							<input 
								className={styles.input}
								type='email' 
								name='email'
								value={email}
								disabled
								onChange={handleChange}
							/>
						</div>
						<div className={styles.item}>
							<label className={styles.label}>تليفون أو واتساب</label>
							<input 
								className={styles.input}
								type='text' 
								name='phone'
								value={phone}
								disabled
								onChange={handleChange}
							/>
						</div>
						<div className={styles.item}>
							<label className={styles.label}>العنوان:</label>
							<div>{address}</div>
							{/* <input 
								className={styles.input}
								type='text' 
								name='phone'
								value={address}
								disabled
								onChange={handleChange}
							/> */}
						</div>
						{/* <div className={styles.item}>
							<label className={styles.label}>الرسالة</label>
							<textarea className={styles.textarea} name='message'>{message}</textarea>
						</div> */}
						{/* <button className={styles.btn}>ارسال</button> */}
						</form>
					</div>
			</div>
		</ContactContainer>
		</Fragment>
	)
}


export default Contact;