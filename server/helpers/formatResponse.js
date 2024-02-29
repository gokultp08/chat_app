const formatUserResponse = (data) => {
  return {
    id: data.id,
    email: data.email,
    name: data.name,
  };
};

module.exports = { formatUserResponse };
