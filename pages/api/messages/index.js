import dbConnect from '../../../utils/mongo';
import Message from '../../../models';

const handler = async (req, res) => {
	const {method, query} = req;

	if(method === 'GET'){
		const messages = await Message.find();
		return res.json(messages);
	}

	if(method === 'POST'){
		const message = await new Message(req.body);
		message.save((err, message) => {
			if(err) return res.json({err});
			return res.json(message);
		})
	}
}

export default handler;