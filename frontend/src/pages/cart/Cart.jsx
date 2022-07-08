import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LayoutApp from '../../components/Layout';
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Table } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

const Cart = () => {
  const [subtotal, setSubtotal] = useState(0);
  const [billPopUp, setBillPopUp] = useState(false);
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

  useEffect(() => {
    let temp = 0;
    cartItems.forEach(
      (product) => (temp = temp + product.price * product.quantity)
    );
    setSubtotal(temp);
  }, [cartItems]);

  const submitHandler = (value) => {
    console.log(value);
  };

  return (
    <LayoutApp>
      <h2>Cart</h2>
      <Table dataSource={cartItems} columns={columns} bordered />
      <div className='subtotal'>
        <h2>
          Subtotal: <span>€ {subtotal.toFixed(2)}</span>
        </h2>
        <Button onClick={() => setBillPopUp(true)} className='add-new'>
          Create Invoice
        </Button>
      </div>
      <Modal
        title='Create Invoice'
        visible={billPopUp}
        onCancel={() => setBillPopUp(false)}
        footer={false}
      >
        <Form layout='vertical' onFinish={submitHandler}>
          <FormItem name='customerName' label='Customer Name'>
            <Input />
          </FormItem>
          <FormItem name='customerPhone' label='Customer Phone'>
            <Input />
          </FormItem>
          <Form.Item name='paymentMethod' label='Payment Method'>
            <Select>
              <Select.Option value='cash'>Cash</Select.Option>
              <Select.Option value='paypal'>PayPal</Select.Option>
              <Select.Option value='card'>Card</Select.Option>
            </Select>
          </Form.Item>
          <div className='form-btn-add'>
            <Button htmlType='submit' className='add-new'>
              Generate Invoice
            </Button>
          </div>
        </Form>
      </Modal>
    </LayoutApp>
  );
};

export default Cart;
