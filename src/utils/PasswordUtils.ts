import bcrypt from 'bcrypt';
import {BCRYPT_SALT_ROUNDS} from "../configs/bcryptConfig";

export function passwordEncryption(password: string): string {
    const salt = bcrypt.genSaltSync(BCRYPT_SALT_ROUNDS);
    return bcrypt.hashSync(password, salt);
}