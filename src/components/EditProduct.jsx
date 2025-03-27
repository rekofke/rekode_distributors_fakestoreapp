import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setFormData({
          title: response.data.title,
          price: response.data.price,
          description: response.data.description,
          category: response.data.category,
          image: response.data.image,
        });
        setLoading(false);
      } catch (err) {
        console.error("Error loading product data:", err); 
        setError("Failed to load product. Please try again");
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const updatedProduct = {
        ...formData,
        price: parseFloat(formData.price),
      };

      const response = await axios.put(
        `https://fakestoreapi.com/products/${id}`,
        updatedProduct
      );

      if (response.data) {
        setSubmitted(true);
        setTimeout(() => navigate("/products"), 2000);
      }
    } catch (err) {
      console.error("Error updating product:", err); 
      setError("Failed to update product. Please try again");
    }
  };

  if (loading)
    return <p className="text-center mt-5">Loading product data...</p>;
  if (error) return <p className="text-center mt-5 text-danger">{error}</p>;

  return (
    <Container className="edit-product-form mt-5">
      <h2>Edit Product</h2>

      {submitted && (
        <Alert variant="success" className="mt-3">
          Product updated successfully! Redirecting to products page...
        </Alert>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
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
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              className="mt-2 img-thumbnail"
              style={{ maxWidth: "200px" }}
            />
          )}
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Update Product
        </Button>
      </Form>
    </Container>
  );
};

export default EditProduct;
