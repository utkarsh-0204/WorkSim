# WorkSim

**Practice real-world workplace skills before your first job.**

WorkSim is an interactive workplace simulation platform designed to help
users practise professional communication, decision-making, and conflict
resolution in realistic work situations. Users explore workplace
scenarios, respond to challenges, and review their performance through
structured evaluation and progress tracking.

------------------------------------------------------------------------

## ✨ Features

-   **Real-world workplace scenarios** --- Practise situations such as
    production incidents, code reviews, client discussions, team
    conflicts, feature prioritisation, and project updates.
-   **Role-based simulations** --- Interact with workplace characters
    and respond to situations from a defined professional role.
-   **Skill-focused practice** --- Build skills such as communication,
    professionalism, and conflict resolution.
-   **Structured evaluation** --- Assess responses against predefined
    evaluation criteria and evidence-based rubrics.
-   **Progress dashboard** --- Review completed scenarios, scores, and
    performance trends over time.
-   **Interactive interface** --- Navigate scenarios and progress
    information through a clean, dark-themed dashboard.
-   **Scenario extensibility** --- Add new scenarios by defining the
    situation, character, role, required skills, initial message,
    evaluation criteria, and final debrief.

## 🖥️ Tech Stack

  Technology     Purpose
  -------------- --------------------------------------------
  React          Component-based user interface
  TypeScript     Type-safe application development
  Vite           Local development server and build tooling
  Tailwind CSS   Utility-first styling
  CSS            Custom interface styling

The repository also includes dedicated components and folders for
application pages, scenario data, simulation logic, shared types, and
utilities.

## 📁 Project Structure

``` text
WorkSim/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images and other assets
│   ├── components/         # Shared UI components
│   │   ├── Navigation.tsx
│   │   ├── StickyBoardSection.tsx
│   │   └── Workplace3DCanvas.tsx
│   ├── data/               # Scenario and application data
│   ├── engine/              # Simulation logic
│   ├── pages/               # Application pages
│   ├── types/               # TypeScript types
│   ├── utils/               # Helper functions
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── DOCUMENTATION.md        # Detailed project documentation
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

> The structure above highlights the main folders and files; individual
> files may change as the project evolves.

## 🚀 Getting Started

### Prerequisites

-   Node.js (a current LTS version is recommended)
-   npm

### 1. Clone the repository

``` bash
git clone <your-repository-url>
cd WorkSim
```

Replace `<your-repository-url>` with the repository's actual URL.

### 2. Install dependencies

``` bash
npm install
```

### 3. Start the development server

``` bash
npm run dev
```

Vite will print a local development URL in the terminal, usually:

``` text
http://localhost:5173
```

Open that address in your browser.

### 4. Create a production build

``` bash
npm run build
```

To preview the production build locally, run:

``` bash
npm run preview
```

## 🧩 Adding a Scenario

Use the detailed instructions in [`DOCUMENTATION.md`](DOCUMENTATION.md).
A typical scenario definition includes:

1.  **Scenario title** --- The workplace situation to practise.
2.  **Character** --- The person the user interacts with.
3.  **Role** --- The character's or user's role in the situation, as
    defined by the project.
4.  **Skills** --- The professional skills being practised.
5.  **Initial message** --- The opening prompt that starts the
    interaction.
6.  **Evaluation criteria** --- The standards used to assess the
    response.
7.  **Final debrief** --- Feedback or reflection after the simulation.

Example scenario: **Difficult Client** --- a product client raises a
concern about a late delivery. The user practises explaining the
situation professionally and resolving the concern.

## 🛠️ Available Scripts

Check `package.json` for the exact scripts configured in your checkout.
A standard Vite setup commonly provides:

  Command             Purpose
  ------------------- ------------------------------
  `npm run dev`       Start the development server
  `npm run build`     Build the application
  `npm run preview`   Preview the production build

## 🎯 Project Goal

WorkSim aims to make workplace-readiness practice more accessible by
allowing users to rehearse professional situations in a simulated
environment, receive structured feedback, and monitor their progress.

## 🔮 Future Improvements

Potential improvements include:

-   More scenario categories and difficulty levels
-   Personalised practice recommendations based on performance
-   More detailed skill-level analytics
-   Scenario authoring tools for educators and teams
-   Accessibility and mobile-responsiveness improvements

These are possible extensions, not necessarily features currently
implemented.

## 🤝 Contributing

Contributions and suggestions are welcome.

1.  Fork the repository.
2.  Create a feature branch.
3.  Make and test your changes.
4.  Submit a pull request describing the improvement.

## 📄 License

No license information was visible in the supplied project snapshot. Add
a `LICENSE` file and update this section before distributing the project
if you intend to publish it under a specific open-source license.
