const {PrismClient} = require('@prisma/client');
const {config} = require('.');
const globalforPrisma = global

const prisma = globalforPrisma.prisma ?? new PrismClient({});

if(config.NODE_ENV === 'production') {
    globalforPrisma.prisma = prisma
}

module.exports = prisma