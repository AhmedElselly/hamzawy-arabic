import dbConnect from "../../../../utils/mongo";
import Product from "../../../../models/Product";

const handler = async (req, res) => {
	const {method, query: {id}} = req;
	dbConnect();
	console.log(id)
	if(method === 'GET'){
		const product = await Product.findById(id);
		// console.log('product', product)
		const products = await Product.find({_id: {$ne: id},category: product.category});
		return res.json(products);
	}
};

export default handler;