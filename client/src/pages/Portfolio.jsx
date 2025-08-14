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
    frontend: ['React', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap'],
    backend: ['Node.js', 'Express.js', 'Flask', 'Django'],
    databases: ['MongoDB', 'MySQL', 'PostgreSQL'],
    tools: ['Git', 'GitHub', 'VS Code', 'Linux', 'Figma']
  };

  const projects = [
    {
      id: 'ecotrack',
      title: 'EcoTrack',
      description: 'A comprehensive environmental impact tracking app that helps users monitor their carbon footprint through daily activities and provides actionable insights for sustainable living.',
      tech: ['React', 'Node.js', 'MongoDB', 'Express.js'],
      image: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?w=400&h=250&fit=crop'
    },
    {
      id: 'lexolution', 
      title: 'Lexolution',
      description: 'An AI-powered language learning platform that adapts to individual learning styles and provides personalized vocabulary building exercises with real-time pronunciation feedback.',
      tech: ['Python', 'Flask', 'JavaScript', 'MySQL'],
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop'
    },
    {
      id: 'jobgenie',
      title: 'JobGenie', 
      description: 'A smart job matching platform that uses machine learning to connect candidates with relevant opportunities based on skills, experience, and career preferences.',
      tech: ['React', 'Node.js', 'MongoDB', 'Python'],
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop'
    }
  ];

  const achievements = [
    {
      icon: '🏆',
      title: 'Hackathon Finalist',
      description: 'Reached the finals in multiple hackathons, demonstrating exceptional problem-solving skills and innovative thinking in competitive coding environments.'
    },
    {
      icon: '💻',
      title: 'CodeVerse GDG RVU Challenge',
      description: 'Participated in the CodeVerse GDG RVU Challenge, showcasing coding expertise and collaborative problem-solving abilities.'
    },
    {
      icon: '👥',
      title: 'Coding Events Leadership',
      description: 'Led and organized coding events, fostering a collaborative learning environment and mentoring fellow students in programming challenges.'
    }
  ];

  const interests = [
    { icon: '🚴', title: 'Bike Riding', description: 'Exploring new places and staying active through cycling adventures' },
    { icon: '📸', title: 'Photography', description: 'Capturing moments and exploring creative perspectives through photography' },
    { icon: '🛡️', title: 'Ethical Hacking', description: 'Learning cybersecurity principles and exploring system vulnerabilities ethically' },
    { icon: '🐧', title: 'Linux Exploration', description: 'Diving deep into Linux systems, command line tools, and open-source technologies' }
  ];

  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = '/assets/resume.txt';
    link.download = 'Vijay_Kumar_R_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };
    console.log('Contact form submitted:', data);
    // Add actual form submission logic here
    alert('Thank you for your message! I will get back to you soon.');
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm z-50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Vijay Kumar R
            </div>
            <div className="hidden md:flex space-x-8">
              {['Hero', 'About', 'Skills', 'Projects', 'Achievements', 'Education', 'Interests', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                    activeSection === item.toLowerCase() ? 'text-blue-400' : 'text-slate-300'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Hi, I'm <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">Vijay Kumar R</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-400 mb-4 h-8">
              {typingText}
            </p>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Computer Science student at RV University specializing in C++, Python, and MERN stack development. 
              Passionate about solving complex problems and building innovative solutions that make a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button 
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                onClick={handleResumeDownload}
              >
                📄 Download Resume
              </Button>
              <Button 
                variant="outline" 
                className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900"
                onClick={() => scrollToSection('contact')}
              >
                ✉️ Contact Me
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-400 to-green-400 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face" 
                  alt="Vijay Kumar R" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
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
                      <Button size="sm" className="bg-blue-500 hover:bg-blue-600">🔗 Demo</Button>
                      <Button size="sm" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">⚡ GitHub</Button>
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
                  <p className="text-slate-300 text-sm leading-relaxed">{achievement.description}</p>
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
                  <span className="text-slate-300">vijaykumar.r@rvuniversity.edu.in</span>
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
                  onClick={() => window.open('https://github.com/vijaykumarr', '_blank')}
                >
                  GitHub
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900"
                  onClick={() => window.open('https://linkedin.com/in/vijaykumarr', '_blank')}
                >
                  LinkedIn
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

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400">
            © 2024 Vijay Kumar R. All rights reserved.
          </p>
          <p className="text-slate-500 mt-2">
            Made with ❤️ and lots of coffee
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;