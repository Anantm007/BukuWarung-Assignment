import BASE_URL from "../../utils/baseUrl";
import axios from "axios";

// Get all records
export const getAllRecords = async (id) => {
  return fetch(`${BASE_URL}/api/users`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get a particular record
export const getRecord = async (id) => {
  return fetch(`${BASE_URL}/api/users/${id}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Add a record
export const addRecord = (data, img) => {
  const newData = data;
  newData.avatar = img;

  return fetch(`${BASE_URL}/api/users`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Upload file to  cloudinary
export const uploadImage = (uploadedImage) => {
  const form = new FormData();
  form.append("file", uploadedImage);
  form.append("upload_preset", "dates-matato");

  return axios
    .post("https://api.cloudinary.com/v1_1/matato/upload", form)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};

// Update record
export const updateRecord = async (id, data) => {
  return fetch(`${BASE_URL}/api/users/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Remove the record
export const deleteRecord = (id) => {
  return fetch(`${BASE_URL}/api/users/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
