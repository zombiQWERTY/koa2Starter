function setup(type) {
  return `mongodb://mongo:27017/projectname_${type}`;
}

export const development = setup('development');
export const production  = setup('production');
export const test        = setup('testing');
