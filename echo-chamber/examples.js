#!/usr/bin/env node

/**
 * Quick Start Examples - Echo Chamber Application
 * 
 * This file demonstrates how to use the Echo Chamber application
 * both interactively and programmatically.
 * 
 * Run this file with: node examples.js
 */

const {
  isValidArithmeticProgression,
  getCommonDifference,
  predictNextNumber,
  predictMultiple,
  parseSequence,
  EchoMemory,
  runTests
} = require('./index.js');

// ==================== Example 1: Basic Usage ====================

console.log('═══════════════════════════════════════════════════════════');
console.log('Example 1: Basic Sequence Prediction');
console.log('═══════════════════════════════════════════════════════════\n');

const sequence1 = [3, 6, 9, 12];
console.log(`Sequence: [${sequence1.join(', ')}]`);
console.log(`Is valid arithmetic progression? ${isValidArithmeticProgression(sequence1)}`);
console.log(`Common difference: ${getCommonDifference(sequence1)}`);
console.log(`Next number: ${predictNextNumber(sequence1)}`);
console.log();

// ==================== Example 2: Decreasing Sequence ====================

console.log('═══════════════════════════════════════════════════════════');
console.log('Example 2: Decreasing Sequence');
console.log('═══════════════════════════════════════════════════════════\n');

const sequence2 = [100, 90, 80, 70];
console.log(`Sequence: [${sequence2.join(', ')}]`);
console.log(`Common difference: ${getCommonDifference(sequence2)}`);
console.log(`Next number: ${predictNextNumber(sequence2)}`);
console.log();

// ==================== Example 3: Negative Numbers ====================

console.log('═══════════════════════════════════════════════════════════');
console.log('Example 3: Sequence with Negative Numbers');
console.log('═══════════════════════════════════════════════════════════\n');

const sequence3 = [-5, -3, -1, 1];
console.log(`Sequence: [${sequence3.join(', ')}]`);
console.log(`Common difference: ${getCommonDifference(sequence3)}`);
console.log(`Next number: ${predictNextNumber(sequence3)}`);
console.log();

// ==================== Example 4: Multiple Predictions ====================

console.log('═══════════════════════════════════════════════════════════');
console.log('Example 4: Multiple Predictions');
console.log('═══════════════════════════════════════════════════════════\n');

const sequence4 = [2, 4, 6, 8];
const predictions = predictMultiple(sequence4, 5);
console.log(`Sequence: [${sequence4.join(', ')}]`);
console.log(`Next 5 numbers: [${predictions.join(', ')}]`);
console.log();

// ==================== Example 5: Invalid Sequence ====================

console.log('═══════════════════════════════════════════════════════════');
console.log('Example 5: Invalid Sequence (Not Arithmetic Progression)');
console.log('═══════════════════════════════════════════════════════════\n');

const sequence5 = [1, 2, 4, 8];
console.log(`Sequence: [${sequence5.join(', ')}]`);
console.log(`Is valid arithmetic progression? ${isValidArithmeticProgression(sequence5)}`);
console.log(`Next number: ${predictNextNumber(sequence5)}`);
console.log(`Reason: This is a geometric progression (powers of 2), not arithmetic\n`);

// ==================== Example 6: Edge Cases ====================

console.log('═══════════════════════════════════════════════════════════');
console.log('Example 6: Edge Cases');
console.log('═══════════════════════════════════════════════════════════\n');

const edgeCases = [
  { name: 'Constant sequence', seq: [5, 5, 5, 5] },
  { name: 'Two elements only', seq: [3, 6] },
  { name: 'Large numbers', seq: [1000, 2000, 3000, 4000] },
  { name: 'Decimal numbers', seq: [1.5, 3.0, 4.5, 6.0] }
];

edgeCases.forEach(testCase => {
  console.log(`${testCase.name}: [${testCase.seq.join(', ')}]`);
  console.log(`  Valid: ${isValidArithmeticProgression(testCase.seq)}`);
  if (isValidArithmeticProgression(testCase.seq)) {
    console.log(`  Next: ${predictNextNumber(testCase.seq)}`);
  }
  console.log();
});

