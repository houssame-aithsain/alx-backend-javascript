export default function guardrail(mathFunction) {
  const queue = [];

  try {
    const result = mathFunction(); // Attempt to execute the function
    queue.push(result); // Append the result to the queue
  } catch (error) {
    queue.push(error.message); // Append the error message to the queue
  }

  queue.push('Guardrail was processed'); // Always append this message
  return queue; // Return the resulting queue
}
