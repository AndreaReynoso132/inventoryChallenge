import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../redux/productSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Container, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ProductFilter from './ProductFilter';
import '../App.css'; 

const ProductList = ({ onEdit }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  // Función para manejar el filtro
  const handleFilter = (searchTerm) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const openEditPopup = (product) => {
    onEdit(product);
  };

  const openDeletePopup = (product) => {
    setCurrentProduct(product);
    setOpenDeleteDialog(true);
  };

  // Lógica para eliminar un producto y cerrar el diálogo
  const handleDeleteProduct = () => {
    dispatch(deleteProduct(currentProduct.id)).then(() => {
      setOpenDeleteDialog(false);  // Cerramos el popup después de la eliminación
      dispatch(fetchProducts());   // Refresca la lista de productos
    });
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="container-centered">
      <Container className="table-container">
        <Typography variant="h4" component="h2" gutterBottom>
          Gestión de Productos
        </Typography>

        {/* Botones */}
        <div className="buttons-row">
          <Button variant="contained" color="primary" onClick={() => onEdit(null)} sx={{ minWidth: '150px' }}>
            Agregar Nuevo Producto
          </Button>
          <Button variant="contained" color="secondary" onClick={goToDashboard} sx={{ minWidth: '150px' }}>
            Dashboard
          </Button>
        </div>

        {/* Filtro */}
        <ProductFilter onFilter={handleFilter} />

        {/* Tabla de productos */}
        <TableContainer component={Paper} sx={{ width: '100%' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Categoría</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => openEditPopup(product)} color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => openDeletePopup(product)} color="secondary">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Popup de confirmación de eliminación */}
        <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
          <DialogTitle>Confirmar Eliminación</DialogTitle>
          <DialogContent>
            <Typography>¿Estás seguro de que deseas eliminar el producto "{currentProduct?.name}"?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>Cancelar</Button>
            <Button onClick={handleDeleteProduct} color="secondary">Eliminar</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default ProductList;
