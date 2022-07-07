import React, { useState, useEffect } from 'react';
import LayoutApp from '../../components/Layout';
import axios from 'axios';
import { Row, Col } from 'antd';
import Product from '../../components/Product';
import { useDispatch } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Pizzas');
  const categories = [
    {
      name: 'Pizzas',
      imageUrl:
        'https://easydrawingart.com/wp-content/uploads/2019/07/How-to-draw-a-pizza.jpg',
    },
    {
      name: 'Burgers',
      imageUrl:
        'https://static.vecteezy.com/system/resources/previews/003/621/228/original/burger-from-multicolored-paints-splash-of-watercolor-colored-drawing-realistic-illustration-of-paints-vector.jpg',
    },
    {
      name: 'Soft Drinks',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbnkULTGxUBvcSk2WOfXwutcw60PLz8vI3uw&usqp=CAU',
    },
    {
      name: 'Beers',
      imageUrl:
        'https://t4.ftcdn.net/jpg/04/72/11/95/360_F_472119515_DSdfSkqKa4WJMAnjJPMMu0mzkyqZswEY.jpg',
    },
    {
      name: 'Cocktails',
      imageUrl:
        'https://i.pinimg.com/originals/57/a7/ce/57a7cea31a473a90ab638b8dfc7d4570.jpg',
    },
  ];

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
      <div className='category'>
        {categories.map((category) => (
          <div
            key={category.name}
            className={`categoryFlex ${
              selectedCategory === category.name && 'category-active'
            }`}
          >
            <h3 className='categoryName'>{category.name}</h3>
            <img
              src={category.imageUrl}
              alt={category.name}
              width={60}
              height={60}
            />
          </div>
        ))}
      </div>
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
