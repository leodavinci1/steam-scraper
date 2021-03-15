const router = require("express").Router();
const asyncMiddleware = require('../middleware/async')
const projectController = require('../controllers/project')

router.get('/:cid/project/', asyncMiddleware(projectController.getProjects))
router.get('/:cid/project/:pid', asyncMiddleware(projectController.getProject))
router.post('/:cid/project/', asyncMiddleware(projectController.addProject))
router.delete('/:cid/project/:pid', asyncMiddleware(projectController.deleteProject))

module.exports = router