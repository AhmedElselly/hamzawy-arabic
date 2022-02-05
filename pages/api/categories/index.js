import dbConnect from '../../../utils/mongo';
import Category from '../../../models/Category';

const handler = async (req, res) => {
    const {method} = req;

    if(method === 'POST'){
        const category = await new Category(req.body);
             

        category.save((err, category) => {
            if(err) return res.json({err});
            return res.json(category);
        })
    }

    if(method === 'GET'){
        const categories = await Category.find().limit(7);
        
        return res.json(categories);
    }
}

export default handler;