import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LayoutApp from '../../components/Layout';
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import { Table } from 'antd';

const Cart = () => {
  const { cartItems } = useSelector((state) => state.rootReducer);
  const dispatch = useDispatch();

  const increaseHandler = (record) => {
    dispatch({
      type: 'UPDATE_CART',
      payload: { ...record, quantity: record.quantity + 1 },
    });
  };

  const decreaseHandler = (record) => {
    if (record.quantity !== 1) {
      dispatch({
        type: 'UPDATE_CART',
        payload: { ...record, quantity: record.quantity - 1 },
      });
    }
  };

  const deleteHandler = (record) => {
    dispatch({
      type: 'DELETE_FROM_CART',
      payload: record,
    });
  };

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (image, record) => (
        <img src={image} alt={record.name} height={60} width={60} />
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Qty',
      dataIndex: '_id',
      render: (id, record) => (
        <div>
          <MinusCircleOutlined
            className='cart-minus'
            onClick={() => decreaseHandler(record)}
          />
          <strong className='cart-quantity'>{record.quantity}</strong>
          <PlusCircleOutlined
            className='cart-plus'
            onClick={() => increaseHandler(record)}
          />
        </div>
      ),
    },
    {
      title: 'Action',
      dataIndex: '_id',
      render: (id, record) => (
        <DeleteOutlined
          className='cart-action'
          onClick={() => deleteHandler(record)}
        />
      ),
    },
  ];
  return (
    <LayoutApp>
      <h2>Cart</h2>
      <Table dataSource={cartItems} columns={columns} bordered />;
    </LayoutApp>
  );
};

export default Cart;
