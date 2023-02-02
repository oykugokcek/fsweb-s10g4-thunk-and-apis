import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
} from "./actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initial = {
  favs: [],
  current: null,
  error: null,
  loading: false,
};

function writeFavsToLocalStorage(favs) {
  localStorage.setItem("s10g4", JSON.stringify(favs));
}

function readFavsFromLocalStorage() {
  if (!JSON.parse(localStorage.getItem("s10g4"))) return [];
  return JSON.parse(localStorage.getItem("s10g4"));
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      writeFavsToLocalStorage([...state.favs, action.payload]);
      let isIncluded = state.favs.every(
        (fav) => fav.message !== action.payload.message
      );

      return {
        ...state,
        favs: isIncluded ? [...state.favs, action.payload] : [...state.favs],
      };

    case FAV_REMOVE:
      const newFavs = state.favs.filter((item) => item.id !== action.payload);
      return {
        ...state,
        favs: [...newFavs],
      };

    case FETCH_SUCCESS:
      toast.success("KÖPEEEEEEEEEEEEK", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return {
        ...state,
        current: action.payload,
        loading: false,
      };

    case FETCH_LOADING:
      return {
        ...state,
        loading: true,
      };

    case FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case GET_FAVS_FROM_LS:
      return { ...state, favs: readFavsFromLocalStorage() };

    default:
      return state;
  }
}
