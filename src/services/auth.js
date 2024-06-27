import { UsersCollection } from "../db/models/user"
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { randomBytes } from 'crypto';
import { FIFTEEN_MINUTES, ONE_DAY } from "../constants/index.js";
import { SessionsCollection } from "../db/models/session.js";

export const registerUser = async (payload) => {

    const encryptedPassword = await bcrypt.hash(payload.password, 10);
    return await UsersCollection.create({
        ...payload,
    password:encryptedPassword});
}


export const loginUser = async (payload) => {
    const user = await UsersCollection.findOne({
        email: payload.email
    });
    if (!user) {
        throw createHttpError(404, 'User not found');
    }
    const isEqual = await bcrypt.compare(payload.password, user.password)
    if (!isEqual) {
        throw createHttpError(401, 'Unauthorized')
    }
    await SessionsCollection.create({
        userId: user._id,
        accessToken,
        refreshToken,
        accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
        refreshTokenValidUntil: new Date(Date.now() + ONE_DAY)
    })
};
export const logautUser = async (sessionId) => {
    await SessionsCollection.deleteOne({
        _id:sessionId
    })
}
