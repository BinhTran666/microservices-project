const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {
  res.send('API Gateway is running');
});

// Improved proxy configuration for user service
app.use('/api/users', createProxyMiddleware({
  target: 'http://user-service:3001',
  changeOrigin: true,
  pathRewrite: {
    '^/api/users': '/api/users'
  },
  // Add these important settings
  secure: false,
  onProxyReq: (proxyReq, req, res) => {
    // Log proxy request for debugging
    console.log(`Proxying ${req.method} request to: ${proxyReq.path}`);
    
    // If the original request has a body, we need to rewrite the body
    if (req.body && Object.keys(req.body).length > 0) {
      const bodyData = JSON.stringify(req.body);
      proxyReq.setHeader('Content-Type', 'application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      // Write body to request
      proxyReq.write(bodyData);
    }
  },
  // Error handling
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).json({ 
      message: 'Error occurred while communicating with user service',
      error: err.message 
    });
  }
}));

// Improved proxy configuration for product service (similar changes)
app.use('/api/products', createProxyMiddleware({
  target: 'http://product-service:3002',
  changeOrigin: true,
  pathRewrite: {
    '^/api/products': '/api/products'
  },
  secure: false,
  onProxyReq: (proxyReq, req, res) => {
    console.log(`Proxying ${req.method} request to: ${proxyReq.path}`);
    
    if (req.body && Object.keys(req.body).length > 0) {
      const bodyData = JSON.stringify(req.body);
      proxyReq.setHeader('Content-Type', 'application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).json({ 
      message: 'Error occurred while communicating with product service',
      error: err.message 
    });
  }
}));

// Start the server
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});