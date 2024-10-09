import React, { useState } from 'react';
import ProductList from './ProductList';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addProduct, updateProduct } from '../redux/productSlice';

const ProductForm = () => {
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: ''  // Asegúrate de que category esté aquí
  });

  const dispatch = useDispatch();

  // Abre el formulario y establece los datos del producto para editar
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
      dispatch(updateProduct({ ...formData, id: editingProduct.id }));
    } else {
      const productToAdd = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity, 10),
        category: formData.category  // Asegúrate de enviar category
      };

      dispatch(addProduct(productToAdd));
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
      formData.category !== ''  // Validamos que category no esté vacío
    );
  };

  return (
    <Box>
      <ProductList onEdit={handleOpen} />
      
      {/* Formulario de agregar/editar producto */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}</DialogTitle>
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
