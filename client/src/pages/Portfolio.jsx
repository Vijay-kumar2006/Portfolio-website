import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [typingText, setTypingText] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  
  const typingTexts = [
    'Building Scalable Solutions with Creativity & Code',
    'C++ & Python Specialist | MERN Stack Developer',
    'Problem Solver & Innovation Enthusiast'
  ];

  // Typing effect
  useEffect(() => {
    const currentText = typingTexts[textIndex];
    
    const typingInterval = setInterval(() => {
      if (typingIndex < currentText.length) {
        setTypingText(currentText.substring(0, typingIndex + 1));
        setTypingIndex(prev => prev + 1);
      } else {
        setTimeout(() => {
          setTypingText('');
          setTypingIndex(0);
          setTextIndex(prev => (prev + 1) % typingTexts.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [typingIndex, textIndex, typingTexts]);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const skills = {
    languages: ['C++', 'Python', 'JavaScript', 'TypeScript', 'Java'],
    frontend: ['React', 'HTML', 'CSS', 'Tailwind CSS'],
    backend: ['Node.js', 'Express.js', 'REST API Development', 'JSON Data Handling', 'Environment Variables (dotenv)'],
    databases: ['MongoDB', 'MySQL'],
    tools: ['Git', 'GitHub', 'VS Code', 'Linux', 'Figma']
  };

  const projects = [
    {
      id: 'ecotrack',
      title: 'EcoTrack',
      description: 'A comprehensive environmental impact tracking app that helps users monitor their carbon footprint through daily activities and provides actionable insights for sustainable living.',
      tech: ['React', 'Node.js', 'MongoDB', 'Express.js'],
      image: 'https://i.ibb.co/Sw4YRsHm/Ecotrack-tumbnail.png',
      demo: 'https://ecotrackcapstone.netlify.app/',
      github: 'https://github.com/kalviumcommunity/S67_VijayKumar_Capstone_EcoTrack.git'
    },
    {
      id: 'lexolution', 
      title: 'Lexolution',
      description: 'An AI-powered language learning platform that adapts to individual learning styles and provides personalized vocabulary building exercises with real-time pronunciation feedback.',
      tech: ['React', 'Node.js', 'MongoDB', 'Gemini AI'],
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop',
      demo: '', // No demo link provided
      github: 'https://github.com/Vijay-kumar2006/LexoLaw_CodeOfDuty.git'
    },
    {
      id: 'jobgenie',
      title: 'JobGenie', 
      description: 'A smart job matching platform that uses machine learning to connect candidates with relevant opportunities based on skills, experience, and career preferences.',
      tech: ['React', 'Node.js', 'MongoDB', 'Python'],
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop',
      demo: '', // No demo link provided
      github: 'https://github.com/kalviumcommunity/Vijay-Jobgenie.git'
    }
  ];

  const achievements = [
    {
      icon: '🏆',
      title: 'Hackathon Finalist',
      description: 'Reached the finals in multiple hackathons, demonstrating exceptional problem-solving skills and innovative thinking in competitive coding environments.',
      certificate: 'https://drive.google.com/file/d/19tMNwnLR4DW3SUi1MJRBedfIwMnRztmq/view?usp=sharing' // replace with actual link
    },
    {
      icon: '💻',
      title: 'CodeVerse GDG RVU Challenge',
      description: 'Participated in the CodeVerse GDG RVU Challenge, showcasing coding expertise and collaborative problem-solving abilities.',
      certificate: 'https://drive.google.com/file/d/1896HTBghsNnYHjynyGydTBdwUgqkOHFq/view?usp=sharing' // replace with actual link
    },
    {
      icon: '👥',
      title: 'Coding Events Leadership',
      description: 'Led and organized coding events, fostering a collaborative learning environment and mentoring fellow students in programming challenges.'
      // No certificate
    }
  ];

  const interests = [
    { icon: '🚴', title: 'Bike Riding', description: 'Exploring new places and staying active through cycling adventures' },
    { icon: '📸', title: 'Photography', description: 'Capturing moments and exploring creative perspectives through photography' },
    { icon: '🛡️', title: 'Ethical Hacking', description: 'Learning cybersecurity principles and exploring system vulnerabilities ethically' },
    { icon: '🐧', title: 'Linux Exploration', description: 'Diving deep into Linux systems, command line tools, and open-source technologies' }
  ];

  const WEB3FORMS_ACCESS_KEY = 'b32c7d1d-ebdd-42a0-b282-78e52101e8bb';

  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = '/assets/Vijay%20Kumar%20R_1756547064114.pdf';
    link.download = 'Vijay_Kumar_R_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
      access_key: WEB3FORMS_ACCESS_KEY
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Thank you for your message! I will get back to you soon.\n\nNote: If this is urgent, you can also email me directly at vijaykumar.vk3105@gmail.com');
        e.target.reset();
      } else {
        alert('Sorry, there was an error sending your message. Please email me directly at vijaykumar.vk3105@gmail.com');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Please email me directly at vijaykumar.vk3105@gmail.com');
    }
  };

  return (
    <div>
      {/* Navigation */}
      <nav className="navbar" id="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            Vijay Kumar R
          </div>
          <ul className="nav-menu" id="nav-menu">
            {['Hero', 'About', 'Skills', 'Projects', 'Achievements', 'Education', 'Interests', 'Contact'].map((item) => (
              <li className="nav-item" key={item}>
                <button
                  className={`nav-link${activeSection === item.toLowerCase() ? ' active' : ''}`}
                  onClick={() => scrollToSection(item.toLowerCase())}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
          {/* ...mobile menu... */}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Hi, I'm <span className="gradient-text">Vijay Kumar R</span>
            </h1>
            <p className="hero-subtitle">{typingText}</p>
            <p className="hero-description">
              Computer Science student at RV University specializing in C++, Python, and MERN stack development. 
              Passionate about solving complex problems and building innovative solutions that make a difference.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={handleResumeDownload}>
                <i className="fas fa-download"></i> Download Resume
              </button>
              <button className="btn btn-secondary" onClick={() => scrollToSection('contact')}>
                <i className="fas fa-envelope"></i> Contact Me
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-image-wrapper">
              <img src="https://i.ibb.co/6JpsNMby/Whats-App-Image-2025-09-16-at-8-58-02-PM.jpg" alt="Vijay Kumar R" />
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <i className="fas fa-chevron-down"></i>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <p className="text-slate-300">Get to know me better</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face" 
                alt="Vijay Kumar R" 
                className="w-80 h-80 rounded-lg object-cover shadow-xl"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-green-400 mb-6">Dedicated Problem Solver</h3>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Computer science student skilled in C++, Python, and problem-solving, with hands-on 
                experience in building scalable projects and solving coding challenges.
              </p>
              <p className="text-slate-300 mb-8 leading-relaxed">
                Currently pursuing my Bachelor's degree at RV University (2024-28), I specialize in 
                the MERN stack and am passionate about creating efficient, scalable solutions that 
                address real-world problems through innovative technology.
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">10+</div>
                  <div className="text-slate-400 text-sm">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">5</div>
                  <div className="text-slate-400 text-sm">Languages</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">2+</div>
                  <div className="text-slate-400 text-sm">Years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Technologies</h2>
            <p className="text-slate-300">Tools and technologies I work with</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList]) => (
              <Card key={category} className="bg-slate-800 border-slate-700 hover:border-blue-400 transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-blue-400 mb-4 capitalize">
                    {category === 'languages' ? '💻 Languages' : 
                     category === 'frontend' ? '🎨 Frontend' :
                     category === 'backend' ? '⚙️ Backend' :
                     category === 'databases' ? '🗄️ Databases' : '🛠️ Tools'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill) => (
                      <span 
                        key={skill}
                        className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30 hover:bg-blue-500/30 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-slate-300">Some of my recent work</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="bg-slate-800 border-slate-700 hover:border-green-400 transition-all duration-300 group overflow-hidden">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-4">
                      <Button 
                        size="sm" 
                        className="bg-blue-500 text-white rounded-full px-4 py-2 flex items-center gap-2 hover:bg-blue-600"
                        onClick={() => window.open(project.demo || project.github, '_blank')}
                        disabled={!project.demo && !project.github}
                      >
                        <span className="mr-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M7 17l10-10M17 7H7v10"/></svg>
                        </span>
                        Demo
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-blue-500 text-white rounded-full px-4 py-2 flex items-center gap-2 hover:bg-blue-600"
                        onClick={() => window.open(project.github, '_blank')}
                        disabled={!project.github}
                      >
                        <span className="mr-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C7.03 2 3 6.03 3 11c0 4.42 3.58 8.06 8 8.94V22h2v-2.06c4.42-.88 8-4.52 8-8.94 0-4.97-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7 0-3.86 3.14-7 7-7s7 3.14 7 7c0 3.86-3.14 7-7 7zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
                        </span>
                        GitHub
                      </Button>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-green-400 mb-3">{project.title}</h3>
                  <p className="text-slate-300 mb-4 text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech}
                        className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs border border-green-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Achievements & Awards</h2>
            <p className="text-slate-300">Recognition for my work</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="bg-slate-800 border-slate-700 hover:border-blue-400 transition-all duration-300 text-center">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{achievement.icon}</div>
                  <h3 className="text-lg font-bold text-blue-400 mb-3">{achievement.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">{achievement.description}</p>
                  {achievement.certificate && (
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full px-4 py-2 mt-2 hover:from-blue-600 hover:to-green-600"
                      onClick={() => window.open(achievement.certificate, '_blank')}
                    >
                       View Certificate
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Education</h2>
            <p className="text-slate-300">My academic journey</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-8">
                <div className="flex items-center gap-6">
                  <div className="text-4xl">🎓</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-green-400 mb-2">Kalvium UG Program (BCA)</h3>
                    <p className="text-xl text-blue-400 mb-2">RV University</p>
                    <p className="text-slate-300 mb-2">2024 - 2028</p>
                    <p className="text-slate-400 mb-4">Computer Science Specialization</p>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Focus Areas:</h4>
                      <ul className="text-slate-300 space-y-1">
                        <li>▸ Data Structures & Algorithms</li>
                        <li>▸ Object-Oriented Programming (C++)</li>
                        <li>▸ Web Development (MERN Stack)</li>
                        <li>▸ Database Management Systems</li>
                        <li>▸ Software Engineering Principles</li>
                        <li>▸ Problem Solving & Competitive Programming</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Interests Section */}
      <section id="interests" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Personal Interests</h2>
            <p className="text-slate-300">What I do outside of coding</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {interests.map((interest, index) => (
              <Card key={index} className="bg-slate-800 border-slate-700 hover:border-green-400 transition-all duration-300 text-center">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{interest.icon}</div>
                  <h3 className="text-lg font-bold text-green-400 mb-3">{interest.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{interest.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-slate-300">Let's work together on something amazing</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold text-blue-400 mb-6">Let's Connect</h3>
              <p className="text-slate-300 mb-8 leading-relaxed">
                I'm always interested in hearing about new opportunities, collaborations, 
                or just having a chat about technology and innovative projects.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="text-blue-400">✉️</div>
                  <span className="text-slate-300">vijaykumar.vk3105@gmail.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-blue-400">📍</div>
                  <span className="text-slate-300">Bangalore, India</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-blue-400">🎓</div>
                  <span className="text-slate-300">RV University, Class of 2028</span>
                </div>
              </div>
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900"
                  onClick={() => window.open('https://github.com/Vijay-kumar2006', '_blank')}
                >
                  GitHub
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900"
                  onClick={() => window.open('https://www.linkedin.com/in/vijay-kumar-r-866213319/', '_blank')}
                >
                  LinkedIn
                </Button>
                 <Button 
                  variant="outline" 
                  size="sm"
                  className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900"
                  onClick={() => window.open('https://leetcode.com/u/vijay-2006/', '_blank')}
                >
                  Leetcode
                </Button>
              </div>
            </div>
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <form className="space-y-4" onSubmit={handleContactSubmit}>
                  <div>
                    <input 
                      type="text" 
                      name="name"
                      placeholder="Your Name"
                      required
                      className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      name="email"
                      placeholder="Your Email"
                      required
                      className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      name="subject"
                      placeholder="Subject"
                      required
                      className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <textarea 
                      name="message"
                      placeholder="Your Message"
                      rows={5}
                      required
                      className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-400 focus:outline-none resize-none"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer
      <footer className="py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400">
            © 2024 Vijay Kumar R. All rights reserved.
          </p>
          <p className="text-slate-500 mt-2">
            Made with ❤️ and lots of coffee
          </p>
        </div>
      </footer> */}
    </div>
  );
};

export default Portfolio;