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

const CategoryCard = ({category}) => {
	return(
		<div className={styles.container}>
			<div className={styles.iconContainer}>
				{/* here goes the icon */}
				<MicrowaveIcon/>
			</div>
			<span>{category.main}</span>
		</div>
	)
}

export default CategoryCard;