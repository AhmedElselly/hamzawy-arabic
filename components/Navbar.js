import {Fragment, useEffect, useState} from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useSelector} from 'react-redux';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import { isAuthenticated, logout } from '../actions/auth';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/router';


const Navbar = (props) => {
	const router = useRouter()
	const qty = useSelector(state => state.cart.qty);
	const [showFullNavbar, setShowFullNavbar] = useState(false);

	const handleLogout = () => {
		logout(() => {
			router.push('/login')
		});
	}

	const generateFullNavbar = () => {
		setShowFullNavbar(!showFullNavbar);
	}

	return(
		<div className={styles.container}>
			<div className={styles.item}>
				<div className={styles.callButton}>
						{/* <Image height={100} width={100} src='/img/favicon.ico' /> */}
						<Link href='/' passHref>
							<PhoneInTalkIcon />
						</Link>
					</div>
				<div className={styles.badgeContainer}>
					
					<Link href='/' passHref>
						<h1 className={styles.badge}>Diab Shopping</h1>
					</Link>
					<div className={styles.text}>01125894457</div>
				</div>
			</div>
			
			<div className={styles.item}>
				{/* SEARCH BAR */}
				
			</div>
			<div className={styles.item}>
				<ul className={styles.list}>
					<Link href='/' passHref><li className={styles.listItem}>الرئيسية</li></Link>
					<Link href='/products' passHref><li className={styles.listItem}>المنتجات</li></Link>				
					
					{/* <Link href='/contact'><li className={styles.listItem}>Contact</li></Link> */}
					{isAuthenticated() && (
						<Fragment>
							<Link href='/admin' passHref><li className={styles.listItem}>أدمن</li></Link>
							<Link href='/create' passHref><li className={styles.listItem}>إنشاء</li></Link>							
							<LogoutIcon onClick={handleLogout} sx={{marginLeft: 3, cursor: 'pointer'}}/>							
						</Fragment>
					)}
					{!isAuthenticated() && (
						<Fragment>
							<Link href='/contact' passHref><li style={{width: 'max-content'}} className={styles.listItem}>تواصل معنا</li></Link>
							<Link href='/about' passHref><li tyle={{width: 'max-content'}} className={styles.listItem}>من نحن</li></Link>
						</Fragment>
					)}
					
				</ul>
				<div className={styles.cart}>
					<Link href='/cart' passHref>
						<ShoppingCartIcon sx={{color: '#fff'}}/>
					</Link>
					<Link href='/cart' passHref>
						<div className={styles.counter}>{qty}</div>
					</Link>
				</div>
				<div onClick={generateFullNavbar} className={styles.hamburger}>
					<div className={styles.line}></div>
					<div className={styles.line}></div>
					<div className={styles.line}></div>
				</div>
			</div>
			{showFullNavbar && (
				<div onClick={generateFullNavbar} className={styles.fullNavbar}>
					<div className={styles.closeContainer}>
						<span className={styles.close} onClick={generateFullNavbar}>X</span>
					</div>

					<ul className={styles.list}>
						<Link href='/' passHref><li className={styles.listItem}>الرئيسية</li></Link>
						<Link href='/products' passHref><li className={styles.listItem}>المنتجات</li></Link>
						{isAuthenticated() && isAuthenticated().admin && (
							<Fragment>
								<Link href='/admin' passHref><li className={styles.listItem}>الأدمن</li></Link>
								<Link href='/create' passHref><li className={styles.listItem}>إنشاء</li></Link>
								<li onClick={handleLogout} className={styles.listItem}>
								
								الخروج
								</li>
							</Fragment>
						)}
						{!isAuthenticated() && (
							<Fragment>
								<Link href='/contact' passHref><li style={{width: 'max-content'}} className={styles.listItem}>تواصل معنا</li></Link>
							<Link href='/about' passHref><li tyle={{width: 'max-content'}} className={styles.listItem}>من نحن</li></Link>
							</Fragment>
						)}
						
					</ul>
				</div>
			)}
		</div>
	)
}


export default Navbar;