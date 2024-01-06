export const validation = (body) => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneNumberRegex = /^\d+$/;
    const numericIdRegex = /^\d+$/;

    return ((emailRegex.test(body.mail)) && (phoneNumberRegex.test(body.phoneNumber))
        && (numericIdRegex.test(body.id))
        && (body.birthDay.trim().length > 0)
        && (body.id.trim().length > 0)
        && (body.name.trim().length > 0)

    );
}