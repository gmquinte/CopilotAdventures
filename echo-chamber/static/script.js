/**
 * Chamber of Echoes - Web Interface JavaScript
 * 
 * Handles all client-side logic for the web interface including:
 * - Form submission and validation
 * - API communication
 * - Memory management and display
 * - User feedback and notifications
 */

// ==================== API Client ====================

/**
 * API client class for communicating with the server
 */
class EchoChamberAPI {
  constructor(baseURL = '') {
    this.baseURL = baseURL || '';
  }

  /**
   * Make a request to the API
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'API request failed');
    }

    return response.json();
  }

  /**
   * Predict the next number in a sequence
   */
  predict(sequence) {
    return this.request('/api/predict', {
      method: 'POST',
      body: JSON.stringify({ sequence })
    });
  }

  /**
   * Predict multiple numbers
   */
  predictMultiple(sequence, count) {
    return this.request('/api/predict-multiple', {
      method: 'POST',
      body: JSON.stringify({ sequence, count })
    });
  }

  /**
   * Validate a sequence
   */
  validate(sequence) {
    return this.request('/api/validate', {
      method: 'POST',
      body: JSON.stringify({ sequence })
    });
  }

  /**
   * Parse a string into a sequence
   */
  parse(input) {
    return this.request('/api/parse', {
      method: 'POST',
      body: JSON.stringify({ input })
    });
  }

  /**
   * Get all stored echoes
   */
  getMemory() {
    return this.request('/api/memory');
  }

  /**
   * Clear all stored echoes
   */
  clearMemory() {
    return this.request('/api/memory', { method: 'DELETE' });
  }

  /**
   * Get server status
   */
  getStatus() {
    return this.request('/api/status');
  }
}

// ==================== UI Manager ====================

/**
 * UI manager class for handling all interface interactions
 */
class UIManager {
  constructor() {
    this.api = new EchoChamberAPI();
    this.initializeElements();
    this.attachEventListeners();
    this.loadMemory();
    this.checkStatus();
  }

