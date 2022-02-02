import dbConnect from '../../../utils/mongo';
import Product from '../../../models/Product';


const handler = async (req, res) => {
	const {method} = req;
	dbConnect();
	if(method === 'GET'){
		// console.log(req.query)
		
			console.log('req.body', req.query)
			const dbQuery = {'$or': []};
			const {search, min, max} = req.query;
			if(search){
				dbQuery['$or'].push(					
					{title: search.toLowerCase()},
					{desc: search.toLowerCase()},
					{category: search.toLowerCase()}				
				)
			}

			if(min){
				dbQuery.push({price: {$gte: min}});
			}
			if(max){
				dbQuery.push({price: {$lte: max}});
			}
			console.log('dbQuery', dbQuery)
			const products = await Product.find(dbQuery);
			// const products = await Product.find({title: search});
			console.log('products', products)
			return res.json(products);
		
	}
}

export default handler;