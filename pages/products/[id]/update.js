import { useState, useRef, useEffect, Fragment } from 'react';
import styles from '../../../styles/Create.module.css';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import {useRouter} from 'next/router';
import Head from 'next/head';
import Image from 'next/image';

const url = 'http://localhost:3000/api/categories';

const UpdateCard = ({post}) => {
	const router = useRouter()
	const editorRef = useRef(null);
	const [files, setFiles] = useState('');
	const [category, setCategory] = useState(post.category);
	const [subCategory, setSubCategory] = useState(post.subCategory);
	const [categories, setCategories] = useState([]);
	const [allSubCategory, setAllSubCategory] = useState([]);
	console.log('sub', subCategory)
	const [values, setValues] = useState({
		_id: post._id,
		title: post.title,
		subtitle: post.subtitle,
		image: post.image,
		desc: post.desc,
		price: post.price,
		// category: post.category
	})

	const {
		_id,
		title,
		subtitle,
		image,
		price,
		desc,
		// category
	} = values;

	useEffect(() => {
		async function fetchData(){
			const res = await axios.get(`${url}`);
			setCategories(res.data);
			
			const subCat = await axios.get(`${url}/${category}`);
			console.log('subcategory', subCat.data);
			setAllSubCategory(subCat.data.subCategory);
		};
		fetchData();
	}, [category]);


	const handleChange = async e => {
		if(e.target.name === 'category'){
			setCategory(prev => e.target.value);
		}
		console.log('cat', category)
		if(e.target.name === 'subCategory'){
			setSubCategory(e.target.value)
			console.log('subCategory update', subCategory)
		}
		
		setValues({...values, [e.target.name]:e.target.value});
	}

	const handleClick = async () => {
		let url;
		if(files){
			const formData = new FormData();
			formData.append('file', files);
			formData.append('upload_preset', 'hamzawy');
			const upload = await axios.post('https://api.cloudinary.com/v1_1/elselly/image/upload', formData);
			url = upload.data.url;
			console.log(url)
		}
		
		desc = editorRef.current.getContent();
		const urlCreate = 'http://localhost:3000/api/products';
		const res = await axios.put(`${urlCreate}/${_id}/update`, {
			title,
			subtitle,
			price,
			desc,
			image: url || image,
			category,
			subCategory
		});

		router.push(`/products/${res.data._id}`);
	}

	return(
		<Fragment>
			<Head>
        <title>تعديل {post.title}</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
        
      </Head>
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<h3>تعديل {post.title}</h3>
				<div className={styles.item}>
						<label className={styles.label}>الاسم</label>
						<input 
							className={styles.input}
							type='text' 
							name='title'
							value={title}
							onChange={handleChange}
						/>
					</div>
				<div className={styles.item}>
						<label className={styles.label}>اسفل الاسم</label>
						<input 
							className={styles.input}
							type='text' 
							name='subtitle'
							value={subtitle}
							onChange={handleChange}
						/>
					</div>
					<div className={styles.item}>
						<label className={styles.label}>الصور</label>
						<input 
							className={styles.input}
							type='file' 
							onChange={e => setFiles(e.target.files[0])}
						/>
						<div className={styles.imageContainer}>
							<Image width={100} height={100} src={image} alt={title} />
						</div>
					</div>
					<div className={styles.item}>
						<label className={styles.label}>الوصف</label>
						
						<Editor
						apiKey='0xzgp06wpyy2lrtsevxwhxcuasz3cs4rlxdjul1tzo810e78'
							onInit={(evt, editor) => editorRef.current = editor}
							initialValue={!desc ? "" : desc}
							
							// value={}
							// onChange={handleEditorChange}
							init={{
								height: 500,
								menubar: true,
								plugins: [
									'advlist autolink lists link image charmap print preview anchor',
									'searchreplace visualblocks code fullscreen',
									'insertdatetime media table paste code help wordcount'
								],
								toolbar: 'undo redo | formatselect | ' +
								'bold italic backcolor | alignleft aligncenter ' +
								'alignright alignjustify | bullist numlist outdent indent | ' +
								'removeformat | help',
								content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
							}}
						/>
					</div>
					<div className={styles.item}>
						<label className={styles.label}>السعر</label>
						<input 
							className={styles.input}
							type='number' 
							name='price'
							value={price}
							onChange={handleChange}
						/>
					</div>
					
					<div className={styles.item}>
						<label className={styles.label} htmlFor="category">التصنيف</label>
						<select onChange={handleChange} className={styles.input} name="category" value={category} id="category">
							{categories?.map(category => (
								<option  key={category._id} value={category.main}>{category.main}</option>
							))}							
						</select>
					</div>
					<div className={styles.item}>
						<label className={styles.label} htmlFor="category">تحت التصنيف</label>
						<select onChange={handleChange} className={styles.input} name="subCategory" value={subCategory} id="category">
							{allSubCategory?.map((category, i) => {
								// console.log('categpr', category)
							return <option  key={i} value={category}>{category}</option>
							})}							
						</select>
					</div>
					<button onClick={handleClick} className={styles.btn}>Submit</button>

			</div>
		</div>
		</Fragment>
	)
}

export const getServerSideProps = async ctx => {
	const url = 'http://localhost:3000/api/products'
	const res = await axios.get(`${url}/${ctx.query.id}`);

	return {
		props: {
			post: res.data
		}
	}
}

export default UpdateCard;