import inquirer from 'inquirer';
import fs from 'fs';
import { generateReadmeTemplate } from './readme-template.js';
import { getTechnologyBadge } from './technology-badges.js'; // Import the badge function

async function generateReadme() {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Enter the project name:',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Enter a project description:',
      },
      {
        type: 'input',
        name: 'logo',
        message: 'Enter the logo URL (optional):',
      },
      {
        type: 'input',
        name: 'technologies',
        message: 'Enter the technologies used (comma-separated):',
      },
    ]);
  
    const technologiesArray = answers.technologies.split(',').map((tech) => tech.trim());
    const technologyBadges = technologiesArray.map(getTechnologyBadge);
  
    const readmeContent = generateReadmeTemplate(
      answers.projectName,
      answers.description,
      answers.logo,
      technologyBadges // Pass the badge information as an array
    );
  
    try {
      fs.writeFileSync('README.md', readmeContent);
      console.log('README.md written successfully.');
    } catch (err) {
      console.error('Error writing README.md:', err);
    }
  }
  
  generateReadme();
  
  
  
  
  