// ==================== Example 7: Echo Memory System ====================

console.log('═══════════════════════════════════════════════════════════');
console.log('Example 7: Using the Echo Memory System');
console.log('═══════════════════════════════════════════════════════════\n');

const memory = new EchoMemory();

// Record some echoes
memory.recordEcho([3, 6, 9, 12], 15);
memory.recordEcho([2, 4, 6, 8], 10);
memory.recordEcho([10, 7, 4, 1], -2);

console.log(`Total echoes recorded: ${memory.getEchoCount()}\n`);

// Retrieve all echoes
const allEchoes = memory.getAllEchoes();
console.log('All recorded echoes:');
allEchoes.forEach((echo, index) => {
  console.log(`  ${index + 1}. [${echo.sequence.join(', ')}] → ${echo.prediction}`);
});
console.log();

// ==================== Example 8: String Parsing ====================

console.log('═══════════════════════════════════════════════════════════');
console.log('Example 8: Parsing User Input');
console.log('═══════════════════════════════════════════════════════════\n');

const userInputs = [
  '3, 6, 9, 12',
  '1,2,3,4,5',
  '  10  ,  20  ,  30  ',
  'invalid input',
  '1, 2, a, 4'
];

userInputs.forEach(input => {
  const parsed = parseSequence(input);
  console.log(`Input: "${input}"`);
  console.log(`Parsed: ${parsed ? `[${parsed.join(', ')}]` : 'null (invalid)'}\n`);
});

// ==================== Example 9: Complete Workflow ====================

console.log('═══════════════════════════════════════════════════════════');
console.log('Example 9: Complete Workflow');
console.log('═══════════════════════════════════════════════════════════\n');

function analyzeSequence(input) {
  const sequence = parseSequence(input);
  
  if (sequence === null) {
    console.log(`❌ Invalid input: "${input}"`);
    return;
  }
  
  if (!isValidArithmeticProgression(sequence)) {
    console.log(`❌ Not an arithmetic progression: [${sequence.join(', ')}]`);
    return;
  }
  
  const diff = getCommonDifference(sequence);
  const next = predictNextNumber(sequence);
  const future = predictMultiple(sequence, 3);
  
  console.log(`✅ Valid sequence: [${sequence.join(', ')}]`);
  console.log(`   Common difference: ${diff}`);
  console.log(`   Next number: ${next}`);
  console.log(`   Next 3 numbers: [${future.join(', ')}]`);
}

console.log('Analyzing: "5, 10, 15, 20"');
analyzeSequence('5, 10, 15, 20');
console.log();

console.log('Analyzing: "100, 95, 90, 85"');
analyzeSequence('100, 95, 90, 85');
console.log();

console.log('Analyzing: "1, 1, 2, 3, 5"');
analyzeSequence('1, 1, 2, 3, 5');
console.log();

// ==================== Example 10: Test Summary ====================

console.log('═══════════════════════════════════════════════════════════');
console.log('Example 10: Run Full Test Suite');
console.log('═══════════════════════════════════════════════════════════\n');

console.log('To run the full test suite, execute:\n');
console.log('  node index.js --test\n');

console.log('Or programmatically:\n');
console.log('  const { runTests } = require("./index.js");');
console.log('  runTests();\n');

// ==================== Summary ====================

console.log('═══════════════════════════════════════════════════════════');
console.log('Summary');
console.log('═══════════════════════════════════════════════════════════\n');

console.log('This quick start guide demonstrates:');
console.log('✅ Basic sequence prediction');
console.log('✅ Handling decreasing and negative sequences');
console.log('✅ Generating multiple predictions');
console.log('✅ Identifying invalid sequences');
console.log('✅ Edge case handling');
console.log('✅ Echo memory system usage');
console.log('✅ Input parsing and validation');
console.log('✅ Complete workflow analysis');
console.log('\nFor more information, see README.md');
console.log('═══════════════════════════════════════════════════════════\n');
