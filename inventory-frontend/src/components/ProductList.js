import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../redux/productSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TextField, TableRow, Paper, IconButton, Typography, Container, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
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
  }, [status, dispatch, products]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

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

  const handleDeleteProduct = () => {
    dispatch(deleteProduct(currentProduct.id)).then(() => {
      setOpenDeleteDialog(false);  
      dispatch(fetchProducts());  
    });
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="container-centered">
      <Container className="table-container">
        <div className="header-row">
          <Button variant="contained" color="primary" onClick={() => onEdit(null)} sx={{ minWidth: '150px' }}>
            Agregar Producto
          </Button>
          <Button variant="contained" color="secondary" onClick={goToDashboard} sx={{ minWidth: '150px' }}>
            Dashboard
          </Button>
        </div>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar productos..."
          onChange={(e) => handleFilter(e.target.value)}
          className="search-field"
        />

        <TableContainer component={Paper} sx={{ width: '100%', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', borderBottom: '2px solid #e0e0e0' }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', borderBottom: '2px solid #e0e0e0' }}>Descripción</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', borderBottom: '2px solid #e0e0e0' }}>Precio</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', borderBottom: '2px solid #e0e0e0' }}>Cantidad</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', borderBottom: '2px solid #e0e0e0' }}>Categoría</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', borderBottom: '2px solid #e0e0e0' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} sx={{ '&:hover': { backgroundColor: '#f0f0f0' } }}>
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
