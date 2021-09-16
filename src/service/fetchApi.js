export default async function fetchApi(apiUrl) {
  return await fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error("Error:", error);
    });
}
