import bcrypt from 'bcrypt-nodejs';

export async function passwordHash(password) {
  const saltRounds = 10;
  const salt       = await bcrypt.genSaltSync(saltRounds);
  return await bcrypt.hashSync(password, salt);
}

export async function passwordCompare(password, hash) {
  return await bcrypt.compareSync(password, hash);
}

export function setError(ctx, error) {
  const errors = Object.keys(error.errors);
  ctx.status = 403;
  ctx.body = {
    message: error.message,
    errors
  };
}

export function setSuccess(ctx, data) {
  ctx.status = 200;
  ctx.body   = data;
}
