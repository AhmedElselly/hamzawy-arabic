import dbConnect from '../../../utils/mongo';
import Product from '../../../models/Product';


const handler = async (req, res) => {
	const {method} = req;
	dbConnect();
	if(method === 'GET'){
		// console.log(req.query)
		
		console.log('req.body', req.query.min, req.query.max)
		const dbQuery = {'$or': []};
		// let dbQuery = [];
		const {search, min, max} = req.query;
		let regex = new RegExp(search,'i');
		if(search){
			dbQuery['$or'].push(					
				{title: regex},
				{desc: regex},
				{category: regex},			
				{subCategory: regex},					
			)			
		}

		if(min){
			dbQuery['price'] = {$gte: Number(min)};
		}
		if(max){
			dbQuery['price'] = {$lte: Number(max)};
		}
		console.log('dbQuery', dbQuery)
		// dbQuery = dbQuery.length ? {$and: dbQuery} : {};
		const products = await Product.find(dbQuery);
		// const products = await Product.find({title: search});
		console.log('products', products)
		return res.json(products);
		
	}
}

export default handler;