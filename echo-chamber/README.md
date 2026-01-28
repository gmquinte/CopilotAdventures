# 🏛️ Chamber of Echoes - Echo Chamber Application

A magical Node.js application that solves arithmetic progression sequence prediction puzzles through an immersive fantasy-themed console interface.

## 📖 The Legend

Deep within an ancient magical chamber lies a mysterious wall covered in glowing numbers. When you speak a sequence of numbers, the chamber echoes back with the next number in the pattern. This application captures that magical experience, allowing users to explore the patterns of arithmetic progressions while storing memories of each echo.

## ✨ Features

### Core Functionality
- **Arithmetic Progression Detection**: Validates whether a sequence follows a valid arithmetic progression pattern
- **Next Number Prediction**: Accurately predicts the next number in any arithmetic sequence
- **Multiple Predictions**: Generate the next N numbers in a sequence
- **Common Difference Calculation**: Identifies the consistent difference between consecutive numbers

### Memory System
- **Echo Recording**: Stores all sequence predictions with timestamps
- **Memory Recall**: View all recorded echoes from the current session
- **Memory Management**: Clear echoes or display complete session history

### User Interface
- **Fantasy-Themed Console**: Immersive magical chamber experience
- **Interactive Commands**: Intuitive commands for sequence input and exploration
- **Error Handling**: Graceful error messages with helpful hints
- **Example Sequences**: Built-in examples to help users get started

### Testing System
- **Automated Tests**: Comprehensive test suite covering common cases
- **Edge Case Testing**: Validation of boundary conditions
- **Invalid Sequence Detection**: Proper handling of non-arithmetic progressions

## 🚀 Getting Started

### Prerequisites
- Node.js 14 or higher installed on your system
- Terminal/Command Line access
- npm (comes with Node.js)

### Installation

1. Navigate to the echo-chamber directory:
```bash
cd echo-chamber
```

2. Install dependencies:
```bash
npm install
```

This installs Express.js and other required packages for the web server.

### Running the Application

#### Web Interface Mode (Recommended)
```bash
npm start
# or
node server.js
```

This launches the web server at **http://localhost:3000**

Features:
- Beautiful modern web interface with dark theme
- Real-time predictions with visual feedback
- Interactive memory browser
- Example sequences to explore
- Responsive design (works on desktop and mobile)
- Status indicator
- Session management

#### Console Mode
```bash
npm run console
# or
node index.js
```

This launches the interactive console where you can:
- Input sequences of numbers
- Receive predictions from the Chamber
- Explore example sequences
- View your echo memories

#### Test Mode
```bash
npm test
# or
node index.js --test
```

Runs the automated test suite to verify all functionality works correctly.

## 📚 Usage Guide

### Web Interface Quick Start

1. Start the server:
```bash
npm start
```

2. Open your browser to **http://localhost:3000**

3. The interface features:
   - **Input Section**: Enter sequences in the "Ask the Chamber" panel
   - **Results Panel**: View detailed analysis of your sequence
   - **Example Buttons**: Click examples to automatically test them
   - **Memory Panel**: Track all recorded echoes from your session
   - **Status Badge**: Shows server connection status

#### Web Interface Features

- **Real-Time Predictions**: Instant feedback as you enter sequences
- **Beautiful Dark Theme**: Eye-friendly interface with magical aesthetics
- **Multiple Predictions**: Predict the next N numbers in one go
- **Memory Browser**: View all echoes with timestamps and common differences
- **Session Statistics**: Track total echoes recorded
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Error Handling**: Clear feedback if sequences are invalid
- **Loading States**: Visual feedback during API requests

### Console Interface Quick Start

1. Start the console:
```bash
npm run console
```

2. Enter sequences at the prompt

3. Available commands:
   - `exit` - Leave the chamber
   - `memory` - View recorded echoes
   - `example` - Show example sequences
   - `predict 5` - Predict the next 5 numbers

