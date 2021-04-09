const BASE_URL = evalURL();

function evalURL() {
  if (window.location.href.includes("192.168.0")) {
    return "http://192.168.0.108:5055";
  } else {
    return "http://localhost:5055";
  }
}

export default BASE_URL;
