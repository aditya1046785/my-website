'use server';

/**
 * @fileOverview Enhances a resume for ATS compatibility.
 *
 * - enhanceResumeForATS - A function that enhances the resume for ATS compatibility.
 * - EnhanceResumeForATSInput - The input type for the enhanceResumeForATS function.
 * - EnhanceResumeForATSOutput - The return type for the enhanceResumeForATS function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceResumeForATSInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The text content of the resume to be enhanced.'),
});
export type EnhanceResumeForATSInput = z.infer<typeof EnhanceResumeForATSInputSchema>;

const EnhanceResumeForATSOutputSchema = z.object({
  enhancedResumeText: z
    .string()
    .describe('The enhanced text content of the resume, optimized for ATS compatibility.'),
  optimizationSuggestions: z.array(z.string()).describe('Specific suggestions for optimizing the resume for ATS.'),
});
export type EnhanceResumeForATSOutput = z.infer<typeof EnhanceResumeForATSOutputSchema>;

export async function enhanceResumeForATS(input: EnhanceResumeForATSInput): Promise<EnhanceResumeForATSOutput> {
  return enhanceResumeForATSFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhanceResumeForATSPrompt',
  input: {schema: EnhanceResumeForATSInputSchema},
  output: {schema: EnhanceResumeForATSOutputSchema},
  prompt: `You are an expert resume optimizer specializing in Applicant Tracking Systems (ATS).

  Your goal is to enhance the given resume text to ensure it is highly compatible with ATS software.
  Analyze the resume, identify areas that may cause parsing issues or be flagged by ATS, and provide an improved version of the resume along with specific optimization suggestions.

  Resume Text: {{{resumeText}}}

  Ensure the enhancedResumeText is a complete and valid resume.
  Be specific with the optimizationSuggestions, providing actionable advice.
  Do not include any introductory or concluding remarks in your response, only the enhanced resume and suggestions.
  `,
});

const enhanceResumeForATSFlow = ai.defineFlow(
  {
    name: 'enhanceResumeForATSFlow',
    inputSchema: EnhanceResumeForATSInputSchema,
    outputSchema: EnhanceResumeForATSOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
