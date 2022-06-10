import pg from 'pg';
import config from '../config';

const { Pool } = pg;

const DB = function _(user, password, host, port, database) {
    const pool = config.database.url ? new Pool({
        user,
        password,
        host,
        port,
        database,
    }) : new Pool({ connectionString: config.database.url });
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
);

export default db;
