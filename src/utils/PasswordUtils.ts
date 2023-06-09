import {BCRYPT_SALT_ROUNDS} from "../config/bcryptConfig";
import * as bcrypt from "bcrypt";

export function passwordEncryption(password: string): string {
    const salt = bcrypt.genSaltSync(BCRYPT_SALT_ROUNDS);
    return bcrypt.hashSync(password, salt);
}