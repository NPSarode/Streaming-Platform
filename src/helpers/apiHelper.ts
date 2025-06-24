import axios from "axios";

export const axiosApi = axios.create();

// axiosApi.defaults.headers.common["Authorization"] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNWMxZGQ2NTdlZGFkNDc5ZDQ2ZjAzNzI0YjZlMjNlMSIsIm5iZiI6MTczMjIwMDIyMy4wODY0NzQ0LCJzdWIiOiI2NzNmNDU1Njk5OTYxZTNhMTI2NzQ4NWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6MCNAKdfvd7b8DggD6SobLYLWSjisgn7utsEMKxDmKQ`;
axiosApi.defaults.baseURL = "https://api.themoviedb.org/3";


export async function get(url:string, data?:any) {
  return await axiosApi
    .get(url, { ...data })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      if (err.response?.status == 401) {
        window.location.href = `/`;
      }
      return Promise.reject(err.response?.data);
    });
}

export async function post(url:string, data?:any) {
  return axiosApi
    .post(url, { ...data })
    .then((response) => response.data)
    .catch((err) => {
      if (err.response?.status == 401) {
        localStorage.removeItem("token")
        localStorage.removeItem("authUser")
        window.location.href = `/`;
      }
      return Promise.reject(err.response?.data);
    });
}
