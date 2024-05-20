import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input } from "semantic-ui-react";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "semantic-ui-css/semantic.min.css";

const AdminAllProdcut = ({ userId }) => {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    _id: "",
    name: "",
    description: "",
    price: "",
    category: "",
    type: ""
  });
  const [searchQueries, setSearchQueries] = useState({
    name: "",
    category: "",
    type: "",
    price: ""
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const deleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(
        `http://localhost:5000/products/${productId}`,
        config
      );
      setProducts(products.filter((product) => product._id !== productId));
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Product deleted successfully",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const openEditModal = (product) => {
    setEditedProduct(product);
    setModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const updateProduct = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.patch(
        `http://localhost:5000/products/${editedProduct._id}`,
        editedProduct,
        config
      );
      setModalOpen(false);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Product updated successfully",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const filterProducts = (product) => {
    const { name, category, type, price } = searchQueries;
    return (
      product.name.toLowerCase().includes(name.toLowerCase()) &&
      product.category.toLowerCase().includes(category.toLowerCase()) &&
      product.type.toLowerCase().includes(type.toLowerCase()) &&
      String(product.price).toLowerCase().includes(price.toLowerCase())
    );
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchQueries({ ...searchQueries, [name]: value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: '#product-table' });
    doc.save('product-list.pdf');
  };

  return (
    <div className="container">
      <h1>Product List</h1>
      <Form>
        <Form.Group>
          <Form.Field>
            <Input
              name="name"
              placeholder="Search by Name"
              value={searchQueries.name}
              onChange={handleSearchChange}
            />
          </Form.Field>
          <Form.Field>
            <Input
              name="category"
              placeholder="Search by Category"
              value={searchQueries.category}
              onChange={handleSearchChange}
            />
          </Form.Field>
          <Form.Field>
            <Input
              name="type"
              placeholder="Search by Type"
              value={searchQueries.type}
              onChange={handleSearchChange}
            />
          </Form.Field>
          <Form.Field>
            <Input
              name="price"
              placeholder="Search by Price"
              value={searchQueries.price}
              onChange={handleSearchChange}
            />
          </Form.Field>
        </Form.Group>
      </Form>
      <Table id="product-table" celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {products.filter(filterProducts).map((product) => (
            <Table.Row key={product._id}>
              <Table.Cell>{product.name}</Table.Cell>
              <Table.Cell>{product.category}</Table.Cell>
              <Table.Cell>{product.price}</Table.Cell>
              <Table.Cell>{product.type}</Table.Cell>
              <Table.Cell>
                <Button color="blue" onClick={() => openEditModal(product)}>
                  Edit
                </Button>
                <Button color="red" onClick={() => deleteProduct(product._id)}>
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
   
      <Button color="green" onClick={generatePDF}>
        Export to PDF
      </Button>
      <br></br>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>Edit Product</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Name</label>
              <Input
                name="name"
                value={editedProduct.name}
                onChange={handleInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Category</label>
              <Input
                name="category"
                value={editedProduct.category}
                onChange={handleInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Type</label>
              <Input
                name="type"
                value={editedProduct.type}
                onChange={handleInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Price</label>
              <Input
                name="price"
                value={editedProduct.price}
                onChange={handleInputChange}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={updateProduct}>
            Update
          </Button>
          <Button color="red" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
      <br></br>
    </div>
  );
};

export default AdminAllProdcut;
