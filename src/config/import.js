const availableTypes = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
];

const typeValid = function(file) {
  return availableTypes.includes(file.type);
};

export {
  availableTypes,
  typeValid
};
