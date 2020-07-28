import { BASE_URL } from '../config';
import { IDeployService } from './IDeployService';

export class DeployService implements IDeployService {
  headers: any = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  async create(data: any): Promise<Object> {
    console.log('working');
    const url = `${BASE_URL}/api/v1/create`;
    let response: any;
    try {
      response = await fetch(url, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(data),
      });
    } catch (error) {
      if (error.message != null && error.message.indexOf('Failed to fetch') !== -1) {
        return Promise.reject('Network error. Check your network and try again.');
      } else {
        return Promise.reject(error);
      }
    }

    try {
      const data = await response.json();
      if (response.status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject('Request error, please try again later.');
      }
    } catch (error) {
      return Promise.reject(`Error while creating: ${error}`);
    }
  }

  async updateByUID(data: any, uid: string): Promise<Object> {
    const url = `${BASE_URL}/api/${uid}`;
    let response: any;
    try {
      response = await fetch(url, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify(data.append(uid)),
      });
    } catch (error) {
      if (error.message != null && error.message.indexOf('Failed to fetch') !== -1) {
        return Promise.reject('Network error. Check your network and try again.');
      } else {
        return Promise.reject(error);
      }
    }

    try {
      const data = await response.json();
      if (response.status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject('Request error, please try again later.');
      }
    } catch (error) {
      return Promise.reject(`Error while updating with UID: ${error}`);
    }
  }
}
