import db from '../../database';

const getRanking = async (req, res, next) => {
    try {
        const rankingSql = `
            SELECT users.id, 
                users.name, 
                COUNT(DISTINCT urls.id) as "linksCount", 
                COUNT(visits.id) as "visitCount"
            FROM users
            JOIN urls
            ON users.id = urls."userId"
            LEFT JOIN visits
            ON urls.id = visits."urlId"
            GROUP BY users.id
            ORDER BY "visitCount" DESC
            LIMIT 10;
        `;
        const result = await db.client.query(rankingSql);
        res.status(200).send(result.rows);
    } catch (e) {
        next(e);
    }
};

export default getRanking;
