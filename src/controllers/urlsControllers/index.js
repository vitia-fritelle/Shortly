import { nanoid } from 'nanoid/async';
import utils from '../../utils';
import db from '../../database';
import schemas from '../../schemas';
import services from '../../services';

const { CustomError, joiErrorMessage } = utils;
const { urlsSchema } = schemas;
const { userAuth } = services;

export const shorten = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const userId = await userAuth(authorization);
        const { url } = (
            await urlsSchema
                .validateAsync(req.body)
                .catch(async (error) => {
                    const msg = await joiErrorMessage(error);
                    throw new CustomError(422, msg);
                })
        );
        const shortUrl = await nanoid();
        const values = [url, shortUrl, userId];
        const saveSql = 'INSERT INTO urls(url,"shortUrl","userId") VALUES ($1,$2,$3);';
        await db.client.query(saveSql, values).catch((error) => {
            throw new CustomError(500, error.details);
        });
        res.status(201).json({ shortUrl });
    } catch (e) {
        next(e);
    }
};

export const getUrl = async (req, res, next) => {
    try {
        const { id } = req.params;
        const searchSql = 'SELECT id, "shortUrl", url FROM urls WHERE id = $1';
        const result = (
            await db
                .client
                .query(searchSql, [id])
                .catch((error) => { throw new CustomError(500, error.details); })
        );
        if (result.rowCount === 0) {
            throw new CustomError(404, 'A url não foi encontrada');
        }
        const url = result.rows[0];
        res.status(200).json(url);
    } catch (e) {
        next(e);
    }
};

export const redirect = async (req, res, next) => {
    try {
        const { shortUrl } = req.params;
        const searchSql = 'SELECT id, url FROM urls WHERE "shortUrl" = $1;';
        const result = (
            await db
                .client
                .query(searchSql, [shortUrl])
                .catch((error) => { throw new CustomError(500, error.details); })
        );
        if (result.rowCount === 0) {
            throw new CustomError(404, 'A url não foi encontrada');
        }
        const { id, url } = result.rows[0];
        const addSql = 'INSERT INTO visits("urlId") VALUES ($1);';
        await db.client.query(addSql, [id]).catch((error) => {
            throw new CustomError(500, error.details);
        });
        res.redirect(url);
    } catch (e) {
        next(e);
    }
};

export const remove = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const { id } = req.params;
        const userId = await userAuth(authorization);
        const searchSql = 'SELECT * FROM urls WHERE id = $1';
        const queryResult = (
            await db
                .client
                .query(searchSql, [id])
                .catch((error) => { throw new CustomError(500, error.details); })
        );
        if (queryResult.rowCount === 0) {
            throw new CustomError(404, "The url doesn't exist");
        }
        const urlUser = queryResult.rows[0].userId;
        if (urlUser !== userId) {
            throw new CustomError(
                401,
                'Operation not allowed to this user',
            );
        }
        const deleteSql = 'DELETE FROM urls WHERE id = $1;';
        const removeSql = 'DELETE FROM visits WHERE "urlId" = $1;';
        await Promise.all([
            db.client.query(deleteSql, [id]),
            db.client.query(removeSql, [id]),
        ]).catch((error) => { throw new CustomError(500, error.details); });
        res.sendStatus(204);
    } catch (e) {
        next(e);
    }
};
