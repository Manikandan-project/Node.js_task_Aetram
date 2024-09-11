const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// PostgreSQL connection configuration
const client = new Client({
    user: 'user_name',
    host: 'localhost',
    database: 'database',
    password: 'password',
    port: 5432,
});

async function uploadData() {
    try {
        await client.connect();

        // Read file data (assuming CSV format)
        const data = fs.readFileSync(path.join(__dirname, 'data.csv'), 'utf-8');
        const rows = data.split('\n').map(row => row.split(','));

       
        for (let row of rows) {
            const query = 'INSERT INTO data_upload(id, name, age) VALUES($1, $2, $3)';
            await client.query(query, row);
        }

        console.log('Data uploaded successfully.');
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.end();
    }
}

uploadData();
