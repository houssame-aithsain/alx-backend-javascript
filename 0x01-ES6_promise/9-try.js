export default function guardrail(mathFunction) {
  const container = []; // Initialize an empty array to store results

  try {
    // Attempt to execute the mathFunction and push the result to the container
    container.push(mathFunction());
  } catch (error) {
    // If an error occurs, push the error message to the container
    container.push(String(error));
  } finally {
    // In all cases, indicate that the guardrail has been processed
    container.push('Guardrail was processed');
  }

  return container; // Return the resulting array
}
