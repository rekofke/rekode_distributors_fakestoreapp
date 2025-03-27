import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Button, Modal } from "react-bootstrap";

const DeleteProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch {
        setError("Failed to load product details");
        setLoading(false);
      }
    };

    fetchProduct(); 
  }, [id]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      setShowModal(false);
      setTimeout(() => navigate("/products"), 2000); 
    } catch {
      setError("Failed to delete product. Please try again.");
      setIsDeleting(false);
    }
  };

  if (loading)
    return <p className="text-center mt-5">Loading product details...</p>;
  if (error) return <p className="text-center mt-5 text-danger">{error}</p>;

  return (
    <Container className="mt-5">
      <h2>Delete Product</h2>

      {product && (
        <div className="product-preview card p-4 mb-4">
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <Button variant="danger" onClick={() => setShowModal(true)}>
            Delete Product
          </Button>
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this product? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DeleteProduct;
