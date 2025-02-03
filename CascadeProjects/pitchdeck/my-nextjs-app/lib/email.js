export async function sendEmail(lead) {
  // Simulate composing an email with the video URL embedded
  console.log(`Sending email to lead associated with ${lead.ceo}. Video URL: ${lead.videoUrl}`);

  // Simulated delay for sending email
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Simulate a successful send result
  return { success: true, message: `Email sent to ${lead.ceo}` };
}
