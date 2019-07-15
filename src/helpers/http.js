const buildFormData = function(data = {}) {
  const body = new FormData();

  Object.entries(data).forEach(([name, value]) => {
    if (typeof value === 'undefined' || value === null) {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach(v => body.append(name, v));
    } else {
      body.append(name, value);
    }
  });

  return body;
};

export {
  buildFormData
};
