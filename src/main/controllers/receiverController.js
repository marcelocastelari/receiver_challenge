module.exports = {
    async list(req, res) {
        try {
            const response = await listReceivers()
            res.status(200).send(response)
        } catch (error) {
            res.status(400).send(error.message)
        }
    },

    async create(req, res) {
        try {
            const response = await createReceiver(req.body)
            res.status(201).send(response)
        } catch (error) {
            res.status(400).send(error.message)
        }
    },

    async edit(req, res) {
        try {
            const response = await editReceiver(req.body)
            res.status(200).send(response)
        } catch (error) {
            res.status(400).send(error.message)
        }
    },

    async delete(req, res) {
        try {
            const response = await deleteReceiver(req.body)
            res.status(200).send(response)
        } catch (error) {
            res.status(400).send(error.message)
        }
    },

    async bulkDelete(req, res) {
        try {
            const response = await bulkDeleteReceivers(req.body)
            res.status(200).send(response)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
}