import styles from '../styles/CategoryCard.module.css';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import CountertopsIcon from '@mui/icons-material/Countertops';
import MicrowaveIcon from '@mui/icons-material/Microwave';
import BlenderIcon from '@mui/icons-material/Blender';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CoffeeIcon from '@mui/icons-material/Coffee';
import CoffeeMakerIcon from '@mui/icons-material/CoffeeMaker';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useState, ReactDOM } from 'react';
import { useRouter } from 'next/router';

const CategoryCard = ({category, subCategory}) => {
	const router = useRouter();
	const [checked, setChecked] = useState(false);

	const handleClick = () => {
		setChecked(!checked);
	}

	
	const handleUncheck = () => {
		setChecked(!checked);
	}

	const handleRoute = sub => {
		router.push(`/products?search=${sub}`);
		setChecked(false);
	}

	return(
		<div onFocus={handleClick} tabIndex={0} onBlur={handleUncheck} className={styles.container}>
			<div className={styles.iconContainer}>
				<MicrowaveIcon/>
			</div>
			<span>{category.main}</span>
			{subCategory && (
				<div style={{display: checked ? 'block' : 'none'}} className={styles.subCategory}>
					{subCategory.map(sub => (
						<div onClick={() => handleRoute(sub)} className={styles.subText}>{sub}</div>
					))}
				</div>	
			)}			
		</div>
	)
}

export default CategoryCard;