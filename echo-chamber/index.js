#!/usr/bin/env node

/**
 * Echo Chamber Application - A Magical Number Sequence Predictor
 * 
 * This application solves the Chamber of Echoes puzzle by predicting
 * the next number in arithmetic progression sequences. It demonstrates
 * pattern recognition and mathematical reasoning through an interactive
 * fantasy-themed console interface.
 * 
 * Usage: node index.js
 */

// ==================== Core Functionality ====================

/**
 * Validates that a sequence forms a valid arithmetic progression
 * @param {number[]} sequence - The sequence to validate
 * @returns {boolean} - True if valid arithmetic progression, false otherwise
 */
function isValidArithmeticProgression(sequence) {
  // Need at least 2 numbers to determine a pattern
  if (!Array.isArray(sequence) || sequence.length < 2) {
    return false;
  }

  // All elements must be numbers
  if (!sequence.every(num => typeof num === 'number' && !isNaN(num))) {
    return false;
  }

  // Calculate the common difference from first two numbers
  const commonDifference = sequence[1] - sequence[0];

  // Check that all consecutive differences match
  for (let i = 2; i < sequence.length; i++) {
    if (sequence[i] - sequence[i - 1] !== commonDifference) {
      return false;
    }
  }

  return true;
}

/**
 * Calculates the common difference in an arithmetic progression
 * @param {number[]} sequence - The sequence to analyze
 * @returns {number|null} - The common difference, or null if invalid
 */
function getCommonDifference(sequence) {
  if (!isValidArithmeticProgression(sequence)) {
    return null;
  }
  return sequence[1] - sequence[0];
}

/**
 * Predicts the next number in an arithmetic progression
 * @param {number[]} sequence - The sequence to extend
 * @returns {number|null} - The predicted next number, or null if invalid sequence
 */
function predictNextNumber(sequence) {
  if (!isValidArithmeticProgression(sequence)) {
    return null;
  }

  const commonDifference = getCommonDifference(sequence);
  const lastNumber = sequence[sequence.length - 1];
  return lastNumber + commonDifference;
}

/**
 * Generates multiple predictions for an arithmetic progression
 * @param {number[]} sequence - The sequence to extend
 * @param {number} count - How many predictions to generate
 * @returns {number[]|null} - Array of predicted numbers, or null if invalid sequence
 */
function predictMultiple(sequence, count = 5) {
  if (!isValidArithmeticProgression(sequence) || count < 1) {
    return null;
  }

  const commonDifference = getCommonDifference(sequence);
  const predictions = [];
  let currentNumber = sequence[sequence.length - 1];

  for (let i = 0; i < count; i++) {
    currentNumber += commonDifference;
    predictions.push(currentNumber);
  }

  return predictions;
}

// ==================== Echo Memory System ====================

/**
 * Echo Memory Manager - Stores and retrieves sequence predictions
 */
class EchoMemory {
  constructor() {
    this.echoes = [];
  }

  /**
   * Records an echo of a sequence and its prediction
   * @param {number[]} sequence - The original sequence
   * @param {number} prediction - The predicted next number
   */
  recordEcho(sequence, prediction) {
    this.echoes.push({
      timestamp: new Date().toISOString(),
      sequence: [...sequence],
      prediction: prediction,
      commonDifference: getCommonDifference(sequence)
    });
  }

  /**
   * Retrieves all recorded echoes
   * @returns {object[]} - Array of recorded echoes
   */
  getAllEchoes() {
    return this.echoes;
  }

  /**
   * Retrieves echoes count
   * @returns {number} - Number of stored echoes
   */
  getEchoCount() {
    return this.echoes.length;
  }

  /**
   * Clears all recorded echoes
   */
  clearEchoes() {
    this.echoes = [];
  }

  /**
   * Displays all recorded echoes in a readable format
   */
  displayEchoes() {
    if (this.echoes.length === 0) {
      console.log('\n✨ No echoes recorded yet...\n');
      return;
    }

    console.log('\n📚 Chamber Memory - Recorded Echoes:\n');
    this.echoes.forEach((echo, index) => {
      console.log(`  Echo ${index + 1}:`);
      console.log(`    Sequence: [${echo.sequence.join(', ')}]`);
      console.log(`    Common Difference: ${echo.commonDifference}`);
      console.log(`    Predicted Next: ${echo.prediction}`);
      console.log(`    Time: ${echo.timestamp}`);
      console.log('');
    });
  }
}

