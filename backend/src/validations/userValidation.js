export function validateCreateUser(body){
    const { nombre, email, password} = body;
    const errors = [];
    if(!nombre) errors.push('nombre es requerido');
    if(!email) errors.push('email es requerido');
    if(!password) errors.push('passwprd es requerido');
    return errors;
}