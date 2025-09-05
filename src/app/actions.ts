'use server';

import { z } from 'zod';
import { filterProjects, type FilterProjectsInput } from '@/ai/flows/filter-projects-ai';
import { enhanceResumeForATS, type EnhanceResumeForATSInput } from '@/ai/flows/enhance-resume-ats';
import { generateProjectDetails, type GenerateProjectDetailsInput } from '@/ai/flows/generate-project-details';

// Contact Form Action
const contactFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

export async function contactFormAction(values: z.infer<typeof contactFormSchema>) {
  const parsed = contactFormSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, error: 'Invalid input.' };
  }

  // TODO: Integrate with an email service like Resend or Formspree
  // For now, we'll just simulate a successful submission.
  console.log('Contact form submitted:', parsed.data);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { success: true };
}


// AI Actions
export async function filterProjectsAction(input: FilterProjectsInput) {
  return await filterProjects(input);
}

export async function enhanceResumeAction(input: EnhanceResumeForATSInput) {
  return await enhanceResumeForATS(input);
}

export async function generateProjectDetailsAction(input: GenerateProjectDetailsInput) {
  return await generateProjectDetails(input);
}
