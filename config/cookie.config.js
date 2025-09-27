export const cookieConfig = {
    access: {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        SameSite: none
    },
    refresh: {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        SameSite: None
    }
};