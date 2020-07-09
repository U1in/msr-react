const GET_TEST = () => {
  return {
    url: '/test',
    method: 'GET',
  }
};

const CSRF = () => {
  return {
    url: '/csrf',
    method: 'GET',
  }
}

export default {
  GET_TEST,
  CSRF,
}