// ==================== User Interface ====================

/**
 * Displays the welcome screen with story context
 */
function displayWelcomeScreen() {
  console.clear();
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║                   🏛️  CHAMBER OF ECHOES  🏛️                   ║');
  console.log('║             A Magical Number Sequence Predictor              ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  console.log('📖 The Legend:\n');
  console.log('   Deep within an ancient magical chamber lies a mysterious wall');
  console.log('   covered in glowing numbers. When you speak a sequence of numbers,');
  console.log('   the chamber echoes back with the next number in the pattern.\n');
  console.log('   Your task: Understand the patterns and predict the echoes!\n');

  console.log('✨ How It Works:\n');
  console.log('   1. Input a sequence of numbers (arithmetic progression)');
  console.log('   2. The chamber analyzes the pattern');
  console.log('   3. The chamber echoes back the next number');
  console.log('   4. All echoes are remembered in the chamber\'s memory\n');
}

/**
 * Displays instructions for the user
 */
function displayInstructions() {
  console.log('📝 Instructions:\n');
  console.log('   • Enter numbers separated by commas (e.g., "3, 6, 9, 12")');
  console.log('   • Press Enter to predict the next number');
  console.log('   • Type "memory" to see all recorded echoes');
  console.log('   • Type "example" to see test sequences');
  console.log('   • Type "predict 5" to predict the next 5 numbers');
  console.log('   • Type "exit" to leave the chamber\n');
}

/**
 * Displays example sequences
 */
function displayExamples() {
  console.log('\n🔮 Example Sequences You Can Try:\n');
  console.log('   1. "3, 6, 9, 12"          → Next: 15');
  console.log('   2. "2, 4, 6, 8"           → Next: 10');
  console.log('   3. "1, 4, 7, 10"          → Next: 13');
  console.log('   4. "10, 7, 4, 1"          → Next: -2 (decreasing)');
  console.log('   5. "5, 5, 5, 5"           → Next: 5 (constant)');
  console.log('   6. "100, 90, 80, 70"      → Next: 60\n');
}

/**
 * Main application loop - interactive console interface
 */
async function runApplication() {
  displayWelcomeScreen();
  displayInstructions();

  const memory = new EchoMemory();
  const readline = await import('readline');
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (prompt) => new Promise(resolve => rl.question(prompt, resolve));

  let running = true;

  while (running) {
    try {
      const input = await question('🌟 Enter sequence or command: ').catch(() => 'exit');

      if (!input || input.toLowerCase() === 'exit') {
        running = false;
        displayExitMessage(memory);
        rl.close();
        break;
      }

      if (input.toLowerCase() === 'memory') {
        memory.displayEchoes();
        continue;
      }

      if (input.toLowerCase() === 'example') {
        displayExamples();
        continue;
      }

      if (input.toLowerCase().startsWith('predict ')) {
        const count = parseInt(input.split(' ')[1]);
        if (isNaN(count) || count < 1) {
          console.log('❌ Invalid count. Use "predict 5" to predict the next 5 numbers.\n');
          continue;
        }

        const sequence = await question('🌟 Enter your sequence: ').catch(() => 'exit');
        if (sequence.toLowerCase() === 'exit') {
          running = false;
          break;
        }

        const parsed = parseSequence(sequence);
        if (parsed === null) {
          console.log('❌ Invalid sequence format. Please enter numbers separated by commas.\n');
          continue;
        }

        const predictions = predictMultiple(parsed, count);
        if (predictions === null) {
          console.log('❌ The sequence is not a valid arithmetic progression.\n');
          console.log('   Hint: Check that the difference between consecutive numbers is constant.\n');
          continue;
        }

        console.log(`\n✨ Your sequence: [${parsed.join(', ')}]`);
        console.log(`🔮 Next ${count} numbers: [${predictions.join(', ')}]\n`);
        memory.recordEcho(parsed, predictions[0]);
        continue;
      }

      // Process regular sequence input
      const sequence = parseSequence(input);

      if (sequence === null) {
        console.log('❌ Invalid input format. Please enter numbers separated by commas.\n');
        continue;
      }

      if (!isValidArithmeticProgression(sequence)) {
        console.log('❌ The sequence is not a valid arithmetic progression.');
        console.log('   Hint: The difference between consecutive numbers must be constant.\n');
        continue;
      }

      const prediction = predictNextNumber(sequence);
      const commonDiff = getCommonDifference(sequence);

      console.log(`\n✨ Chamber Analysis:`);
      console.log(`   Sequence: [${sequence.join(', ')}]`);
      console.log(`   Common Difference: ${commonDiff}`);
      console.log(`   🎯 Next Echo: ${prediction}\n`);

      memory.recordEcho(sequence, prediction);

    } catch (error) {
      console.log('❌ An error occurred. Please try again.\n');
    }
  }
}

/**
 * Parses a comma-separated string into an array of numbers
 * @param {string} input - The input string
 * @returns {number[]|null} - Array of numbers or null if invalid
 */
function parseSequence(input) {
  if (typeof input !== 'string') {
    return null;
  }

  try {
    const parts = input.split(',').map(part => {
      const num = parseFloat(part.trim());
      return isNaN(num) ? null : num;
    });

    if (parts.some(p => p === null)) {
      return null;
    }

    return parts;
  } catch {
    return null;
  }
}

/**
 * Displays exit message and summary
 */
function displayExitMessage(memory) {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║            🌟 Thank You for Visiting the Chamber! 🌟           ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  console.log(`📊 Session Summary:`);
  console.log(`   Total Echoes Recorded: ${memory.getEchoCount()}`);
  
  if (memory.getEchoCount() > 0) {
    memory.displayEchoes();
  }

  console.log('✨ May the patterns guide your path!\n');
  process.exit(0);
}

// ==================== Testing System ====================

/**
 * Runs automated tests on the sequence predictor
 */
function runTests() {
  console.log('\n🧪 Running Test Suite...\n');

  const tests = [
    {
      name: 'Sample Sequence [3, 6, 9, 12]',
      sequence: [3, 6, 9, 12],
      expectedNext: 15,
      expectedDiff: 3
    },
    {
      name: 'Even Numbers [2, 4, 6, 8]',
      sequence: [2, 4, 6, 8],
      expectedNext: 10,
      expectedDiff: 2
    },
    {
      name: 'Decreasing [10, 7, 4, 1]',
      sequence: [10, 7, 4, 1],
      expectedNext: -2,
      expectedDiff: -3
    },
    {
      name: 'Constant [5, 5, 5, 5]',
      sequence: [5, 5, 5, 5],
      expectedNext: 5,
      expectedDiff: 0
    },
    {
      name: 'Negative Numbers [-5, -3, -1, 1]',
      sequence: [-5, -3, -1, 1],
      expectedNext: 3,
      expectedDiff: 2
    }
  ];

  let passed = 0;
  let failed = 0;

  tests.forEach(test => {
    const prediction = predictNextNumber(test.sequence);
    const diff = getCommonDifference(test.sequence);
    const isValid = isValidArithmeticProgression(test.sequence);

    if (
      isValid &&
      prediction === test.expectedNext &&
      diff === test.expectedDiff
    ) {
      console.log(`✅ ${test.name}`);
      passed++;
    } else {
      console.log(`❌ ${test.name}`);
      console.log(`   Expected: ${test.expectedNext}, Got: ${prediction}`);
      failed++;
    }
  });

  console.log(`\n📈 Test Results: ${passed} passed, ${failed} failed\n`);

  // Edge cases
  console.log('🔍 Edge Case Tests:\n');

  // Invalid sequences
  console.log('  Invalid Progression [1, 2, 4, 8] (powers of 2):');
  console.log(
    `    Valid: ${isValidArithmeticProgression([1, 2, 4, 8])}`
  );

  console.log('  Empty Array:');
  console.log(`    Valid: ${isValidArithmeticProgression([])}`);

  console.log('  Single Element [5]:');
  console.log(`    Valid: ${isValidArithmeticProgression([5])}`);

  console.log('  Two Elements [3, 6]:');
  console.log(`    Valid: ${isValidArithmeticProgression([3, 6])}`);
  console.log(`    Prediction: ${predictNextNumber([3, 6])}\n`);
}

// ==================== Application Entry Point ====================

/**
 * Main entry point - determines whether to run interactive mode or tests
 */
async function main() {
  // Check for command-line arguments
  const args = process.argv.slice(2);

  if (args.includes('--test')) {
    runTests();
    process.exit(0);
  }

  // Run interactive application
  await runApplication();
}

// Start the application
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

// ==================== Exports for Module Usage ====================

module.exports = {
  isValidArithmeticProgression,
  getCommonDifference,
  predictNextNumber,
  predictMultiple,
  parseSequence,
  EchoMemory,
  runTests
};