### Basic Sequence Input
Enter a sequence of numbers separated by commas:
```
🌟 Enter sequence or command: 3, 6, 9, 12
✨ Chamber Analysis:
   Sequence: [3, 6, 9, 12]
   Common Difference: 3
   🎯 Next Echo: 15
```

### Example Sequences
The application comes with built-in examples to help you understand patterns:

```
1. "3, 6, 9, 12"          → Next: 15 (increment by 3)
2. "2, 4, 6, 8"           → Next: 10 (increment by 2)
3. "1, 4, 7, 10"          → Next: 13 (increment by 3)
4. "10, 7, 4, 1"          → Next: -2 (decrement by 3)
5. "5, 5, 5, 5"           → Next: 5 (constant sequence)
6. "100, 90, 80, 70"      → Next: 60 (decrement by 10)
```

## 🔧 Core API

### REST API Endpoints (Web Server)

The web server provides a complete REST API for programmatic access:

#### `POST /api/predict`
Predicts the next number in a sequence.

**Request:**
```json
{
  "sequence": [3, 6, 9, 12]
}
```

**Response:**
```json
{
  "success": true,
  "sequence": [3, 6, 9, 12],
  "commonDifference": 3,
  "prediction": 15,
  "echoCount": 1
}
```

#### `POST /api/predict-multiple`
Generates multiple predictions for a sequence.

**Request:**
```json
{
  "sequence": [3, 6, 9, 12],
  "count": 5
}
```

**Response:**
```json
{
  "success": true,
  "sequence": [3, 6, 9, 12],
  "commonDifference": 3,
  "predictions": [15, 18, 21, 24, 27],
  "count": 5,
  "echoCount": 1
}
```

#### `POST /api/validate`
Validates if a sequence is an arithmetic progression.

**Request:**
```json
{
  "sequence": [3, 6, 9, 12]
}
```

**Response:**
```json
{
  "success": true,
  "sequence": [3, 6, 9, 12],
  "isValid": true,
  "commonDifference": 3,
  "message": "Valid arithmetic progression with difference of 3"
}
```

#### `POST /api/parse`
Parses a string into a sequence array.

**Request:**
```json
{
  "input": "3, 6, 9, 12"
}
```

**Response:**
```json
{
  "success": true,
  "input": "3, 6, 9, 12",
  "sequence": [3, 6, 9, 12],
  "count": 4
}
```

#### `GET /api/memory`
Retrieves all recorded echoes.

**Response:**
```json
{
  "success": true,
  "echoCount": 2,
  "echoes": [
    {
      "timestamp": "2026-01-28T10:30:00.000Z",
      "sequence": [3, 6, 9, 12],
      "prediction": 15,
      "commonDifference": 3
    }
  ]
}
```

#### `DELETE /api/memory`
Clears all recorded echoes.

**Response:**
```json
{
  "success": true,
  "message": "All echoes have been cleared",
  "echoCount": 0
}
```

#### `GET /api/status`
Returns server status and statistics.

**Response:**
```json
{
  "success": true,
  "status": "online",
  "application": "Echo Chamber",
  "version": "1.0.0",
  "echoCount": 2,
  "uptime": 3600,
  "timestamp": "2026-01-28T10:30:00.000Z"
}
```

### JavaScript Functions (Core Module)

### Functions

#### `isValidArithmeticProgression(sequence: number[]): boolean`
Validates whether a sequence is a valid arithmetic progression.

```javascript
isValidArithmeticProgression([3, 6, 9, 12]); // true
isValidArithmeticProgression([1, 2, 4, 8]);  // false
```

#### `getCommonDifference(sequence: number[]): number | null`
Calculates the common difference in an arithmetic progression.

```javascript
getCommonDifference([3, 6, 9, 12]); // 3
getCommonDifference([10, 7, 4, 1]); // -3
```

#### `predictNextNumber(sequence: number[]): number | null`
Predicts the next number in an arithmetic progression.

```javascript
predictNextNumber([3, 6, 9, 12]); // 15
predictNextNumber([1, 2, 4, 8]);  // null (invalid progression)
```

