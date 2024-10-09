import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import { Container, Typography, Grid } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';

const Dashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const [maxMinStock, setMaxMinStock] = useState(null);

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

  if (status === 'loading') {
    return <Typography>Cargando productos...</Typography>;
  }

  if (status === 'failed') {
    return <Typography>Error al cargar los productos.</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Dashboard de Productos</Typography>

      <Grid container spacing={3}>
        {/* Gráfico de barras: stock de todos los productos */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Stock de todos los productos</Typography>
          <div style={{ height: 400 }}>
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
        </Grid>

        {/* Gráfico de líneas: producto con mayor y menor stock */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Producto con mayor y menor stock</Typography>
          {maxMinStock && (
            <div style={{ height: 400 }}>
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
