/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionType } from "./types";
import { Dispatch } from "redux";
import { QuotesReduxData, ReduxData } from "../../Component/Types";
import axiosInstance from "../../axiosInstance";
import API_ENDPOINTS from "../../config/apiconfig";

interface GetAllProduct {
  type: ActionType.GET_ALL_PRODUCT;
  payload: ReduxData[];
}

interface ProductsSpinner {
  type: ActionType.PRODUCTS_SPINNER;
  payload: boolean;
}

interface GetProductDescription {
  type: ActionType.GET_PRODUCT_DESCRIPTION;
  payload: ReduxData;
}

interface GetRelatedProducts {
  type: ActionType.GET_RELATED_PRODUCTS;
  payload: ReduxData[];
}

interface GetFeaturedProduct {
  type: ActionType.GET_FEATURED_PRODUCT;
  payload: ReduxData[];
}

interface GetLatestProduct {
  type: ActionType.GET_LATEST_PRODUCT;
  payload: ReduxData[];
}

interface GetExclusiveProduct {
  type: ActionType.GET_EXCLUSIVE_PRODUCT;
  payload: ReduxData;
}

interface GetQuotes {
  type: ActionType.QUOTES;
  payload: QuotesReduxData[];
}

interface GetSearchProduct {
  type: ActionType.GET_SEARCH_PRODUCT;
  payload: ReduxData[];
}

export const setProductsSpinner = (isSpin: boolean) => {
  return {
    type: ActionType.PRODUCTS_SPINNER,
    payload: isSpin,
  };
};

export const setAllProduct = (data: ReduxData[]) => {
  return {
    type: ActionType.GET_ALL_PRODUCT,
    payload: data,
  };
};

export const getAllProduct = () => (dispatch: Dispatch) => {
  dispatch(setProductsSpinner(true));
  axiosInstance
    ?.get(`${API_ENDPOINTS.getProducts}`)
    .then((response) => {
      dispatch(setAllProduct(response.data.data));
      dispatch(setProductsSpinner(false));
    })
    .catch((error) => {
      console.log(error);
      dispatch(setProductsSpinner(false));
    });
};

export const setProductDescription = (data: ReduxData) => {
  return {
    type: ActionType.GET_PRODUCT_DESCRIPTION,
    payload: data,
  };
};

export const getProductDescription = (id: string) => (dispatch: Dispatch) => {
  dispatch(setProductsSpinner(true));
  axiosInstance
    ?.get(`${API_ENDPOINTS.getProducts}/${id}`)
    .then((response) => {
      dispatch(setProductDescription(response.data.data));
      dispatch(setProductsSpinner(false));
    })
    .catch((error) => {
      console.log(error);
      dispatch(setProductsSpinner(false));
    });
};

export const setRelatedProducts = (data: ReduxData[]) => {
  return {
    type: ActionType.GET_RELATED_PRODUCTS,
    payload: data,
  };
};

export const getRelatedProducts = (id: string) => (dispatch: Dispatch) => {
  dispatch(setProductsSpinner(true));
  axiosInstance
    ?.get(`${API_ENDPOINTS.relatedProducts}/${id}`)
    .then((response) => {
      dispatch(setRelatedProducts(response.data.data));
      dispatch(setProductsSpinner(false));
    })
    .catch((error) => {
      console.log(error);
      dispatch(setProductsSpinner(false));
    });
};

export const setFeaturedProduct = (data: ReduxData[]) => {
  return {
    type: ActionType.GET_FEATURED_PRODUCT,
    payload: data,
  };
};

export const getFeaturedProduct = () => (dispatch: Dispatch) => {
  dispatch(setProductsSpinner(true));
  axiosInstance
    ?.get(`${API_ENDPOINTS.featureProducts}`)
    .then((response) => {
      dispatch(setFeaturedProduct(response.data.data));
      dispatch(setProductsSpinner(false));
    })
    .catch((error) => {
      console.log(error);
      dispatch(setProductsSpinner(false));
    });
};

export const setLatestProduct = (data: ReduxData[]) => {
  return {
    type: ActionType.GET_LATEST_PRODUCT,
    payload: data,
  };
};

export const getLatestProduct = () => (dispatch: Dispatch) => {
  dispatch(setProductsSpinner(true));
  axiosInstance
    ?.get(`${API_ENDPOINTS.latestProducts}`)
    .then((response) => {
      dispatch(setLatestProduct(response.data.data));
      dispatch(setProductsSpinner(false));
    })
    .catch((error) => {
      console.log(error);
      dispatch(setProductsSpinner(false));
    });
};

export const setExclusiveProduct = (data: ReduxData) => {
  return {
    type: ActionType.GET_EXCLUSIVE_PRODUCT,
    payload: data,
  };
};

export const getExclusiveProduct = () => (dispatch: Dispatch) => {
  dispatch(setProductsSpinner(true));
  axiosInstance
    ?.get(`${API_ENDPOINTS.exclusiveProducts}/66a9092282d77c95de881160`)
    .then((response) => {
      dispatch(setExclusiveProduct(response.data.data));
      dispatch(setProductsSpinner(false));
    })
    .catch((error) => {
      console.log(error);
      dispatch(setProductsSpinner(false));
    });
};

export const setQuotes = (data: QuotesReduxData[]) => {
  return {
    type: ActionType.QUOTES,
    payload: data,
  };
};

export const getQuotes = () => (dispatch: Dispatch) => {
  dispatch(setProductsSpinner(true));
  axiosInstance
    ?.get(`${API_ENDPOINTS.getQuotes}`)
    .then((response) => {
      dispatch(setQuotes(response.data.data));
      dispatch(setProductsSpinner(false));
    })
    .catch((error) => {
      console.log(error);
      dispatch(setProductsSpinner(false));
    });
};

export const setSearchProduct = (data: ReduxData[]) => {
  return {
    type: ActionType.GET_SEARCH_PRODUCT,
    payload: data,
  };
};

export const getSearchProduct =
  (search: string, headers?: any) => (dispatch: Dispatch) => {
    dispatch(setProductsSpinner(true));
    axiosInstance
      ?.get(`${API_ENDPOINTS.getProducts}`, { params: { q: search }, headers })
      .then((response) => {
        dispatch(setSearchProduct(response.data.data));
        dispatch(setProductsSpinner(false));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setProductsSpinner(false));
      });
  };

export type Action =
  | GetAllProduct
  | ProductsSpinner
  | GetProductDescription
  | GetRelatedProducts
  | GetFeaturedProduct
  | GetLatestProduct
  | GetExclusiveProduct
  | GetQuotes
  | GetSearchProduct;
