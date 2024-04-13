require('dotenv').config();
const axios = require('axios');
const yargs = require('yargs');

const API_KEY = process.env.EXCHANGE_RATE_API_KEY;
const BASE_URL = 'https://v6.exchangerate-api.com/v6/';

async function convertCurrency(from, to, amount) {
    const url = `${BASE_URL}${API_KEY}/pair/${from}/${to}/${amount}`;

    try {
        const response = await axios.get(url);
        const result = response.data.conversion_result;
        console.log(`${amount} ${from} is approximately ${result} ${to} as per current rates.`);
    } catch (error) {
        console.error('Error converting currency:', error.message);
    }
}

yargs.command({
    command: 'convert',
    describe: 'Convert from one currency to another',
    builder: {
        from: {
            describe: 'Currency you are converting from',
            demandOption: true,
            type: 'string'
        },
        to: {
            describe: 'Currency you are converting to',
            demandOption: true,
            type: 'string'
        },
        amount: {
            describe: 'Amount to convert',
            demandOption: true,
            type: 'number'
        }
    },
    handler(argv) {
        convertCurrency(argv.from, argv.to, argv.amount);
    }
});

yargs.parse();
