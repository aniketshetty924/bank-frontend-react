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

export function selectTableAttribute(data, requiredColumns) {
  return data.map((user) => {
    const filteredUser = {};
    requiredColumns.forEach((column) => {
      if (user.hasOwnProperty(column)) {
        filteredUser[column] = user[column];
      }
    });
    return filteredUser;
  });
}
