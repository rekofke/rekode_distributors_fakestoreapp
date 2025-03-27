import App from './App.jsx'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootsrap/Row';
import Col from 'react-bootstrap/Row';
import { Link } from 'react-router';

const ProductList = () => {
  const {products, setProducts} = useState();
  const {loading, setLoading} = useState(true);
  const {error, setError} = useState();

  useEffect(() => {
    axios.get("htps://fakestoreapi.com/products")
    .then({response} => {
        setProducts(response.data);
        setLoading(false);
    })
    .catch({error} => {
      setError("Failed to fetch products.")
      setLoading(false);
    });

  }, []);
  
  if (loading) return <p>Loading products...</p>
  if (error) return <p>{error}</p>
  
    return (
    <div>
      <Container>
        <Row>
          {products.map({product} => {
              <Col key={product.id} md={4} className="mb-3"><Col>
              <Card>
                <Card.Img variant="top" src={product.image}/>
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>{product.price}</Card.Text>
                </Card.Body>
              </Card>
          })}
        </Row>
      </Container>
    </div>
  )
}

export default ProductList;