import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Acción asíncrona para obtener productos
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('https://localhost:7140/api/products');
  return response.data;
});

// Acción asíncrona para eliminar productos
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
  await axios.delete(`https://localhost:7140/api/products/${id}`);
  return id; // Devolvemos el ID para eliminarlo del estado
});

// Acción asíncrona para agregar un nuevo producto
export const addProduct = createAsyncThunk('products/addProduct', async (newProduct) => {
  const response = await axios.post('https://localhost:7140/api/products', newProduct);
  return response.data; // Devolvemos el nuevo producto agregado
});

// Acción asíncrona para actualizar un producto existente
export const updateProduct = createAsyncThunk('products/updateProduct', async (updatedProduct) => {
  const { id, ...productData } = updatedProduct;
  const response = await axios.put(`https://localhost:7140/api/products/${id}`, productData);
  return response.data; // Devolvemos el producto actualizado
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload; // Sobrescribir la lista de productos, no concatenar
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product.id !== action.payload);
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload); // Agregar el nuevo producto al estado
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload; // Actualizar el producto en el estado
        }
      });

  },
});

export default productSlice.reducer;
