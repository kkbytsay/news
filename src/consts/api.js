const baseUrl = process.env.API_URL;

export const getPosts = () => {
  fetch(baseUrl + "/articles").then((res) => {
    console.log(res);
    return res.json();
  });
};
