export const sortUsers = async (users, order, attribute) => {
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

  console.log(sortedUsers);
  return sortedUsers;
};