  /**
   * Initialize DOM elements
   */
  initializeElements() {
    this.form = document.getElementById('sequenceForm');
    this.input = document.getElementById('sequenceInput');
    this.predictionCount = document.getElementById('predictionCount');
    this.predictMultipleBtn = document.getElementById('predictMultipleBtn');
    this.resultsContainer = document.getElementById('resultsContainer');
    this.memoryContainer = document.getElementById('memoryContainer');
    this.memoryStats = document.getElementById('memoryStats');
    this.clearMemoryBtn = document.getElementById('clearMemoryBtn');
    this.exampleBtns = document.querySelectorAll('.example-btn');
    this.loadingOverlay = document.getElementById('loadingOverlay');
    this.notification = document.getElementById('notification');
    this.statusBadge = document.getElementById('statusBadge');
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    // Form submission
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handlePrediction();
    });

    // Predict multiple button
    this.predictMultipleBtn.addEventListener('click', () => {
      this.handlePredictMultiple();
    });

    // Example buttons
    this.exampleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.input.value = btn.dataset.sequence;
        this.handlePrediction();
      });
    });

    // Clear memory button
    this.clearMemoryBtn.addEventListener('click', () => {
      this.handleClearMemory();
    });

    // Enter key on input
    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.form.dispatchEvent(new Event('submit'));
      }
    });
  }

  /**
   * Handle single prediction
   */
  async handlePrediction() {
    const inputValue = this.input.value.trim();
    if (!inputValue) {
      this.showNotification('Please enter a sequence', 'warning');
      return;
    }

    this.showLoading(true);

    try {
      // Parse the input
      const parseResult = await this.api.parse(inputValue);
      const sequence = parseResult.sequence;

      // Predict
      const result = await this.api.predict(sequence);

      // Display results
      this.displayResults(result);
      this.showNotification('✨ The chamber has spoken!', 'success');

      // Update memory
      await this.loadMemory();

      // Clear input
      this.input.value = '';
    } catch (error) {
      this.showNotification(error.message, 'error');
    } finally {
      this.showLoading(false);
    }
  }

  /**
   * Handle multiple predictions
   */
  async handlePredictMultiple() {
    const inputValue = this.input.value.trim();
    const count = parseInt(this.predictionCount.value);

    if (!inputValue || count < 1) {
      this.showNotification('Enter a sequence and select count', 'warning');
      return;
    }

    this.showLoading(true);

    try {
      // Parse the input
      const parseResult = await this.api.parse(inputValue);
      const sequence = parseResult.sequence;

      // Predict multiple
      const result = await this.api.predictMultiple(sequence, count);

      // Display results
      this.displayMultipleResults(result);
      this.showNotification(`✨ Predicted ${result.count} echoes!`, 'success');

      // Update memory
      await this.loadMemory();

      // Clear input
      this.input.value = '';
    } catch (error) {
      this.showNotification(error.message, 'error');
    } finally {
      this.showLoading(false);
    }
  }

  /**
   * Display single prediction results
   */
  displayResults(result) {
    const html = `
      <div class="result-box">
        <div class="result-label">Your Sequence</div>
        <div class="result-value">[${result.sequence.join(', ')}]</div>
        
        <div class="result-meta">
          <div class="meta-item">
            <div class="meta-label">Common Difference</div>
            <div class="meta-value">${result.commonDifference}</div>
          </div>
          <div class="meta-item">
            <div class="meta-label">🎯 Next Echo</div>
            <div class="meta-value">${result.prediction}</div>
          </div>
        </div>
      </div>
    `;
    this.resultsContainer.innerHTML = html;
  }

  /**
   * Display multiple predictions results
   */
  displayMultipleResults(result) {
    const html = `
      <div class="result-box">
        <div class="result-label">Your Sequence</div>
        <div class="result-value">[${result.sequence.join(', ')}]</div>
        
        <div class="result-meta">
          <div class="meta-item">
            <div class="meta-label">Common Difference</div>
            <div class="meta-value">${result.commonDifference}</div>
          </div>
          <div class="meta-item">
            <div class="meta-label">Predictions</div>
            <div class="meta-value">${result.count}</div>
          </div>
        </div>
        
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid var(--border-color);">
          <div class="result-label">🔮 Next ${result.count} Echoes</div>
          <div class="result-value">[${result.predictions.join(', ')}]</div>
        </div>
      </div>
    `;
    this.resultsContainer.innerHTML = html;
  }

  /**
   * Load and display memory
   */
  async loadMemory() {
    try {
      const result = await this.api.getMemory();
      const echoes = result.echoes;

      if (echoes.length === 0) {
        this.memoryContainer.innerHTML = '<p class="placeholder">No echoes recorded yet...</p>';
      } else {
        const html = echoes.map(echo => `
          <div class="echo-item">
            <div class="echo-sequence">[${echo.sequence.join(', ')}]</div>
            <div class="echo-prediction">→ ${echo.prediction}</div>
          </div>
        `).join('');
        this.memoryContainer.innerHTML = html;
      }

      // Update stats
      this.memoryStats.innerHTML = `
        <span>Total Echoes: <strong>${result.echoCount}</strong></span>
      `;
    } catch (error) {
      console.error('Failed to load memory:', error);
    }
  }

  /**
   * Handle clear memory
   */
  async handleClearMemory() {
    if (!confirm('Are you sure you want to clear all echoes from the chamber\'s memory?')) {
      return;
    }

    this.showLoading(true);

    try {
      await this.api.clearMemory();
      await this.loadMemory();
      this.showNotification('✨ Chamber memory cleared', 'success');
    } catch (error) {
      this.showNotification(error.message, 'error');
    } finally {
      this.showLoading(false);
    }
  }

  /**
   * Show/hide loading overlay
   */
  showLoading(show) {
    if (show) {
      this.loadingOverlay.classList.add('active');
    } else {
      this.loadingOverlay.classList.remove('active');
    }
  }

  /**
   * Show notification
   */
  showNotification(message, type = 'info') {
    // Remove existing notification classes
    this.notification.className = 'notification';

    // Add type class
    if (type) {
      this.notification.classList.add(type);
    }

    // Set message
    this.notification.textContent = message;

    // Show notification
    this.notification.classList.add('show');

    // Auto hide after 4 seconds
    setTimeout(() => {
      this.notification.classList.remove('show');
    }, 4000);
  }

  /**
   * Check server status
   */
  async checkStatus() {
    try {
      const status = await this.api.getStatus();
      this.updateStatusBadge(true);
    } catch (error) {
      this.updateStatusBadge(false);
    }

    // Check again every 30 seconds
    setInterval(() => {
      this.checkStatus();
    }, 30000);
  }

  /**
   * Update status badge
   */
  updateStatusBadge(online) {
    if (online) {
      this.statusBadge.innerHTML = '<span class="status-dot"></span><span>Online</span>';
    } else {
      this.statusBadge.innerHTML = '<span class="status-dot" style="background-color: var(--danger-color); animation: none;"></span><span>Offline</span>';
    }
  }
}

// ==================== Initialize ==================== 

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  const ui = new UIManager();
  console.log('✨ Chamber of Echoes web interface loaded');
});
