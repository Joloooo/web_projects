import React from 'react';

const Resume = ({ resume }) => {
  const { basics, sectionTitles, education, work, skills, projects } = resume;

  return (
    <div className="resume-container">
      <h1 id="firstLast">{basics.name}</h1>

      {/* Contact Info in One Line, Line after Contact Info */}
      <div className="contact-info">
        {basics.contact.map((item, index) => (
          <span key={index}>
            {item.icon} {item.type === "website" ? (
              <a href={`https://${item.value}`} target="_blank" rel="noopener noreferrer">{item.value}</a>
            ) : (
              item.value
            )}
          </span>
        ))}
      </div>
      
      <hr />

      <h2>{sectionTitles.experience}</h2>
      {work.map((job, index) => (
        <div id="experience" key={index}>
          <h4>{job.company} <span>{job.startDate} - {job.endDate}</span></h4>
          <p>{job.position} <span>{job.location}</span> </p>
          <ul>
            {job.highlights.map((highlight, idx) => (
              <li key={idx}>{highlight}</li>
            ))}
          </ul>
        </div>
      ))}     
      <hr />

      <h2>{sectionTitles.skills}</h2>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>      
      <hr />

      <h2>{sectionTitles.projects}</h2>
      {projects.map((project, index) => (
        <div key={index}>
          <div className="project-header">
            <h4>{project.name}</h4>
          </div>
          <p>{project.description}</p>
          <p><strong>Tech Stack:</strong> {project.stack}</p>
        </div>
      ))}      
      <hr />

      <h2>{sectionTitles.education}</h2>
      {education.map((edu, index) => (
        <div key={index} className="education-item">
          <h4>{edu.institution} <span>{edu.startDate} - {edu.endDate}</span></h4>
          <p>{edu.studyType} {edu.area} <span>{edu.location}</span></p>
        </div>
      ))}
    </div>
  );
};

export default Resume;
