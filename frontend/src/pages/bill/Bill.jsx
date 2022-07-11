import { Button, Modal, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import LayoutApp from '../../components/Layout';
import { EyeOutlined } from '@ant-design/icons';
import { useReactToPrint } from 'react-to-print';

const Bill = () => {
  const [billData, setBillData] = useState([]);
  const [popModal, setPopModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const dispatch = useDispatch();
  const componentRef = useRef();

  const getAllBills = async () => {
    try {
      dispatch({
        type: 'SHOW_LOADING',
      });
      const { data } = await axios.get('/api/bills/getbills');
      setBillData(data);
      dispatch({
        type: 'HIDE_LOADING',
      });
      console.log(data);
    } catch (error) {
      dispatch({
        type: 'HIDE_LOADING',
      });
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBills();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
    },
    {
      title: 'Subtotal',
      dataIndex: 'subtotal',
    },
    {
      title: 'Tax',
      dataIndex: 'tax',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
    },
    {
      title: 'Action',
      dataIndex: '_id',
      render: (id, record) => (
        <div>
          <EyeOutlined
            className='cart-edit eye'
            onClick={() => {
              setSelectedBill(record);
              setPopModal(true);
            }}
          />
        </div>
      ),
    },
  ];

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <LayoutApp>
      <h2>All Invoices </h2>
      <Table dataSource={billData} columns={columns} bordered />

      {popModal && (
        <Modal
          title='Invoice Details'
          width={500}
          pagination={false}
          visible={popModal}
          onCancel={() => setPopModal(false)}
          footer={false}
        >
          <div className='card' ref={componentRef}>
            <div className='cardHeader'>
              <h2 className='logo'>KT POS</h2>
              <span>
                Phone Number: <b>03 778 00 80</b> <br />
              </span>
              <span>
                Address: <b>Plezantstraat 55 - 9100 Sint-Niklaas, Belgium</b>
                <br />
              </span>
            </div>
            <div className='cardBody'>
              <div className='group'>
                <span>Bill Id: </span>
                <span>{<b>{selectedBill._id}</b>}</span>
              </div>
              <div className='group'>
                <span>Date Order: </span>
                <span>
                  {<b>{selectedBill.createdAt.toString().substring(0, 10)}</b>}
                </span>
              </div>
              <div className='group'>
                <span>Total Amount: </span>
                <span>{<b>€{selectedBill.totalAmount}</b>}</span>
              </div>
            </div>
            <div className='cardFooter'>
              <h4>Your Order</h4>
              {selectedBill.cartItems.map((product) => (
                <>
                  <div className='footerCard'>
                    <div className='group'>
                      <span>Product: </span>
                      <span>
                        <b>{product.name}</b>
                      </span>
                    </div>
                    <div className='group'>
                      <span>Qty: </span>
                      <span>
                        <b>{product.quantity}</b>
                      </span>
                    </div>
                    <div className='group'>
                      <span>Price: </span>
                      <span>
                        <b>€{product.price}</b>
                      </span>
                    </div>
                  </div>
                </>
              ))}
              <div className='footerCardTotal'>
                <div className='group'>
                  <h3>Subtotal</h3>
                  <h3>{<b>€{selectedBill.subtotal}</b>}</h3>
                </div>
                <div className='group'>
                  <h3>Tax</h3>
                  <h3>{<b>€{selectedBill.tax}</b>}</h3>
                </div>
                <div className='group'>
                  <h3>Total </h3>
                  <h3>{<b>€{selectedBill.totalAmount}</b>}</h3>
                </div>
              </div>
              <div className='footerThanks'>
                <span>Thank You For Eating / Drinking With Us!</span>
              </div>
            </div>
          </div>
          <div className='bills-btn-add'>
            <Button onClick={handlePrint} htmlType='submit' className='add-new'>
              Print Invoice
            </Button>
          </div>
        </Modal>
      )}
    </LayoutApp>
  );
};
export default Bill;
