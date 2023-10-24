const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.newLedger = async (req, res) => {
    ledger = {
        paymentAmount: parseInt(req.body.paymentAmount),
        interest: parseFloat(req.body.interest),
        principal: parseFloat(req.body.principal),
    }
    const newLedger = await prisma.Ledger.create({
        data: ledger,
    })
    res.status(201)
    return res.json(newLedger);


}
exports.getAllLedgers = async (req, res) => {
    var { skip, take } = req.params
    skip = skip ? parseInt(skip) : 0
    take = take ? parseInt(take) : 10
    const ledgers = await prisma.Ledger.findMany({
        skip: skip,
        take: take
    })
    res.json(ledgers)

}
exports.getLedger = async (req, res) => {

    const { id } = req.params
    try {
        const ledger = await prisma.Ledger.findUnique({
            where: {
                id: id,
            },
        })
        res.json(ledger)
    }
    catch (error) {
        res.json({ error: `Ledger with ID ${id} does not exist in the database` })
    }
}
exports.updateLedger = async (req, res) => {
    const { id } = req.params
    data = req.body
    delete data.id
    try {
        const updateLedger = await prisma.Ledger.update({
            where: {
                id: id,
            },
            data: data,
        })
        res.status(201)
        res.json(updateLedger)
    }
    catch (error) {
        res.json({ error: `Ledger with ID ${id} does not exist in the database` })
    }

}
exports.deleteLedger = async (req, res) => {
    const { id } = req.params
    try {
        const ledger = await prisma.Ledger.delete({
            where: {
                id: id,
            },
        })
        res.json(ledger)
    }
    catch (error) {
        res.json({ error: `Ledger with ID ${id} does not exist in the database` })
    }
}