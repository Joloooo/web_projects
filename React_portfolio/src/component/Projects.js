// src/component/Projects.js

import React from 'react';

import '../App.css';

const Projects = ({ projects }) => {
  const { sectionTitle, items } = projects;

  return (
    <div className="projects-container">
      <h1>{sectionTitle}</h1>
      {items.map((project) =>
        (
          // For other projects, render external links
          <a key={project.id} href={project.url} target="_blank" rel="noopener noreferrer">
            {project.title}
          </a>
        )
      )}
    </div>
  );
};

export default Projects;
