# ⚡ Echo Chamber - Quick Reference Guide

## 📦 Project Contents

```
echo-chamber/
├── index.js          - Main application (1000+ lines, fully documented)
├── examples.js       - 10 practical examples demonstrating all features
├── package.json      - npm configuration and metadata
├── README.md         - Comprehensive documentation (2000+ words)
├── TESTING.md        - Detailed testing guide and results
└── QUICKREF.md       - This file!
```

## 🚀 Quick Start (30 seconds)

```bash
# Navigate to the project
cd echo-chamber

# Run the application
node index.js

# Or run tests
node index.js --test

# Or view examples
node examples.js
```

## 🎯 Key Features at a Glance

| Feature | Usage | Example |
|---------|-------|---------|
| Predict Next | Input sequence | `3, 6, 9, 12` → `15` |
| Multiple Predictions | `predict N` command | `predict 5` → next 5 numbers |
| View Memory | `memory` command | Shows all recorded echoes |
| See Examples | `example` command | Built-in sequence examples |
| Exit Application | `exit` command | Saves session summary |

## 📊 API Reference

### Validate Sequence
```javascript
isValidArithmeticProgression([3, 6, 9, 12]); // true
```

### Get Common Difference
```javascript
getCommonDifference([3, 6, 9, 12]); // 3
```

### Predict Next Number
```javascript
predictNextNumber([3, 6, 9, 12]); // 15
```

### Predict Multiple Numbers
```javascript
predictMultiple([3, 6, 9, 12], 3); // [15, 18, 21]
```

### Parse User Input
```javascript
parseSequence("3, 6, 9, 12"); // [3, 6, 9, 12]
```

### Manage Echo Memory
```javascript
const memory = new EchoMemory();
memory.recordEcho([3, 6, 9, 12], 15);
memory.getAllEchoes();     // Get all echoes
memory.getEchoCount();     // Get total count
memory.displayEchoes();    // Show formatted list
memory.clearEchoes();      // Clear memory
```

## ✅ Test Results

```
✅ 5/5 Core Tests Passing
✅ 4/4 Edge Cases Handled
✅ 3/3 Error Scenarios Managed
✅ 12/12 Total Tests Passing
```

## 📋 Typical Usage Patterns

### Pattern 1: Single Prediction
```
Input: 2, 4, 6, 8
Output: Next Echo: 10
```

### Pattern 2: Multiple Predictions
```
Input: predict 3
Input: 5, 10, 15, 20
Output: Next 3 numbers: [25, 30, 35]
```

### Pattern 3: Review Session
```
Input: memory
Output: [All recorded sequences with their predictions]
```

## 🔄 Command Examples

| Command | Purpose |
|---------|---------|
| `3, 6, 9, 12` | Predict next in sequence |
| `predict 5` | Request 5 future numbers |
| `memory` | View all stored echoes |
| `example` | Show example sequences |
| `exit` | Leave the chamber |

## ⚙️ System Requirements

- **Node.js**: 14.0.0 or higher
- **RAM**: Minimal (typically <50MB)
- **Disk**: <1MB
- **OS**: macOS, Linux, or Windows

## 📈 Performance

- **Startup**: <100ms
- **Prediction**: <1ms
- **Memory Storage**: <1ms
- **Scaling**: Handles 1000+ echoes efficiently

## 🔍 Common Questions

**Q: How do I input a sequence?**
A: Comma-separated numbers: `3, 6, 9, 12`

**Q: Can I use negative numbers?**
A: Yes! Example: `-5, -3, -1, 1`

**Q: Can I use decimals?**
A: Yes! Example: `1.5, 3, 4.5, 6`

**Q: Is data saved between sessions?**
A: Not currently (feature for future)

**Q: What's the maximum sequence size?**
A: No practical limit

## 🧪 Testing Cheat Sheet

```bash
# Run all tests
node index.js --test

# Run with detailed output
node index.js --test 2>&1 | less

# Run examples
node examples.js

# Interactive session
node index.js
```

## 💡 Educational Use

Perfect for teaching:
- ✅ Arithmetic progressions
- ✅ Pattern recognition
- ✅ Algorithm validation
- ✅ Console UI design
- ✅ State management
- ✅ Error handling
- ✅ Testing practices

## 🔧 Module Usage

```javascript
// Import functions
const {
  predictNextNumber,
  isValidArithmeticProgression,
  EchoMemory
} = require('./echo-chamber/index.js');

// Use in your code
const next = predictNextNumber([1, 2, 3, 4]);
console.log(next); // 5
```

## 🚨 Troubleshooting

| Problem | Solution |
|---------|----------|
| Node not found | Install Node.js from nodejs.org |
| Tests fail | Check Node version: `node --version` |
| Invalid input error | Use comma format: `1, 2, 3` |
| Memory too large | Restart application to clear |

## 📚 Documentation Files

- **README.md** - Complete guide (2000+ words)
- **TESTING.md** - Test results and procedures
- **QUICKREF.md** - This file
- **index.js** - Inline code documentation

## 🎓 Code Examples

### Basic Usage
```javascript
const { predictNextNumber } = require('./index.js');
const result = predictNextNumber([3, 6, 9, 12]);
console.log(result); // 15
```

### Validation
```javascript
const { isValidArithmeticProgression } = require('./index.js');
if (isValidArithmeticProgression([1, 2, 4, 8])) {
  console.log('Valid arithmetic progression');
} else {
  console.log('Not an arithmetic progression');
}
```

### Memory Management
```javascript
const { EchoMemory } = require('./index.js');
const memory = new EchoMemory();
memory.recordEcho([3, 6, 9, 12], 15);
console.log(memory.getEchoCount()); // 1
```

## 🎯 Next Steps

1. **Run the Application**: `node index.js`
2. **Read Full Guide**: Check `README.md`
3. **View Examples**: Run `node examples.js`
4. **Explore Code**: Open `index.js` in your editor
5. **Review Tests**: Check `TESTING.md`

## 📞 Support

- See **README.md** for detailed documentation
- Check **TESTING.md** for test information
- Review **index.js** for code comments
- Run `node examples.js` for practical demonstrations

---

**Welcome to the Chamber of Echoes!** ✨

May your sequences be harmonious and your patterns clear!