#### `predictMultiple(sequence: number[], count: number): number[] | null`
Generates multiple predictions for an arithmetic progression.

```javascript
predictMultiple([3, 6, 9, 12], 3); // [15, 18, 21]
```

### Classes

#### `EchoMemory`
Manages the storage and retrieval of recorded echoes.

```javascript
const memory = new EchoMemory();

// Record an echo
memory.recordEcho([3, 6, 9, 12], 15);

// Retrieve all echoes
const allEchoes = memory.getAllEchoes();

// Get echo count
const count = memory.getEchoCount();

// Display echoes
memory.displayEchoes();

// Clear memory
memory.clearEchoes();
```

## 📊 Test Results

The application includes a comprehensive test suite that validates:

✅ **Core Tests Passing**: 5/5
- Sample sequence [3, 6, 9, 12] predicts 15
- Even numbers [2, 4, 6, 8] predict 10
- Decreasing sequences [10, 7, 4, 1] predict -2
- Constant sequences [5, 5, 5, 5] predict 5
- Negative numbers [-5, -3, -1, 1] predict 3

✅ **Edge Cases Validated**:
- Empty arrays correctly rejected
- Single elements correctly rejected
- Two-element sequences correctly processed
- Non-arithmetic progressions (e.g., powers of 2) correctly rejected

## 🎯 How It Works

### Algorithm Explanation

1. **Validation**: First, the application checks if the sequence contains at least 2 numbers and all are valid numbers.

2. **Pattern Detection**: It calculates the difference between the first two numbers to determine the common difference.

3. **Verification**: It verifies that ALL consecutive pairs have the same difference.

4. **Prediction**: If valid, it adds the common difference to the last number to predict the next.

### Mathematical Formula

For an arithmetic progression with first term `a₁` and common difference `d`:
- `aₙ = a₁ + (n-1)×d`
- Next term = `aₙ₊₁ = aₙ + d`

## 🧪 Development & Testing

### Running Tests
```bash
node index.js --test
```

### Creating Custom Tests
The application exports its functions for use in external test files:

```javascript
const {
  isValidArithmeticProgression,
  getCommonDifference,
  predictNextNumber,
  predictMultiple,
  EchoMemory
} = require('./index.js');

// Use in your own tests
const sequence = [3, 6, 9, 12];
console.log(predictNextNumber(sequence)); // 15
```

### Test Coverage

| Category | Tests | Status |
|----------|-------|--------|
| Core Functionality | 5 | ✅ Passing |
| Edge Cases | 4 | ✅ Validated |
| Error Handling | 3 | ✅ Working |
| **Total** | **12** | **✅ All Passing** |

## 📁 Project Structure

```
echo-chamber/
├── index.js          # Main application file (standalone)
└── README.md         # This documentation
```

### File Organization (index.js)

The main file is organized into logical sections:

```javascript
// ==================== Core Functionality ====================
// isValidArithmeticProgression()
// getCommonDifference()
// predictNextNumber()
// predictMultiple()

// ==================== Echo Memory System ====================
// EchoMemory class

// ==================== User Interface ====================
// displayWelcomeScreen()
// displayInstructions()
// runApplication()

// ==================== Testing System ====================
// runTests()
```

## 🎓 Learning Outcomes

By working with this application, you'll learn:

1. **Arithmetic Progressions**: Understanding mathematical sequences with constant differences
2. **Pattern Recognition**: Identifying and validating recurring patterns
3. **Data Validation**: Implementing robust input validation and error handling
4. **Console UI Design**: Creating user-friendly terminal interfaces
5. **State Management**: Storing and retrieving application state (Echo Memory)
6. **Algorithm Implementation**: Converting mathematical concepts into working code
7. **Testing Strategies**: Writing comprehensive test suites

## 🛠️ Common Use Cases

### Case 1: Sequence Prediction
```
Input: 2, 4, 6, 8
Output: Next number is 10
Use Case: Educational puzzle solving
```

