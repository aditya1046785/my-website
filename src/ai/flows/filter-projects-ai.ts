'use server';

/**
 * @fileOverview AI-powered project filtering flow.
 *
 * - filterProjects - A function that filters projects based on user-provided keywords using AI.
 * - FilterProjectsInput - The input type for the filterProjects function, including an array of projects and keywords to filter by.
 * - FilterProjectsOutput - The return type for the filterProjects function, which is an array of filtered projects.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  tech: z.array(z.string()),
  href: z.string(),
  span: z.union([z.literal('col-span-2'), z.literal('col-span-1')]).optional(),
});

export type Project = z.infer<typeof ProjectSchema>;

const FilterProjectsInputSchema = z.object({
  projects: z.array(ProjectSchema).describe('An array of project objects to filter.'),
  keywords: z.string().describe('Keywords to filter projects by.'),
});

export type FilterProjectsInput = z.infer<typeof FilterProjectsInputSchema>;

const FilterProjectsOutputSchema = z.array(ProjectSchema);

export type FilterProjectsOutput = z.infer<typeof FilterProjectsOutputSchema>;

export async function filterProjects(input: FilterProjectsInput): Promise<FilterProjectsOutput> {
  return filterProjectsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'filterProjectsPrompt',
  input: {schema: FilterProjectsInputSchema},
  output: {schema: FilterProjectsOutputSchema},
  prompt: `You are an AI assistant that filters projects based on keywords.

  Given the following projects:
  {{#each projects}}
  - Title: {{this.title}}, Description: {{this.description}}, Tech: {{this.tech}}
  {{/each}}

  Filter the projects based on the following keywords: {{keywords}}.
  Only return the projects that are relevant to the keywords.
  Return the projects in the same format as the input.

  Important:
  1. Ensure the returned projects are relevant to the provided keywords.
  2. The output must be a JSON array of project objects matching the input schema.
  3. Do not include any additional text or explanations in the response, only the JSON array.
  4. Preserve all fields from the original project objects.
  5. if keywords is an empty string or undefined, return all projects.
  6. if there are no matching projects based on the keywords, return an empty array.
  `, 
});

const filterProjectsFlow = ai.defineFlow(
  {
    name: 'filterProjectsFlow',
    inputSchema: FilterProjectsInputSchema,
    outputSchema: FilterProjectsOutputSchema,
  },
  async input => {
    if (!input.keywords) {
      return input.projects;
    }
    const {output} = await prompt(input);
    return output!;
  }
);
