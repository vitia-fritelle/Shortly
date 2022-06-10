import pg from 'pg';
import config from '../config';

const { Pool } = pg;

const DB = function _(user, password, host, port, database, url) {
    const pool = url ? new Pool({ connectionString: url }) : new Pool({
        user,
        password,
        host,
        port,
        database,
    });
    this.connect = async () => {
        this.client = await pool.connect();
    };
};

const db = new DB(
    config.database.user,
    config.database.password,
    config.database.host,
    config.database.port,
    config.database.database,
    config.database.url,
);

export default db;
