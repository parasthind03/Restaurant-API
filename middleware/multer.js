const multer = require('multer');
const sharp = require('sharp');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true);
	} else {
		cb(new Error('Not an image! Please upload an image'));
	}
};

const upload = multer({
	storage: multerStorage,
	limits: {
		fileSize: 5000000
	},
	fileFilter: multerFilter
});

const resizePicture = async (req, res, next) => {
	// console.log(req.file)
	if (!req.file) return next();

	let photo = `item-${req.params.id}-${Date.now()}-cover.jpeg`;
	req.body.photoUrl = `${req.protocol}://${req.get(
		'host'
	)}/public/img/items/item-${req.params.id}-${Date.now()}-cover.jpeg`;
	await sharp(req.file.buffer)
		.resize(2000, 1333)
		.toFormat('jpeg')
		.jpeg({ quality: 90 })
		.toFile(`public/img/items/${photo}`);

	next();
};

module.exports = { upload, resizePicture };
