const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.newCustomer = async (req, res) => {
    customer = {
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        dateOfBirth: Date.parse(req.body.dateOfBirth),
    }
    const newCustomer = await prisma.Customer.create({
        data: customer,
    })
    res.status(201)
    return res.json(newCustomer);


}
exports.getAllCustomers = async (req, res) => {
    var { skip, take } = req.params
    skip = skip ? parseInt(skip) : 0
    take = take ? parseInt(take) : 10
    const customers = await prisma.Customer.findMany({
        skip: skip,
        take: take
    })
    res.json(customers)

}
exports.getCustomer = async (req, res) => {

    const { id } = req.params
    try {
        const customer = await prisma.Customer.findUnique({
            where: {
                id: id,
            },
        })
        res.json(customer)
    }
    catch (error) {
        res.json({ error: `Customer with ID ${id} does not exist in the database` })
    }
}
exports.updateCustomer = async (req, res) => {
    const { id } = req.params
    data = req.body
    delete data.id
    try {
        const updateCustomer = await prisma.Customer.update({
            where: {
                id: id,
            },
            data: data,
        })
        res.status(201)
        res.json(updateCustomer)
    }
    catch (error) {
        res.json({ error: `Customer with ID ${id} does not exist in the database` })
    }

}
exports.deleteCustomer = async (req, res) => {
    const { id } = req.params
    try {
        const customer = await prisma.Customer.delete({
            where: {
                id: id,
            },
        })
        res.json(customer)
    }
    catch (error) {
        res.json({ error: `Customer with ID ${id} does not exist in the database` })
    }
}