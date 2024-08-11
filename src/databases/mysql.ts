import mysql, { Connection} from 'mysql2';

const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'Library'
};

const mysqlConnection: Connection = mysql.createConnection(dbConfig);

mysqlConnection.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        throw err;
    }
    console.log('MYSQL connected');
});

export function executarComandoSQL(query: string, values: any[]): Promise<any> {
    return new Promise<any>(
        (resolve, reject) => {
            mysqlConnection.query(query, values, (err, result: any) => {
                if (err) {
                    reject(err);
                    throw err;
                }
                resolve(result);
            });
        }
    )
}
