import { UsersCollection } from "../db/models/user"


export const registerUser = async(payload)    => {
    return await UsersCollection.create(payload);
}
