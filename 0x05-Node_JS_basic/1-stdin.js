// 1-stdin.js

// This is the beginning of the file
process.stdout.write('Welcome to Holberton School, what is your name?\n');

// This is the beginning of the file
process.stdin.on('readable', () => {
  const chunk = process.stdin.read();

  if (chunk) {
    process.stdout.write(`Your name is: ${chunk}`);
  }
});

// This is the end of the file
process.stdin.on('end', () => {
  process.stdout.write('This important software is now closing\n');
});
