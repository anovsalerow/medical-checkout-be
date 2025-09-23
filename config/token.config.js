export const tokenConfig = {
    access: {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '1h'
    },
    refresh: {
        secret: process.env.JWT_REFRESH_SECRET,
        epiresIn: '7d'
    }
};