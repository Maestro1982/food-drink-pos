import React, { useState, useEffect } from 'react';
import LayoutApp from '../../components/Layout';
import axios from 'axios';
import { Row, Col } from 'antd';
import Product from '../../components/Product';
import { useDispatch } from 'react-redux';

const Home = () => {
  const [productData, setProductData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        dispatch({
          type: 'SHOW_LOADING',
        });
        const { data } = await axios.get('/api/products/getproducts');
        setProductData(data);
        dispatch({
          type: 'HIDE_LOADING',
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllProducts();
  }, [dispatch]);

  return (
    <LayoutApp>
      <Row>
        {productData.map((product) => (
          <Col xs={24} sm={6} md={12} lg={6}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </LayoutApp>
  );
};

export default Home;
