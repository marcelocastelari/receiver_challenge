const queryByField = (field) => {
    const { status, name, pixKeyType, pixKey } = field
    const query = {};

    if (status) {
        query.status = status;
    }
    if (name) {
        query.name = name;
    }
    if (pixKeyType) {
        query.pix_key_type = pixKeyType;
    }
    if (pixKey) {
        query.pix_key = pixKey;
    }

    return query;
}

module.exports = { queryByField }
