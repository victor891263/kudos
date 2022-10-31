function validate(fields, schemas) {
    for (let i = 0; i < fields.length; i++) {
        // CHECK IF DATA IS IN THE RIGHT FORMAT
        const { error } = schemas[i].validate(fields[i])
        if (error) throw new Error('Given data is not in the right format');
    }
}

function validateREST(fields, schemas, callback) {
    for (let i = 0; i < fields.length; i++) {
        // CHECK IF ALL FIELDS ARE PRESENT
        if (!fields[i]) {
            callback()
            throw new Error('Some fields are empty')
        }

        // CHECK IF DATA IS IN THE RIGHT FORMAT
        const { error } = schemas[i].validate(fields[i])
        if (error) {
            callback()
            throw new Error('Given data is not in the right format')
        }
    }
}

module.exports = { validate, validateREST }