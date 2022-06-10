import db from '../../database';
import utils from '../../utils';
import services from '../../services';

const { CustomError } = utils;
const { userAuth } = services;

const userStatus = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const { id } = req.params;
        await userAuth(authorization);
        const searchSql = 'SELECT * FROM users WHERE id=$1';
        const urlsSql = `
        SELECT urls.id, 
            urls.url, 
            urls."shortUrl", 
            (SELECT COUNT(*) 
                FROM visits 
                WHERE visits."urlId" = urls.id) as "countValues" 
        FROM urls
        WHERE urls."userId" = $1;`;
        const results = await Promise.all([
            db.client.query(searchSql, [id]),
            db.client.query(urlsSql, [id]),
        ]);
        if (results[0].rowCount === 0) {
            throw new CustomError(404, 'User was not found');
        }
        const shortenedUrls = results[1].rows;
        const totalVisits = shortenedUrls.reduce((acc, curr) => {
            const { countValues } = curr;
            return acc + parseInt(countValues, 10);
        }, 0);
        res.status(200).json({
            id: results[0].rows[0].id,
            name: results[0].rows[0].name,
            visitCount: `${totalVisits}`,
            shortenedUrls,
        });
    } catch (e) {
        next(e);
    }
};

export default userStatus;
