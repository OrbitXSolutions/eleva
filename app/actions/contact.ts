"use server"

import { z } from "zod"
import { createSafeAction } from "next-safe-action"

const contactSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
})

export const submitContactForm = createSafeAction(contactSchema, async (data) => {
  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Here you would typically save to database or send email
  console.log("Contact form submitted:", data)

  return {
    success: true,
    message: "Thank you for your message. We'll get back to you soon!",
  }
})
