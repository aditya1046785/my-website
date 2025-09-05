# Neon Architect — Personal Portfolio

This is a world-class personal portfolio built with Next.js + TypeScript + Tailwind that mirrors Linear.app’s crisp, minimal, high‑contrast aesthetic while showcasing AI‑powered projects in a Bento grid, with clean micro‑interactions and responsive perfection.

This project was generated with [Firebase Studio](https://studio.firebase.google.com).

## Tech Stack

*   **Framework**: Next.js (App Router), TypeScript
*   **Styling**: Tailwind CSS
*   **UI Components**: shadcn/ui
*   **Form Management**: React Hook Form, Zod
*   **AI**: Genkit, Google AI
*   **Deployment**: Vercel (recommended), Firebase App Hosting

## Getting Started

### Prerequisites

*   Node.js (v18 or later)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-repo/neon-architect.git
    cd neon-architect
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

To run the app locally, use:
```bash
npm run dev
```
Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

### Building for Production

To create a production build, use:
```bash
npm run build
```
This will create an optimized build in the `.next` folder.

To run the production server, use:
```bash
npm run start
```

## Design Decisions

*   **Linear-Inspired Aesthetic**: The design adheres to a strict, minimal, high-contrast dark theme inspired by Linear.app. This communicates a sense of quality, taste, and precision.
*   **Static Data Source**: Project data is managed in a static TypeScript array (`src/lib/data.ts`). This simplifies the initial build, avoiding the need for a CMS, and makes content updates a code-level change.
*   **Gradient Borders**: A CSS `::before` pseudo-element with a gradient background and a `mask` is used to create the 1px gradient border effect on cards. The inner content has a solid background color, creating a crisp, clean stroke.
*   **AI Integration**: Genkit flows are used to power features like project filtering, resume enhancement, and dynamic project detail generation, showcasing modern AI capabilities.
*   **Component-Based Architecture**: The UI is broken down into small, reusable components located in `src/components`, promoting maintainability and a clean codebase. Sections are organized in `src/components/sections`.
*   **Smooth Scrolling**: Navigation between sections is handled client-side with a custom hook to ensure a smooth scrolling experience.

## Environment Variables

If you choose to integrate an email service for the contact form, you will need to set up environment variables. Create a `.env.local` file in the root of your project:

```env
# For Resend
RESEND_API_KEY=your_resend_api_key

# For Formspree
FORMSPREE_ID=your_formspree_id
```

The current implementation simulates a successful form submission without sending an email. To enable email sending, you would need to modify the server action in `src/app/actions.ts`.
