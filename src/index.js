import app from './app';
import config from './config';
import db from './database';

const port = config.PORT || 4000;

app.listen(port, async () => {
    await db.connect();
    console.log(`O servidor está escutando em http://localhost:${port}`);
});
