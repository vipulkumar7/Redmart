/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { getCookie } from '../commonFunction';
import { API_BASE_URL } from '../config/apiconfig';

// const createApiClient = (): AxiosInstance | null => {
//     const token: string | undefined = getCookie('authToken');

//     console.log(token, 'token in axios instance createApiClient');
//     if (!token) {
//         console.error('Token is undefined!');
//         return null;
//     }

//     return axios.create({
//         baseURL: `${API_BASE_URL}`,
//         headers: {
//             'Authorization': token,
//             'Content-Type': 'application/json'
//         }
//     });
// };

// let axiosInstance: AxiosInstance | null = createApiClient();

// if (axiosInstance) {
//     axiosInstance.interceptors.request.use(
//         (config: any) => {
//             const token: string | undefined = getCookie('authToken');
//             console.log(token, 'token in axios instance if condtion');

//             if (token) {
//                 config.headers['Authorization'] = token;
//             }
//             return config;
//         },
//         error => {
//             return Promise.reject(error);
//         }
//     );

//     axiosInstance.interceptors.response.use(
//         response => response,
//         error => {
//             if (error.response?.status === 401) {
//                 window.location.href = '/login';
//             }
//             return Promise.reject(error);
//         }
//     );
// }

// // Refresh axios instance on page load to ensure token is up-to-date
// window.addEventListener('load', () => {
//     axiosInstance = createApiClient();
// });

// export default axiosInstance


// Create an Axios instance with default settings

const token: string | undefined = getCookie('authToken');

const axiosInstance = axios.create({
    baseURL: `${API_BASE_URL}`, // Replace with your API's base URL
    timeout: 5000, // Optional timeout setting in milliseconds
    headers: {
        'Authorization': token as string,
        'Content-Type': 'application/json'
    } // Optional default headers
});

export default axiosInstance
