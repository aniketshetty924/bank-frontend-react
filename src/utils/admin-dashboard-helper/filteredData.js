export const userHelperFilter = (data, fields) => {
  return data.map((item) => {
    const filteredItem = {};
    fields.forEach((field) => {
      if (item.hasOwnProperty(field)) {
        filteredItem[field] = item[field];
      }
    });
    return filteredItem;
  });
};
