const receiverService = require('../services/receiverService')

module.exports = {
    async list(req, res) {
        try {
            const response = await receiverService.listReceivers(req);
            res.status(200).send(response)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    },

    async create(req, res) {
        try {
            const response = await receiverService.createReceiver(req.body)
            res.status(201).send({ message: 'Receiver created successfully' })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    },

    async edit(req, res) {
        try {
            await receiverService.editReceiver(req)
            res.status(200).send({ message: 'Receiver updated successfully' })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    },

    async delete(req, res) {
        try {
            await receiverService.deleteReceiver(req.params.id)
            res.status(200).send({ message: 'Receiver deleted successfully'})
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    },

    async bulkDelete(req, res) {
        try {
            await receiverService.bulkDeleteReceivers(req.body)
            res.status(200).send({ message: 'Bulk delete completed successfully' })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
}