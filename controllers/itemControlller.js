const Item = require('../models/item');

exports.getAllItems = async (req, res, next) => {
	try {
		const items = await Item.find({available: true}, { __v: 0 });
		if (items.length === 0) {
			throw new Error('No items are available');
		}
		res.status(200).json({
			status: 'success',
			results: items.length,
			items
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			msg: error.message
		});
	}
};

exports.getItem = async (req, res, next) => {
  try {
    // console.log(req.params.id)
    const item = await Item.findOne({id: req.params.id}, {__v: 0})
    // console.log(item)
    if(!item || !item.available) {
      throw new Error('The item is not available.')
    }   
    res.status(200).json({
      status: 'success',
      item
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      msg: error.message
    });
  }
}

exports.addItem = async (req, res, next) => {
	try {
		const { name } = req.body;
		if ((await Item.findOne({ name })) != null) {
			throw new Error('The item already exits.');
		}
		const item = new Item(req.body);
		await item.save();

		res.status(200).json({
			status: 'success',
			item
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			msg: error.message
		});
	}
};
