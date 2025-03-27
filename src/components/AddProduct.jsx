import React from "react";
import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap"; 
import axios from "axios"; 

const AddProduct = () => {
  const [product, setProduct] = useState(null); 
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://fakestoreapi.com/products",
        formData
      );
      console.log(response.data);
      setProduct(response.data);
      setSubmitted(true);
      setError(null);
      setFormData({
        title: "",
        description: "",
        category: "",
        price: "",
        image: "",
      });
    } catch (err) {
      setError(`Error submitting the form. Please try again: ${err.message}`);
      setSubmitted(false);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Add Product</h2>

      {/* Success Alert */}
      {submitted && (
        <Alert variant="success">
          Product added successfully! <br />
          <strong>Title:</strong> {product?.title} <br />
          <strong>Price:</strong> ${product?.price}
        </Alert>
      )}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="url"
            placeholder="Enter image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default AddProduct;
