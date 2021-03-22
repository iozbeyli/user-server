const validate = (
  keys: Array<{ name: string; key: string }>,
  data: { [key: string]: string }
) => {
  const errors: any = {};
  for (const key of keys) {
    if (!data[key.key]) {
      errors[key.name] = { message: `${key.name} cannot be empty!` };
    }
  }
  return errors;
};

export default validate;
