export const cookieConfig = {
    access: {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        sameSite: "None",
        secure: true
    },
    refresh: {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "None",
        secure: true
    }
};