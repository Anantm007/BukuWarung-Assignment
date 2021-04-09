export const sortUsers = async (users, order, attribute, limit = 100) => {
  const sortedUsers = users.sort(function (a, b) {
    if (order === "ascending") {
      if (a[attribute] > b[attribute]) {
        return 1;
      } else {
        return -1;
      }
    }

    if (order === "descending") {
      if (a[attribute] < b[attribute]) {
        return 1;
      } else {
        return -1;
      }
    }

    return 0;
  });

  return sortedUsers.slice(0, limit);
};
