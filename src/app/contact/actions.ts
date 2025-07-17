'use server'

import { z } from "zod"

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  inquiryType: z.string(),
  message: z.string(),
})

export async function handleContactForm(values: z.infer<typeof formSchema>) {
  try {
    // Here you would typically send an email, save to a database, etc.
    // For this example, we'll just log the data to the console.
    console.log("Form submitted:", values);

    // Simulate a network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { success: true };
  } catch (error) {
    console.error("Error handling contact form:", error);
    return { success: false };
  }
}
