/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '../axiosInstance'
import { LoginUserState, ReduxData } from '../Component/Types'
import API_ENDPOINTS from '../config/apiconfig'

export const filledStar = (item: ReduxData) => {
    const filledStar = []
    for (let i = 0; i < Math.floor(item.rating.rate); i++) {
        filledStar.push(i)
    }
    return filledStar
}

export const emptyStar = (item: ReduxData) => {
    const emptyStar = []
    for (let i = 0; i < 5 - Math.floor(item.rating.rate); i++) {
        emptyStar.push(i)
    }
    return emptyStar
}

export const searchFunc = (item: string, search: string) => {
    return item?.toLowerCase().includes(search.toLowerCase())
}

export const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts?.pop()?.split(";").shift();
};

export const deleteCookie = (name: string) => {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export const loginApiCall = async (user: LoginUserState) => {
    const response = await axiosInstance?.post(`${API_ENDPOINTS.loginUser}`, user)
    const { data: { jwtToken, tokenObject: { _id: userId, fullName } }, status } = response
    if (status === 200) {
        document.cookie = `authToken=${jwtToken}`;
        document.cookie = `userId=${userId}`;
        document.cookie = `fullName=${fullName}`;
    }
    return fullName;
}