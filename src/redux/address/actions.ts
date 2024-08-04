/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionType } from "./types";
import { Dispatch } from "redux";
import { AddressProps, IAddress, IPostOffice } from "../../Component/Types";
import axios from "axios";
import axiosInstance from "../../axiosInstance";
import API_ENDPOINTS from "../../config/apiconfig";

interface Spinner {
  type: ActionType.SPINNER;
  payload: boolean;
}

interface GetAddress {
  type: ActionType.GET_ADDRESS;
  payload: IAddress[];
}

export const setSpinner = (isSpin: boolean) => {
  return {
    type: ActionType.SPINNER,
    payload: isSpin,
  };
};

export const postAddress =
  (address: AddressProps, headers: any) => (dispatch: Dispatch) => {
    console.log(headers, "headers666");
    dispatch(setSpinner(true));
    const userId = headers.userId;
    axiosInstance
      ?.post(`${API_ENDPOINTS.addAdress}`, { ...address, userId }, { headers })
      .then(() => {
        dispatch(setSpinner(false));
        dispatch(getAddress(headers) as any);
      })
      .catch((error) => {
        console.log(error);
        dispatch(setSpinner(false));
      });
  };

export const setAddress = (data: AddressProps[]) => {
  return {
    type: ActionType.GET_ADDRESS,
    payload: data,
  };
};

export const getAddress = (headers: any) => (dispatch: Dispatch) => {
  dispatch(setSpinner(true));
  axiosInstance
    ?.get(`${API_ENDPOINTS.getAdress}`, { headers })
    .then((response) => {
      dispatch(setAddress(response.data));
      dispatch(setSpinner(false));
    })
    .catch((error) => {
      console.log(error);
      dispatch(setSpinner(false));
    });
};

export const setRemoveAddress = (data: number) => {
  return {
    type: ActionType.REMOVE_ADDRESS,
    payload: data,
  };
};

export const deleteAddress =
  (id: string, headers: any) => (dispatch: Dispatch) => {
    headers.id = id;
    dispatch(setSpinner(true));
    axiosInstance
      .delete(`${API_ENDPOINTS.deleteAdress}`, { headers })
      .then((response) => {
        dispatch(setRemoveAddress(response.data));
        dispatch(getAddress(headers) as any);
        dispatch(setSpinner(false));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setSpinner(false));
      });
  };

export const updateAddress =
  (address: AddressProps, id?: string, headers?: any) =>
  (dispatch: Dispatch) => {
    console.log(address, id, headers, "jucgaiudsga");
    dispatch(setSpinner(true));
    axiosInstance
      ?.put(`${API_ENDPOINTS.editAdress}`, address, {
        headers,
      })
      .then(() => {
        dispatch(setSpinner(false));
        dispatch(getAddress(headers) as any);
      })
      .catch((error) => {
        console.log(error);
        dispatch(setSpinner(false));
      });
  };

interface GetPin {
  type: ActionType.GET_PIN;
  payload: IPostOffice;
}

export const setPin = (data: IPostOffice) => {
  return {
    type: ActionType.GET_PIN,
    payload: data,
  };
};

export const getPin = (pin: string) => (dispatch: Dispatch) => {
  dispatch(setSpinner(true));
  axios
    .get(`https://api.postalpincode.in/pincode/${pin}`)
    .then((response) => {
      dispatch(setPin(response.data[0].PostOffice[0]));
      dispatch(setSpinner(false));
    })
    .catch((error) => {
      console.log(error);
      dispatch(setSpinner(false));
    });
};

export type Action = Spinner | GetAddress | GetPin;
