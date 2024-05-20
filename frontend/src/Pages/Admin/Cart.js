// Cart.js
import React, { useState, useEffect } from 'react';
import { Grid, Button, Item, Message, Input, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import imageUrl from "../imgaes/log.png";
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [updateItemId, setUpdateItemId] = useState(null);
  const [updateQuantity, setUpdateQuantity] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cart/get-cart-items');
        setItems(response.data.cartItems);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const removeFromCart = async (itemId) => {
    try {
      await axios.delete('http://localhost:5000/cart/delete-cart-item', { data: { productId: itemId } });
      setItems(items.filter(item => item.productId._id !== itemId));
      Swal.fire('Success!', 'Cart item removed successfully', 'success');
    } catch (error) {
      console.error('Error removing cart item:', error);
      setAlertMessage('Error removing item');
    }
  };

  const handleUpdateButtonClick = (itemId) => {
    setUpdateItemId(itemId);
    setModalOpen(true);
  };

  const updateCartItem = async () => {
    try {
      const respnse = await axios.put('http://localhost:5000/cart/update-cart-item', {
        cartItemId: updateItemId,
        quantity: updateQuantity
      });
      const updatedResponse = await axios.get('http://localhost:5000/cart/get-cart-items');
      setItems(updatedResponse.data.cartItems);
      setModalOpen(false);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Item quantity updated successfully',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      });
    } catch (error) {
      console.error('Error updating cart item:', error);
      setAlertMessage('Error updating item quantity');
    }
  };

  const totalPrice = items.reduce((total, item) => total + (item.productId ? item.productId.price * item.quantity : 0), 0);

  const generatePDF = () => {
    const doc = new jsPDF();
    let y = 10;
    items.forEach((item, index) => {
      if (item.productId) {
        doc.text(10, y, `Product Name: ${item.productId.name}`);
        doc.text(10, y + 10, `Quantity: ${item.quantity}`);
        doc.text(10, y + 20, `Price: $${item.productId.price}`);
        doc.text(10, y + 30, '----------------------');
        y += 40;
      }
    });
    doc.text(10, y + 10, `Total Price: ${totalPrice}`);
    doc.save('cart-items.pdf');
  };

  const showItems = items.map(item => (
    item.productId && (
      <Item.Group key={item._id} divided style={{ marginBottom: '45px', border: 'none', boxShadow: 'none', textAlign: 'center' }}>
        <Item>
          <Link to={`/item/${item.productId._id}`}>
            <img src={item.productId.imageUrl} alt={item.productId.name} style={{ width: "200px", height: "200px" }} />
          </Link>
          <Item.Content>
            <Item.Header><Link to={`/item/${item.productId._id}`}>{item.productId.name}</Link></Item.Header>
            <Item.Meta>
              <span style={{ fontSize: '16px', textTransform: 'uppercase', fontWeight: '900' }}>Quantity: {item.quantity}</span>
            </Item.Meta>
            <Item.Description>{item.productId.description}</Item.Description>
            <Item.Extra>
              <Button onClick={() => handleUpdateButtonClick(item._id)} color='green'>
                Update
              </Button>
              <Button onClick={() => removeFromCart(item.productId._id)} color='red'>
                Remove
              </Button>
              <div>

              </div>
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    )
  ));

  if (items.length === 0) {
    return (
      <Message color='yellow' style={{ textAlign: 'center', textTransform: 'uppercase', fontSize: '18px' }}>No Items Found! Please add some items to see them in your cart.</Message>
    );
  }

  return (
    <div className="container">
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column />
          <Grid.Column>
            {showItems}
          </Grid.Column>
          <Grid.Column>
            <div style={{ textAlign: 'center', textTransform: 'uppercase', fontSize: '18px' }}>
              {totalPrice && <p>Total Price: ${totalPrice}</p>}
              <Button onClick={generatePDF}>Export to PDF</Button>
              <Link to={`/checkout?totalPrice=${totalPrice}`}>Checkout</Link>
            </div>
            {alertMessage && <Message color='green'>{alertMessage}</Message>}
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>Update Quantity</Modal.Header>
        <Modal.Content>
          <Input type='number' placeholder='Quantity' value={updateQuantity} onChange={(e) => setUpdateQuantity(e.target.value)} />
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={updateCartItem}>
            Update
          </Button>
          <Button color='red' onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default Cart;
