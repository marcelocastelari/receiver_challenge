const receiverController = require('../controllers/receiverController');

module.exports = (router) => {
    router.get('/receiver', receiverController.list);
    router.post('/receiver', receiverController.create);
    router.put('/receiver/:id', receiverController.edit);
    router.delete('/receiver/:id', receiverController.delete);
    router.post('/receiver/bulk-delete', receiverController.bulkDelete);
}