/**
 * Echo Chamber Web Server
 * 
 * Express.js server that provides a web interface for the Echo Chamber
 * sequence prediction application. Serves both static files and API endpoints.
 * 
 * Usage: node server.js
 * Then visit http://localhost:3000 in your browser
 */

const express = require('express');
const path = require('path');
const {
  isValidArithmeticProgression,
  getCommonDifference,
  predictNextNumber,
  predictMultiple,
  parseSequence,
  EchoMemory
} = require('./index.js');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize echo memory for the server session
const serverMemory = new EchoMemory();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

// ==================== API Endpoints ====================

/**
 * POST /api/predict
 * Predicts the next number in a sequence
 */
app.post('/api/predict', (req, res) => {
  try {
    const { sequence } = req.body;

    // Validate input
    if (!Array.isArray(sequence)) {
      return res.status(400).json({
        success: false,
        error: 'Sequence must be an array of numbers'
      });
    }

    if (sequence.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Sequence must contain at least 2 numbers'
      });
    }

    // Validate arithmetic progression
    if (!isValidArithmeticProgression(sequence)) {
      return res.status(400).json({
        success: false,
        error: 'The sequence is not a valid arithmetic progression',
        hint: 'The difference between consecutive numbers must be constant'
      });
    }

    // Calculate prediction
    const commonDifference = getCommonDifference(sequence);
    const prediction = predictNextNumber(sequence);

    // Record in memory
    serverMemory.recordEcho(sequence, prediction);

    res.json({
      success: true,
      sequence,
      commonDifference,
      prediction,
      echoCount: serverMemory.getEchoCount()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'An error occurred during prediction',
      details: error.message
    });
  }
});

/**
 * POST /api/predict-multiple
 * Generates multiple predictions for a sequence
 */
app.post('/api/predict-multiple', (req, res) => {
  try {
    const { sequence, count } = req.body;

    if (!Array.isArray(sequence) || typeof count !== 'number' || count < 1) {
      return res.status(400).json({
        success: false,
        error: 'Invalid input: sequence must be an array and count must be > 0'
      });
    }

    if (!isValidArithmeticProgression(sequence)) {
      return res.status(400).json({
        success: false,
        error: 'The sequence is not a valid arithmetic progression'
      });
    }

    const predictions = predictMultiple(sequence, count);
    const commonDifference = getCommonDifference(sequence);

    res.json({
      success: true,
      sequence,
      commonDifference,
      predictions,
      count: predictions.length,
      echoCount: serverMemory.getEchoCount()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'An error occurred during prediction',
      details: error.message
    });
  }
});

/**
 * POST /api/validate
 * Validates if a sequence is an arithmetic progression
 */
app.post('/api/validate', (req, res) => {
  try {
    const { sequence } = req.body;

    if (!Array.isArray(sequence)) {
      return res.status(400).json({
        success: false,
        isValid: false,
        error: 'Sequence must be an array'
      });
    }

    const isValid = isValidArithmeticProgression(sequence);
    const commonDifference = isValid ? getCommonDifference(sequence) : null;

    res.json({
      success: true,
      sequence,
      isValid,
      commonDifference,
      message: isValid
        ? `Valid arithmetic progression with difference of ${commonDifference}`
        : 'Not a valid arithmetic progression'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'An error occurred during validation',
      details: error.message
    });
  }
});

/**
 * GET /api/memory
 * Retrieves all recorded echoes
 */
app.get('/api/memory', (req, res) => {
  try {
    const echoes = serverMemory.getAllEchoes();
    res.json({
      success: true,
      echoCount: serverMemory.getEchoCount(),
      echoes: echoes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'An error occurred retrieving memory',
      details: error.message
    });
  }
});

/**
 * DELETE /api/memory
 * Clears all recorded echoes
 */
app.delete('/api/memory', (req, res) => {
  try {
    serverMemory.clearEchoes();
    res.json({
      success: true,
      message: 'All echoes have been cleared',
      echoCount: serverMemory.getEchoCount()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'An error occurred clearing memory',
      details: error.message
    });
  }
});

/**
 * GET /api/status
 * Returns server status and statistics
 */
app.get('/api/status', (req, res) => {
  try {
    res.json({
      success: true,
      status: 'online',
      application: 'Echo Chamber',
      version: '1.0.0',
      echoCount: serverMemory.getEchoCount(),
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'An error occurred retrieving status',
      details: error.message
    });
  }
});

/**
 * POST /api/parse
 * Parses a string into a sequence array
 */
app.post('/api/parse', (req, res) => {
  try {
    const { input } = req.body;

    if (typeof input !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Input must be a string'
      });
    }

    const sequence = parseSequence(input);

    if (sequence === null) {
      return res.status(400).json({
        success: false,
        error: 'Invalid input format',
        hint: 'Please enter numbers separated by commas (e.g., "3, 6, 9, 12")'
      });
    }

    res.json({
      success: true,
      input,
      sequence,
      count: sequence.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'An error occurred parsing input',
      details: error.message
    });
  }
});

// ==================== Serve HTML ====================

/**
 * Serve the main index.html file
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

// ==================== Error Handling ====================

/**
 * 404 Not Found handler
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.path,
    method: req.method
  });
});

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ==================== Start Server ====================

app.listen(PORT, () => {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║           🏛️  CHAMBER OF ECHOES - WEB SERVER  🏛️            ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`✨ Server is running at http://localhost:${PORT}`);
  console.log('');
  console.log('📚 API Endpoints:');
  console.log(`   POST   http://localhost:${PORT}/api/predict`);
  console.log(`   POST   http://localhost:${PORT}/api/predict-multiple`);
  console.log(`   POST   http://localhost:${PORT}/api/validate`);
  console.log(`   POST   http://localhost:${PORT}/api/parse`);
  console.log(`   GET    http://localhost:${PORT}/api/memory`);
  console.log(`   DELETE http://localhost:${PORT}/api/memory`);
  console.log(`   GET    http://localhost:${PORT}/api/status`);
  console.log('');
  console.log('🌐 Web Interface:');
  console.log(`   Open your browser and visit http://localhost:${PORT}`);
  console.log('');
  console.log('🛑 To stop the server, press Ctrl+C');
  console.log('');
});

// ==================== Graceful Shutdown ====================

process.on('SIGINT', () => {
  console.log('\n\n✨ Closing the Chamber of Echoes...');
  console.log(`📊 Session Summary: ${serverMemory.getEchoCount()} echoes recorded`);
  console.log('👋 Thank you for visiting!\n');
  process.exit(0);
});
