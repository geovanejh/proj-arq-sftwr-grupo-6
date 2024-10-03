import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.0.121:3000/",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjBjNWRmNDlmZmVhNzc2MjQwZWEwNCIsImlhdCI6MTcyNzA1NTk4OX0.Kwf9Ezojy72thQ492dgTlNLWtS71czRZZmQqBGDxawc",
  },
});
