import React, { useState, useEffect } from 'react';
import LayoutApp from '../../components/Layout';
import axios from 'axios';
import { Row, Col } from 'antd';
import Product from '../../components/Product';

const Home = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const { data } = await axios.get('/api/products/getproducts');
        setProductData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllProducts();
  }, []);
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
