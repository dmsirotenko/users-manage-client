import Axios from 'axios';

import { apiBaseUrl, endpoints } from '../config/api';
import { buildFormData } from '../helpers/http';

const baseURL = apiBaseUrl + endpoints.users;

const axios = Axios.create({
  baseURL
});

export default class Users {
  static get(id) {
    return axios.get(`/${id}`);
  }

  static create(userObj) {
    return axios.post('/', userObj);
  }

  static update(id, userObj) {
    return axios.patch(`/${id}`, userObj);
  }

  static delete(id) {
    return axios.delete(`/${id}`);
  }

  static list(sortParams = {}) {
    let sort = Object.entries(sortParams)
      .map(([col, dir]) => `${col}.${dir}`)
      .join(",");

    let params;

    if (sort) {
      params = { sort };
    }

    return axios.get('/', { params });
  }

  static search(searchParams = {}) {
    return axios.get('/search', { params: searchParams })
  }

  static import(file) {
    let formData = buildFormData({ file });

    return axios.post('/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
}
