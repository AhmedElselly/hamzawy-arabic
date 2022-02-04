import dbConnect from '../../../../utils/mongo';
import Category from '../../../../models/Category';

const handler = async (req, res) => {
    const {method, query: {name}} = req;

    if(method === 'PUT'){
        const category = await Category.findOne({name});
        
        category.subCategory.push(req.body.subCategory);

        category.save((err, category) => {
            if(err) return res.json({err});
            return res.json(category);
        })
    }

    if(method === 'GET'){
        console.log('name', name)
        const category = await Category.findOne({main: `${name}`});
        return res.json(category);
    }
}

export default handler;