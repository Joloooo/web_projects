export const navbarData = {
  siteName: "JoloCorp Folio",
  loggedOut: [
    { path: "/", label: "Home", id: "Home" },
    { path: "/about", label: "About", id: "About" },
    { path: "/projects", label: "Projects", id: "Projects" },
    { path: "/login", label: "Login", id: "Login" },
  ],
  loggedIn: [
    { path: "/", label: "Home", id: "Home" },
    { path: "/myprofile", label: "My Profile", id: "profile" },
    { path: "/logout", label: "Logout", id: "Logout" },
  ],
};


export const homeData ={
  mainText:"Welcome to Zviad Jolokhava Portfolio Webpage"
}


export const projectData = {
  sectionTitle: "Projects",
  items: [
    { id: 1, title: "Notary Public Services Webpage", url: "notaryProject/notary.html" },
    { id: 2, title: "Electoral Calculator", url: "electoralCalculator/electoral.html" },
    { id: 3, title: "Mr Robot Challenge", url: "mrrobot_challenge/mrrobot_challenge.html" },
    { id: 4, title: "Keycloak", url: "keycloack/keycloack.html" },
    { id: 5, title: "Hacking 101", url: "hacking/hacking101.html" },
    { id: 6, title: "Jolocorp Survey", url: "survey/survey.html" }
  ]
};


export const resumeData = {
  basics: {
    name: "Zviad Jolokhava",
    contact: [
      { type: "email", value: "Zviadjolokhava@gmail.com", icon: "📧" },
      { type: "phone", value: "0152-08-22-5130", icon: "📱" },
      { type: "location", value: "Munich, Germany", icon: "📍" },
      { type: "website", value: "Jolocorp.com", icon: "🌐" }
    ]
  },
  sectionTitles: {
    experience: "Experience",
    skills: "Skills",
    projects: "Notable Projects",
    education: "Education"
  },
  education: [
    {
      institution: "United States Military Academy West-Point",
      area: "Bachelor of Science",
      studyType: "BS",
      startDate: "2016",
      endDate: "2020",
      location: "WestPoint, NY, USA"
    },
    {
      institution: "Munich University of Applied Sciences",
      area: "IT Security",
      studyType: "Master",
      startDate: "2023",
      endDate: "2025",
      location: "Munich, Germany"
    }
  ],
  work: [
    {
      company: "LLC New Way",
      position: "Part time (Intern)",
      startDate: "Oct 2023",
      endDate: "Oct 2024",
      location: "Tbilisi, Georgia (Online)",
      highlights: [
        "Dynamic web applications using HTML, CSS, JS, React, and Next.js for SEO",
        "Collaborated on backend integration with PostgreSQL and utilized Firebase for authentication"
      ]
    }
  ],
  skills: [
    "FrontEnd: HTML, CSS, JS, React, Redux, Next.js",
    "Backend: PostgreSQL, Docker",
    "Security: Basic Firewall, IDS/IPS (Snort, Suricata), ModSecurity",
    "Cloud: Firebase (functions, authentication)"
  ],
  projects: [
    {
      name: "MR. Robot Challenge",
      description: "Created a CTF to teach brute force attacks, cryptographic hash cracking, hash identification, rainbow tables, and hash salting techniques.",
      stack: "JS, Firebase Functions, John the Ripper, BurpSuite, Hashcat"
    },
    {
      name: "Notary Project",
      description: "Built an interactive notary public website allowing users to sign up, submit service requests, and send details directly to the notary’s email.",
      stack: "JS, EmailJS"
    },
    {
      name: "Cyber Defense Challenge",
      description: "Managed multiple servers including application, GitLab, database, mail, web, monitoring, and entrypoint servers. Configured firewalls, IDS/IPS systems, centralized log monitoring, and implemented a WAF.",
      stack: "JS, Nginx, ModSecurity, Suricata, ELK Stack"
    }
  ]
};


export const loginFunctionData = {
  form: {
      inputs: [
          {
              type: "text",
              id: "identifier",
              placeholder: "Username or Email",
              name: "identifier",
              required: true,
          },
          {
              type: "password",
              id: "password",
              placeholder: "Password",
              name: "password",
              required: true,
          }
      ],
      submitButton: {
          type: "submit",
          className: "login-btn",
          text: "Login"
      }
  },
  options: [
      {
          href: "/register",
          className: "create-account",
          text: "Create a new account"
      },
      {
          href: "/password-recovery",
          className: "forgot-password-link",
          text: "Forgot your password?"
      }
  ]
};


export const registerFunctionData = {
  form: {
      fields: [
          {
              layout: "row",
              inputs: [
                  { type: "text", id: "first-name", placeholder: "First Name", name: "firstName", required: true },
                  { type: "text", id: "last-name", placeholder: "Last Name", name: "lastName", required: true }
              ]
          },
          {
              layout: "row",
              inputs: [
                  { type: "date", id: "birthdate", placeholder: "Birthdate", name: "birthdate", required: true },
                  { type: "text", id: "gender", placeholder: "Gender", name: "gender", required: true }
              ]
          },
          {
              layout: "single",
              inputs: [
                  { type: "email", id: "new-email", placeholder: "Email", name: "email", required: true }
              ]
          },
          {
              layout: "single",
              inputs: [
                  { type: "tel", id: "mobile", placeholder: "Mobile Number", name: "mobile", required: true }
              ]
          },
          {
              layout: "row",
              inputs: [
                  { type: "text", id: "new-username", placeholder: "Username", name: "username", required: true },
                  { type: "password", id: "new-password", placeholder: "Password", name: "password", required: true }
              ]
          }
      ],
      submitButton: {
          type: "submit",
          className: "register-btn",
          text: "Register"
      },
      options: [
          {
              to: "/login",
              className: "login-account",
              text: "Already have an account?"
          }
      ]
  }
};
