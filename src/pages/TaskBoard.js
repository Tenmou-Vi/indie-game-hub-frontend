import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Badge, Alert, Spinner } from 'react-bootstrap';
import { tasksAPI } from '../services/api';

const TaskBoard = () => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    assignedTo: '',
    dueDate: '',
    status: 'To Do'
  });

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await tasksAPI.getAll();
      setTasks(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
      setError('Failed to fetch tasks. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Load tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Group tasks by status
  const groupedTasks = tasks.reduce((acc, task) => {
    const status = task.status || 'To Do';
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(task);
    return acc;
  }, {});

  const columns = ['To Do', 'In Progress', 'Review', 'Done'];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'danger';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'success';
      default:
        return 'secondary';
    }
  };

  const handleCreateTask = () => {
    setSelectedTask(null);
    setTaskForm({
      title: '',
      description: '',
      priority: 'Medium',
      assignedTo: '',
      dueDate: '',
      status: 'To Do'
    });
    setShowTaskModal(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setTaskForm({
      title: task.title || '',
      description: task.description || '',
      priority: task.priority || 'Medium',
      assignedTo: task.assignedTo || '',
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
      status: task.status || 'To Do'
    });
    setShowTaskModal(true);
  };

  const handleSaveTask = async () => {
    try {
      if (!taskForm.title || !taskForm.description) {
        setError('Title and description are required');
        return;
      }

      const taskData = {
        ...taskForm,
        dueDate: taskForm.dueDate || null
      };

      if (selectedTask) {
        // Update task
        await tasksAPI.update(selectedTask.id, taskData);
      } else {
        // Create new task
        await tasksAPI.create(taskData);
      }

      setShowTaskModal(false);
      fetchTasks(); // Refresh task list
      setError(null);
    } catch (err) {
      console.error('Failed to save task:', err);
      setError('Failed to save task. Please try again later.');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await tasksAPI.delete(taskId);
        fetchTasks(); // Refresh task list
        setError(null);
      } catch (err) {
        console.error('Failed to delete task:', err);
        setError('Failed to delete task. Please try again later.');
      }
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await tasksAPI.update(taskId, { status: newStatus });
      fetchTasks(); // Refresh task list
    } catch (err) {
      console.error('Failed to update task status:', err);
      setError('Failed to update task status. Please try again later.');
    }
  };

  const renderTaskCard = (task) => (
    <Card key={task.id} className="task-card mb-2">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="mb-0 fs-6">{task.title}</Card.Title>
          <Badge bg={getPriorityColor(task.priority)} size="sm">
            {task.priority}
          </Badge>
        </div>
        <Card.Text className="text-muted small mb-2">
          {task.description}
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">
            👤 {task.assignedTo || 'Unassigned'}
          </small>
          <div>
            <Button 
              size="sm" 
              variant="outline-primary" 
              className="me-1" 
              onClick={() => handleEditTask(task)}
            >
              Edit
            </Button>
            <Button 
              size="sm" 
              variant="outline-danger"
              onClick={() => handleDeleteTask(task.id)}
            >
              Delete
            </Button>
          </div>
        </div>
        {task.dueDate && (
          <small className="text-muted d-block mt-1">
            📅 Due: {new Date(task.dueDate).toLocaleDateString()}
          </small>
        )}
        <div className="mt-2">
          <Form.Select 
            size="sm" 
            value={task.status || 'To Do'}
            onChange={(e) => handleStatusChange(task.id, e.target.value)}
          >
            {columns.map(column => (
              <option key={column} value={column}>{column}</option>
            ))}
          </Form.Select>
        </div>
      </Card.Body>
    </Card>
  );

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading tasks...</p>
      </Container>
    );
  }

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2>📋 Task Board</h2>
          <p className="text-muted">Manage your project tasks with complete CRUD operations</p>
        </Col>
        <Col xs="auto">
          <Button variant="primary" onClick={handleCreateTask}>
            ➕ Add Task
          </Button>
        </Col>
      </Row>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Row>
        {columns.map(column => (
          <Col key={column} md={3}>
            <Card className="task-column">
              <Card.Header className="bg-light">
                <h5 className="mb-0">{column}</h5>
                <small className="text-muted">
                  {groupedTasks[column]?.length || 0} tasks
                </small>
              </Card.Header>
              <Card.Body>
                {groupedTasks[column]?.map(renderTaskCard)}
                {column === 'To Do' && (
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    className="w-100"
                    onClick={handleCreateTask}
                  >
                    ➕ Add Task
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Task Modal */}
      <Modal show={showTaskModal} onHide={() => setShowTaskModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedTask ? '✏️ Edit Task' : '➕ Create New Task'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Task Title *</Form.Label>
              <Form.Control
                type="text"
                value={taskForm.title}
                onChange={(e) => setTaskForm(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter task title"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={taskForm.description}
                onChange={(e) => setTaskForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the task..."
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Priority</Form.Label>
                  <Form.Select
                    value={taskForm.priority}
                    onChange={(e) => setTaskForm(prev => ({ ...prev, priority: e.target.value }))}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Assigned To</Form.Label>
                  <Form.Control
                    type="text"
                    value={taskForm.assignedTo}
                    onChange={(e) => setTaskForm(prev => ({ ...prev, assignedTo: e.target.value }))}
                    placeholder="Enter assignee name"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={taskForm.status}
                    onChange={(e) => setTaskForm(prev => ({ ...prev, status: e.target.value }))}
                  >
                    {columns.map(column => (
                      <option key={column} value={column}>{column}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={taskForm.dueDate}
                    onChange={(e) => setTaskForm(prev => ({ ...prev, dueDate: e.target.value }))}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTaskModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveTask}>
            {selectedTask ? 'Update Task' : 'Create Task'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TaskBoard;
