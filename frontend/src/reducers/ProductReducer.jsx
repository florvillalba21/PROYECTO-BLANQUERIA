// import { useReducer, useEffect } from "react";
// import axios from "axios";

// // Definimos el estado inicial del reducer
// const initialState = {
//   loading: true,
//   error: null,
//   products: [],
// };

// // Definimos las acciones que el reducer puede manejar
// const actions = {
//   SET_LOADING: "SET_LOADING",
//   SET_ERROR: "SET_ERROR",
//   SET_PRODUCTS: "SET_PRODUCTS",
//   ADD_PRODUCT: "ADD_PRODUCT",
//   UPDATE_PRODUCT: "UPDATE_PRODUCT",
//   DELETE_PRODUCT: "DELETE_PRODUCT",
// };

// // Definimos el reducer
// const reducer = (state, action) => {
//   switch (action.type) {
//     case actions.SET_LOADING:
//       return { ...state, loading: true, error: null };
//     case actions.SET_ERROR:
//       return { ...state, loading: false, error: action.payload };
//     case actions.SET_PRODUCTS:
//       return { ...state, loading: false, products: action.payload };
//     case actions.ADD_PRODUCT:
//       return { ...state, products: [...state.products, action.payload] };
//     case actions.UPDATE_PRODUCT:
//       return {
//         ...state,
//         products: state.products.map((product) =>
//           product.id === action.payload.id ? action.payload : product
//         ),
//       };
//     case actions.DELETE_PRODUCT:
//       return {
//         ...state,
//         products: state.products.filter(
//           (product) => product.id !== action.payload
//         ),
//       };
//     default:
//       return state;
//   }
// };

// // Creamos el hook que vamos a utilizar para manejar el estado de los productos
// const useProducts = () => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   useEffect(() => {
//     // Al cargar el componente, traemos los productos desde la API
//     dispatch({ type: actions.SET_LOADING });

//     axios
//       .get("https://mi-api.com/productos")
//       .then((response) => {
//         dispatch({ type: actions.SET_PRODUCTS, payload: response.data });
//       })
//       .catch((error) => {
//         dispatch({ type: actions.SET_ERROR, payload: error.message });
//       });
//   }, []);

//   // Funciones para agregar, actualizar y eliminar productos
//   const addProduct = (newProduct) => {
//     axios
//       .post("https://mi-api.com/productos", newProduct)
//       .then((response) => {
//         dispatch({ type: actions.ADD_PRODUCT, payload: response.data });
//       })
//       .catch((error) => {
//         dispatch({ type: actions.SET_ERROR, payload: error.message });
//       });
//   };

//   const updateProduct = (updatedProduct) => {
//     axios
//       .put(`https://mi-api.com/productos/${updatedProduct.id}`, updatedProduct)
//       .then((response) => {
//         dispatch({ type: actions.UPDATE_PRODUCT, payload: response.data });
//       })
//       .catch((error) => {
//         dispatch({ type: actions.SET_ERROR, payload: error.message });
//       });
//   };

//   const deleteProduct = (productId) => {
//     axios
//       .delete(`https://mi-api.com/productos/${productId}`)
//       .then(() => {
//         dispatch({ type: actions.DELETE_PRODUCT, payload: productId });
//       })
//       .catch((error) => {
//         dispatch({ type: actions.SET_ERROR, payload: error.message });
//       });
//   };

//   return { ...state, addProduct, updateProduct, deleteProduct };
// };

// // Ejemplo de cómo usar el hook en un componente
// const ProductsList = () => {
//   const [state, dispatch] = useReducer(productReducer, initialState);

//   useEffect(() => {
//     dispatch({ type: "FETCH_PRODUCTS_REQUEST" });
//     fetchProducts()
//       .then((data) => {
//         dispatch({ type: "FETCH_PRODUCTS_SUCCESS", payload: data });
//       })
//       .catch((error) => {
//         dispatch({ type: "FETCH_PRODUCTS_FAILURE", payload: error.message });
//       });
//   }, []);

//   return <div>{/* Renderizado de la lista de productos... */}</div>;
// };
