import dbConnect from '../../../utils/mongo';
import Product from '../../../models/Product';

const handler = async (req, res) => {
	const {method, query} = req;
	dbConnect();
	if(method === 'GET'){
		if(query.search || query.min || query.max){
			console.log('querymongo', query)
			console.log(req.query)
			
			console.log('req.body', req.query.min, req.query.max)
			const dbQuery = {'$or': []};
			// let dbQuery = [];
			const {search, min, max} = req.query;
			let regex = new RegExp(search,'i');
			if(search !== undefined){
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
			const products = await Product.paginate(dbQuery, {
				page: Number(query.page),
				limit: 8
			});
			return res.json(products);
		} else {
			console.log('in none query')
			const products = await Product.paginate({}, {
				page: Number(query.page),
				limit: 8
			});
			return res.json(products);
		}
		
	
	}

	if(method === 'POST'){
		try {
			console.log(req.body);
			const product = await new Product(req.body);
			product.save((err, product) => {
				if(err) return res.status(500).json({err});
				return res.json(product);
			})
			

		} catch (error) {
			res.status(500).json({error})
		}
	}
}

export default handler;