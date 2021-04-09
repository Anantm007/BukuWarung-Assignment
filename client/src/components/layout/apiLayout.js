import BASE_URL from "../../utils/baseUrl";

// Get all records
export const numberofRecords = async () => {
  return fetch(`${BASE_URL}/api/users/count`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
