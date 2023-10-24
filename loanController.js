const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.newLoan = async (req, res) => {
    loan = {
        loanType: req.body.loanType,
        loanNumber: parseInt(req.body.loanNumber),
        amount: parseInt(req.body.amount),
        interest: parseFloat(req.body.interest),
        loanTermYears: parseFloat(req.body.loanTermYears)
    }
    const newLoan = await prisma.Loan.create({
        data: loan,
    })
    res.status(201)
    return res.send(newLoan);


}
exports.getAllLoans = async (req, res) => {
    var { skip, take } = req.params
    skip = skip ? parseInt(skip) : 0
    take = take ? parseInt(take) : 10
    const loans = await prisma.Loan.findMany({
        skip: skip,
        take: take
    })
    res.send(loans)

}
exports.getLoan = async (req, res) => {

    const { id } = req.params
    try {
        const loan = await prisma.Loan.findUnique({
            where: {
                id: id,
            },
        })
        res.json(loan)
    }
    catch (error) {
        res.json({ error: `Loan with ID ${id} does not exist in the database` })
    }
}
exports.updateLoan = async (req, res) => {
    const { id } = req.params
    data = req.body
    delete data.id
    try {
        const updateLoan = await prisma.Loan.update({
            where: {
                id: id,
            },
            data: data,
        })
        res.status(201)
        res.json(updateLoan)
    }
    catch (error) {
        res.json({ error: `Loan with ID ${id} does not exist in the database` })
    }

}
exports.deleteLoan = async (req, res) => {
    const { id } = req.params
    try {
        const loan = await prisma.Loan.delete({
            where: {
                id: id,
            },
        })
        res.json(loan)
    }
    catch (error) {
        res.json({ error: `Loan with ID ${id} does not exist in the database` })
    }
}