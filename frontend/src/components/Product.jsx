import React from 'react';
import { Button, Card } from 'antd';

const Product = ({ product }) => {
  const { Meta } = Card;
  return (
    <Card
      hoverable
      style={{
        width: 240,
        marginBottom: 30,
      }}
      cover={
        <img alt={product.name} src={product.image} style={{ height: 220 }} />
      }
    >
      <Meta title={product.name} description={product.category} />
      <div className='product-btn'>
        <Button>Add to Cart</Button>
      </div>
    </Card>
  );
};

export default Product;
