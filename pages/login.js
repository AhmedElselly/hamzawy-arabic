import axios from 'axios';
import { Fragment, useState } from 'react';
import {login, authenticate} from '../actions/auth';
import styles from '../styles/Login.module.css';
import { useRouter } from 'next/router';
import Container from '../components/Container';

const Login = props => {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleChange = e => {
		if(e.target.name === 'email'){
			setEmail(e.target.value);
		}
		if(e.target.name === 'password'){
			setPassword(e.target.value);
		}
	}

	const handleClick = async e => {
		e.preventDefault()
		login(email, password).then(res => {
			console.log(res.data);
			authenticate(res.data, () => {
				router.push('/');
			})
		})
		
	}
	
	return(
		<Fragment>
		<Container>
		<div className={styles.wrapper}>
			<form onSubmit={handleClick} className={styles.innerContainer}>
				<h2 className={styles.title}>الدخول</h2>
				<div className={styles.item}>
					<label className={styles.label}>إيميل</label>
					<input 
						className={styles.input}
						type='email' 
						name='email'
						value={email}
						onChange={handleChange}
					/>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>كلمة المرور</label>
					<input 
						className={styles.input}
						type='password' 
						name='password'
						value={password}
						onChange={handleChange}
					/>
				</div>
				<button className={styles.btn}>دخول</button>
			</form>
			</div>
		</Container>
		</Fragment>
	)
}

export default Login;