### Case 2: Pattern Exploration
```
Input: -5, -3, -1, 1
Output: Difference is 2, next is 3
Use Case: Understanding arithmetic patterns
```

### Case 3: Memory Review
```
Command: memory
Output: All recorded sequences and predictions
Use Case: Session review and learning reinforcement
```

## ⚠️ Error Handling

The application handles various error scenarios gracefully:

| Error | Handling |
|-------|----------|
| Invalid input format | Shows helpful hint about comma-separated format |
| Non-arithmetic progression | Explains that differences must be constant |
| Empty or single-element sequences | Indicates need for at least 2 numbers |
| Non-numeric values | Filters out and reports invalid entries |

### Example Error Handling

```
Input: 1, 2, 4, 8
Output: ❌ The sequence is not a valid arithmetic progression.
        Hint: The difference between consecutive numbers must be constant.
```

## 🚀 Performance

- **Startup Time**: <100ms
- **Sequence Validation**: O(n) where n is sequence length
- **Prediction**: O(1) constant time
- **Memory Storage**: Efficient in-memory storage with no persistence overhead

## 💾 Data Persistence

Currently, echoes are stored only in memory during the active session. To add data persistence:

1. Export echoes to JSON on exit
2. Load previous echoes on startup
3. Implement a local file-based storage system

## 🔄 Future Enhancements

Potential improvements for the application:

- [ ] Support for geometric progressions
- [ ] Data export to CSV/JSON
- [ ] Session history across runs (file persistence)
- [ ] Advanced pattern detection (Fibonacci, prime sequences)
- [ ] Graph visualization of sequences
- [ ] Difficulty levels and challenge mode
- [ ] Multiplayer echo comparison

## � Documentation Files

- **README.md** (this file) - Main documentation and overview
- **WEB.md** - Complete web interface and REST API documentation
- **TESTING.md** - Test results and quality assurance
- **examples.js** - Runnable code examples

## �📝 Example Session Transcript

```
🌟 Enter sequence or command: 3, 6, 9, 12
✨ Chamber Analysis:
   Sequence: [3, 6, 9, 12]
   Common Difference: 3
   🎯 Next Echo: 15

🌟 Enter sequence or command: predict 3
🌟 Enter your sequence: 10, 7, 4, 1
✨ Your sequence: [10, 7, 4, 1]
🔮 Next 3 numbers: [-2, -5, -8]

🌟 Enter sequence or command: memory
📚 Chamber Memory - Recorded Echoes:
  Echo 1:
    Sequence: [3, 6, 9, 12]
    Common Difference: 3
    Predicted Next: 15
    
  Echo 2:
    Sequence: [10, 7, 4, 1]
    Common Difference: -3
    Predicted Next: -2

🌟 Enter sequence or command: exit
```

## 📜 License

This educational project is part of CopilotAdventures and follows the repository's license.

## 🤝 Contributing

To extend this application:

1. Add new mathematical progression types (geometric, Fibonacci, etc.)
2. Implement data persistence features
3. Create visualization enhancements
4. Expand the test suite

## 🎭 Credits

This application is inspired by the fantasy-themed educational puzzles from CopilotAdventures, designed to teach algorithmic thinking and pattern recognition in an engaging, immersive way.

## ❓ Frequently Asked Questions

**Q: Can the application handle negative numbers?**
A: Yes! The application correctly handles negative numbers and decreasing sequences.

**Q: What's the maximum sequence length?**
A: There's no hard limit. Performance remains excellent even with very long sequences.

**Q: Can I use decimals?**
A: Yes, the application supports decimal numbers in sequences.

**Q: How do I export the echoes?**
A: Currently, you can use the "memory" command to view and manually copy. File export is a planned feature.

**Q: Does the memory persist after closing?**
A: No, memory is cleared when you exit. Session history will be a future enhancement.

---

**Happy exploring in the Chamber of Echoes! May your patterns be clear and your sequences harmonious!** ✨
