// import { addtoCart } from './../cartPage/actions';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionType } from "./types";
import { Dispatch } from "redux";
import { ReduxData } from "../../Component/Types";
import axios from "axios";
import axiosInstance from "../../axiosInstance";
import API_ENDPOINTS from "../../config/apiconfig";

interface GetCart {
  type: ActionType.GET_CART;
  payload: ReduxData[];
}

interface AddToCart {
  type: ActionType.ADD_TO_CART;
  payload: ReduxData[];
}

interface Spinner {
  type: ActionType.SPINNER;
  payload: boolean;
}

export const setCartSpinner = (isSpin: boolean) => {
  console.log(isSpin, 'isSpin')
  return {
    type: ActionType.SPINNER,
    payload: isSpin,
  };
};

export const setGetCart = (data: ReduxData[]) => {
  return {
    type: ActionType.GET_CART,
    payload: data,
  };
};

export const getCart = (headers: any) => (dispatch: Dispatch) => {
  dispatch(setCartSpinner(true));
  axiosInstance
    ?.get(`${API_ENDPOINTS.getCart}`, { headers })
    .then((response) => {
      dispatch(setGetCart(response.data.data));
      dispatch(setCartSpinner(false));
    })
    .catch((error) => {
      console.log(error);
      dispatch(setCartSpinner(false));
    });
};

export const postCart =
  (cart: ReduxData, headers: any, userId: string) => (dispatch: Dispatch) => {
    const cartDetails = { ...cart, userId };
    dispatch(setCartSpinner(true));
    axiosInstance
      ?.post(`${API_ENDPOINTS.addToCart}`, cartDetails, { headers })
      .then((_response) => {
        dispatch(setCartSpinner(false));
        dispatch(getCart(headers) as any);
      })
      .catch((error) => {
        console.log(error);
        dispatch(setCartSpinner(false));
      });
  };

export const cartIncrement =
  (id: string, headers: any) => (dispatch: Dispatch) => {
    const userId = headers.userId
    dispatch(setCartSpinner(true));
    axiosInstance
      ?.post(`${API_ENDPOINTS.increaseCart}/${id}`, { userId }, { headers })
      .then((_response) => {
        dispatch(setCartSpinner(false));
        dispatch(getCart(headers) as any);
      })
      .catch((error) => {
        console.log(error);
        dispatch(setCartSpinner(false));
      });
  };

export const cartDecrement = (id: string, headers: any) => (dispatch: Dispatch) => {
  const userId = headers.userId
  dispatch(setCartSpinner(true));
  axiosInstance
    ?.post(`${API_ENDPOINTS.decreaseCart}/${id}`, {userId}, {headers})
    .then((_response) => {
      dispatch(getCart(headers) as any);
      dispatch(setCartSpinner(false));
    })
    .catch((error) => {
      console.log(error);
      dispatch(setCartSpinner(false));
    });
};

export const deleteCart =
  (id: number, headers: any) => (dispatch: Dispatch) => {
    dispatch(setCartSpinner(true));
    axiosInstance
      ?.delete(`${API_ENDPOINTS.deleteCart}/${id}`, { headers })
      .then((_response) => {
        dispatch(setCartSpinner(false));
        dispatch(getCart(headers) as any);
      })
      .catch((error) => {
        console.log(error);
        dispatch(setCartSpinner(false));
      });
  };

export const deleteAllCart = (cartIds: number[]) => (dispatch: Dispatch) => {
  dispatch(setCartSpinner(true));
  const deleteAll: string[] = [];
  for (let i = 0; i < cartIds.length; i++) {
    const endpoints = `https://redmart-products.onrender.com/cart/${cartIds[i]}`;
    deleteAll.push(endpoints);
  }
  axios
    .all(deleteAll.map((endpoint) => axios.delete(endpoint)))
    .then((_data) => {
      dispatch(setCartSpinner(false));
      // dispatch(getCart() as any);
    })
    .catch((errors) => {
      console.error(errors);
      dispatch(setCartSpinner(false));
    });
};

export type Action = GetCart | AddToCart | Spinner;
