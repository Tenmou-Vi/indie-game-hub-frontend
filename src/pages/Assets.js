import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Badge, Alert, Spinner, Table } from 'react-bootstrap';
import { assetsAPI } from '../services/api';

const Assets = () => {
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assetForm, setAssetForm] = useState({
    name: '',
    filename: '',
    type: 'image',
    size: '',
    category: 'Other',
    description: '',
    tags: []
  });

  // Fetch all assets
  const fetchAssets = async () => {
    try {
      setLoading(true);
      const data = await assetsAPI.getAll();
      setAssets(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch assets:', err);
      setError('Failed to fetch assets. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Load assets when component mounts
  useEffect(() => {
    fetchAssets();
  }, []);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'image':
        return '🖼️';
      case 'audio':
        return '🎵';
      case 'video':
        return '🎬';
      case 'document':
        return '📄';
      default:
        return '📁';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Character':
        return 'primary';
      case 'Audio':
        return 'success';
      case 'UI':
        return 'warning';
      case 'Background':
        return 'info';
      default:
        return 'secondary';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleCreateAsset = () => {
    setSelectedAsset(null);
    setAssetForm({
      name: '',
      filename: '',
      type: 'image',
      size: '',
      category: 'Other',
      description: '',
      tags: []
    });
    setShowAssetModal(true);
  };

  const handleEditAsset = (asset) => {
    setSelectedAsset(asset);
    setAssetForm({
      name: asset.name || '',
      filename: asset.filename || '',
      type: asset.type || 'image',
      size: asset.size || '',
      category: asset.category || 'Other',
      description: asset.description || '',
      tags: asset.tags || []
    });
    setShowAssetModal(true);
  };

  const handleSaveAsset = async () => {
    try {
      if (!assetForm.name || !assetForm.filename || !assetForm.type) {
        setError('Name, filename, and type are required');
        return;
      }

      const assetData = {
        ...assetForm,
        size: parseInt(assetForm.size) || 0
      };

      if (selectedAsset) {
        // Update asset
        await assetsAPI.update(selectedAsset.id, assetData);
      } else {
        // Create new asset
        await assetsAPI.create(assetData);
      }

      setShowAssetModal(false);
      fetchAssets(); // Refresh asset list
      setError(null);
    } catch (err) {
      console.error('Failed to save asset:', err);
      setError('Failed to save asset. Please try again later.');
    }
  };

  const handleDeleteAsset = async (assetId) => {
    if (window.confirm('Are you sure you want to delete this asset?')) {
      try {
        await assetsAPI.delete(assetId);
        fetchAssets(); // Refresh asset list
        setError(null);
      } catch (err) {
        console.error('Failed to delete asset:', err);
        setError('Failed to delete asset. Please try again later.');
      }
    }
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading assets...</p>
      </Container>
    );
  }

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2>🎨 Asset Management</h2>
          <p className="text-muted">Manage all resource files for your game project with complete CRUD operations</p>
        </Col>
        <Col xs="auto">
          <Button variant="primary" onClick={handleCreateAsset}>
            ➕ Add Asset
          </Button>
        </Col>
      </Row>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Asset Statistics Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h4>{assets.length}</h4>
              <p className="text-muted mb-0">Total Assets</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h4>{assets.filter(a => a.type === 'image').length}</h4>
              <p className="text-muted mb-0">Image Assets</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h4>{assets.filter(a => a.type === 'audio').length}</h4>
              <p className="text-muted mb-0">Audio Assets</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h4>{formatFileSize(assets.reduce((sum, a) => sum + (a.size || 0), 0))}</h4>
              <p className="text-muted mb-0">Total Size</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Asset List */}
      <Card>
        <Card.Header>
          <h5 className="mb-0">Asset List</h5>
        </Card.Header>
        <Card.Body>
          {assets.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted">No assets yet. Click "Add Asset" to get started.</p>
            </div>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Asset</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Size</th>
                  <th>Upload Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset) => (
                  <tr key={asset.id}>
                    <td>
                      <span className="fs-4">{getTypeIcon(asset.type)}</span>
                    </td>
                    <td>
                      <div>
                        <strong>{asset.name}</strong>
                        <br />
                        <small className="text-muted">{asset.filename}</small>
                      </div>
                    </td>
                    <td>
                      <Badge bg="secondary">{asset.type}</Badge>
                    </td>
                    <td>
                      <Badge bg={getCategoryColor(asset.category)}>
                        {asset.category}
                      </Badge>
                    </td>
                    <td>{formatFileSize(asset.size || 0)}</td>
                    <td>
                      {new Date(asset.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <Button 
                        size="sm" 
                        variant="outline-primary" 
                        className="me-1"
                        onClick={() => handleEditAsset(asset)}
                      >
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline-danger"
                        onClick={() => handleDeleteAsset(asset.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Asset Modal */}
      <Modal show={showAssetModal} onHide={() => setShowAssetModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedAsset ? '✏️ Edit Asset' : '➕ Add New Asset'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Asset Name *</Form.Label>
                  <Form.Control
                    type="text"
                    value={assetForm.name}
                    onChange={(e) => setAssetForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter asset name"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Filename *</Form.Label>
                  <Form.Control
                    type="text"
                    value={assetForm.filename}
                    onChange={(e) => setAssetForm(prev => ({ ...prev, filename: e.target.value }))}
                    placeholder="e.g., hero_sprite.png"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Asset Type *</Form.Label>
                  <Form.Select
                    value={assetForm.type}
                    onChange={(e) => setAssetForm(prev => ({ ...prev, type: e.target.value }))}
                  >
                    <option value="image">Image</option>
                    <option value="audio">Audio</option>
                    <option value="video">Video</option>
                    <option value="document">Document</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={assetForm.category}
                    onChange={(e) => setAssetForm(prev => ({ ...prev, category: e.target.value }))}
                  >
                    <option value="Character">Character</option>
                    <option value="Background">Background</option>
                    <option value="UI">UI</option>
                    <option value="Audio">Audio</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>File Size (bytes)</Form.Label>
              <Form.Control
                type="number"
                value={assetForm.size}
                onChange={(e) => setAssetForm(prev => ({ ...prev, size: e.target.value }))}
                placeholder="e.g., 1024"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={assetForm.description}
                onChange={(e) => setAssetForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the purpose of this asset..."
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tags (comma separated)</Form.Label>
              <Form.Control
                type="text"
                value={Array.isArray(assetForm.tags) ? assetForm.tags.join(', ') : ''}
                onChange={(e) => setAssetForm(prev => ({ 
                  ...prev, 
                  tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                }))}
                placeholder="e.g., player, sprite, 32x32"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAssetModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveAsset}>
            {selectedAsset ? 'Update Asset' : 'Add Asset'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Assets;
