/* eslint-disable prettier/prettier */

const JWT_SECRET = process.env.JWT_SECRET || 'Ufa Ewa Amedi';

const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT || '10', 10);

export const jwtConstants = {
        secret: JWT_SECRET,
        saltRounds: BCRYPT_SALT_ROUNDS
};

