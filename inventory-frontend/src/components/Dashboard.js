import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { useNavigate } from 'react-router-dom'; 
import '../App.css'; 

const Dashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const [maxMinStock, setMaxMinStock] = useState(null);
  const navigate = useNavigate(); 
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      const maxProduct = products.reduce((prev, current) =>
        prev.quantity > current.quantity ? prev : current
      );
      const minProduct = products.reduce((prev, current) =>
        prev.quantity < current.quantity ? prev : current
      );
      setMaxMinStock({ maxProduct, minProduct });
    }
  }, [products]);

  const handleBackToProductManager = () => {
    navigate('/products'); 
  };

  if (status === 'loading') {
    return <Typography>Cargando productos...</Typography>;
  }

  if (status === 'failed') {
    return <Typography>Error al cargar los productos.</Typography>;
  }

  return (
    <Container className="grid-container">
<Typography variant="h4" gutterBottom className="dashboard-title">Dashboard de Productos</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card className="card">
            <CardContent>
              <Typography variant="h6" className="chart-title">Stock de todos los productos</Typography>
              <div className="chart">
                <BarChart
                  xAxis={[
                    {
                      data: products.map((product) => product.name),
                      scaleType: 'band',
                    },
                  ]}
                  series={[
                    {
                      data: products.map((product) => product.quantity),
                      label: 'Cantidad',
                    },
                  ]}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className="card">
            <CardContent>
              <Typography variant="h6" className="chart-title">Producto con mayor y menor stock</Typography>
              {maxMinStock && (
                <div className="chart">
                  <LineChart
                    xAxis={[
                      {
                        data: ['Mayor Stock', 'Menor Stock'],
                      },
                    ]}
                    series={[
                      {
                        data: [maxMinStock.maxProduct.quantity, maxMinStock.minProduct.quantity],
                        label: 'Stock',
                      },
                    ]}
                  />
                  <Typography variant="body1">
                    Mayor stock: {maxMinStock.maxProduct.name} ({maxMinStock.maxProduct.quantity} unidades)
                  </Typography>
                  <Typography variant="body1">
                    Menor stock: {maxMinStock.minProduct.name} ({maxMinStock.minProduct.quantity} unidades)
                  </Typography>
                </div>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleBackToProductManager}>
            Volver al Gestor de Productos
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
