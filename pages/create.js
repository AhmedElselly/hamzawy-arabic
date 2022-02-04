import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, Fragment, useRef, useEffect } from 'react';
import styles from '../styles/Create.module.css';
import Head from 'next/head';
import { Editor } from '@tinymce/tinymce-react';
// import { useQuill } from 'react-quilljs';

const Create = props => {
	// const [editorState, setEditorState] = useState(
  //   () => EditorState.createEmpty(),
  // );
	// const { quill, quillRef } = useQuill();
	const editorRef = useRef(null);
	const [files, setFiles] = useState('');
	const [values, setValues] = useState({
		title: '',
		subtitle: '',
		price: '',
		image: '',
		category: ''
	});
	const router = useRouter();

	const {
		title,
		subtitle,
		desc,
		price,
		image,
		file,
		category
	} = values;

	// useEffect(() => {
	// 	if(quill){
	// 		quill.on('text-change', (delta, oldDelta, source) => {
	// 			console.log(quill.root.innerHTML)
	// 			setValues({...values, desc: quill.root.innerHTML});
	// 		})
	// 	}
	// }, [quill]);

	const handleChange = e => {
		
		setValues({...values, [e.target.name]:e.target.value});
	}


	const handleClick = async () => {
		const formData = new FormData();
		formData.append('file', files);
		formData.append('upload_preset', 'hamzawy');
		const upload = await axios.post('https://api.cloudinary.com/v1_1/elselly/image/upload', formData);
		const {url} = upload.data;
		console.log(url)
		desc = editorRef.current.getContent();
		const urlCreate = 'http://localhost:3000/api/products';
		const res = await axios.post(`${urlCreate}`, {
			title,
			subtitle,
			price,
			desc,
			image: url,
			category
		});

		router.push(`/products/${res.data._id}`);
	}

	return(
		<Fragment>
			<Head>
				<title>Create Ordering App</title>
				<meta name="description" content="Best pizza shop in town" />
				<link rel="icon" href="/favicon.ico" />			
		</Head>
		
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<h1 className={styles.title}>إنشاء منتج</h1>
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
						<label className={styles.label}>
							أسفل الاسم
						</label>
						<input 
							className={styles.input}
							type='text' 
							name='subtitle'
							value={subtitle}
							onChange={handleChange}
						/>
					</div>
					<div className={styles.item}>
						<label className={styles.label}>الصورة</label>
						<input 
							className={styles.input}
							type='file' 
							onChange={e => setFiles(e.target.files[0])}
						/>
					</div>
					<div className={styles.item}>
						<label className={styles.label}>الوصف</label>
						{/* <div style={{ width: '100%', height: 200, marginBottom: 100 }}>
							<div ref={quillRef} />
						</div> */}
						{/* <input 
							className={styles.input}
							type='text' 
							name='desc'
							value={desc}
							onChange={handleChange}
						/> */}
						<Editor
						apiKey='0xzgp06wpyy2lrtsevxwhxcuasz3cs4rlxdjul1tzo810e78'
							onInit={(evt, editor) => editorRef.current = editor}
							initialValue={desc ? "" : desc}
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
						<label className={styles.label}>التصنيف</label>
						<input 
							className={styles.input}
							type='text' 
							name='category'
							value={category}
							onChange={handleChange}
						/>
					</div>
					<button onClick={handleClick} className={styles.btn}>إدخال</button>

			</div>
		</div>
		</Fragment>
	)
}

export const getServerSideProps = async ctx => {
	try {
		const myCookie = ctx.req.cookies
		console.log(JSON.parse(myCookie.token).admin)
		
	} catch(err){
		return {
			redirect: {
				destination: '/login',
				permanent: false
			}
		}
	}
	return {
		props: {
			admin: ''
		}
	}
	
}

export default Create;