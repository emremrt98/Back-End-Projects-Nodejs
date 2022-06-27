const router = require('express').Router();
const blogController = require('../controllers/blog_controller');

router.post('/', blogController.searching);
router.get('/', blogController.getAllArticle);
router.get('/:id', blogController.getOneArticle);



module.exports = router;


