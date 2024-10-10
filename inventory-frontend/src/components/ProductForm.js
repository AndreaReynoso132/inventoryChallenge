import React, { useState } from 'react';
import ProductList from './ProductList';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addProduct, updateProduct, fetchProducts } from '../redux/productSlice'; 

const ProductForm = () => {
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: ''  
  });

  const dispatch = useDispatch();

  const handleOpen = (product = null) => {
    setEditingProduct(product);
    setFormData(product ? { ...product } : { name: '', description: '', price: '', quantity: '', category: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProduct(null);
  };

  const handleSave = () => {
    if (editingProduct) {
      dispatch(updateProduct({ ...formData, id: editingProduct.id })).then(() => {
        dispatch(fetchProducts());
      });
    } else {
      const productToAdd = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity, 10),
        category: formData.category  
      };
  
      dispatch(addProduct(productToAdd)).then(() => {
        dispatch(fetchProducts()); 
      });
    }
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    return (
      formData.name !== '' &&
      formData.description !== '' &&
      !isNaN(parseFloat(formData.price)) &&
      !isNaN(parseInt(formData.quantity)) &&
      formData.category !== ''
    );
  };

  return (
    <Box>
      {/* Título centrado */}
      <Typography variant="h4" align="center" gutterBottom>
        Gestor de Productos
      </Typography>

      <ProductList onEdit={handleOpen} />
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingProduct ? 'Editar Producto' : 'Agregar Producto'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            margin="dense"
            label="Descripción"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            margin="dense"
            label="Precio"
            name="price"
            value={formData.price}
            onChange={handleChange}
            fullWidth
            required
            type="number"
          />
          <TextField
            margin="dense"
            label="Cantidad"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            fullWidth
            required
            type="number"
          />
          <TextField
            margin="dense"
            label="Categoría"
            name="category"
            value={formData.category}
            onChange={handleChange}  
            fullWidth
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSave} disabled={!validateForm()} color="primary">
            {editingProduct ? 'Guardar Cambios' : 'Agregar Producto'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductForm;
