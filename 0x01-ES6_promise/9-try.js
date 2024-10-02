export default function guardrail(mathFunction) {
  const queue = []; // Initialize an empty array to store results

  try {
    // Attempt to execute the mathFunction and push the result to the queue
    queue.push(mathFunction());
  } catch (error) {
    // If an error occurs, push the error message to the queue
    queue.push(String(error));
  } finally {
    // In all cases, indicate that the guardrail has been processed
    queue.push('Guardrail was processed');
  }

  return queue; // Return the resulting array
}
