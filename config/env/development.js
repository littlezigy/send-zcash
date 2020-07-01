module.exports = {
    database: {
        connection: {
            host: 'localhost',
            port: '5432',
            user: 'postgres',
            password: 'password',
            database: 'send_zcash',
            connectionString: 'postgresql://adesuwa:password@localhost:5432/zcash'
        },
        debug: true
    },
    cors: {
        origin: [],
        credentials: true
    }
}
