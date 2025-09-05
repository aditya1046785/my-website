'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate detailed descriptions of AI projects.
 *
 * The flow takes a project title and tech stack as input and returns a detailed project description.
 * - generateProjectDetails - A function that handles the generation of detailed project descriptions.
 * - GenerateProjectDetailsInput - The input type for the generateProjectDetails function.
 * - GenerateProjectDetailsOutput - The return type for the generateProjectDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectDetailsInputSchema = z.object({
  title: z.string().describe('The title of the AI project.'),
  tech: z.array(z.string()).describe('The tech stack used in the project.'),
});
export type GenerateProjectDetailsInput = z.infer<
  typeof GenerateProjectDetailsInputSchema
>;

const GenerateProjectDetailsOutputSchema = z.object({
  description: z.string().describe('A detailed description of the AI project.'),
});
export type GenerateProjectDetailsOutput = z.infer<
  typeof GenerateProjectDetailsOutputSchema
>;

export async function generateProjectDetails(
  input: GenerateProjectDetailsInput
): Promise<GenerateProjectDetailsOutput> {
  return generateProjectDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProjectDetailsPrompt',
  input: {schema: GenerateProjectDetailsInputSchema},
  output: {schema: GenerateProjectDetailsOutputSchema},
  prompt: `You are an AI expert who can provide detailed descriptions of AI projects based on their title and tech stack.

  Project Title: {{{title}}}
  Tech Stack: {{#each tech}}{{{this}}} {{/each}}

  Please generate a detailed description of the project, explaining its functionalities and technologies used.
  `,
});

const generateProjectDetailsFlow = ai.defineFlow(
  {
    name: 'generateProjectDetailsFlow',
    inputSchema: GenerateProjectDetailsInputSchema,
    outputSchema: GenerateProjectDetailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
