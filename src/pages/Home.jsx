import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../styles/Home.css';

const Home = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section">
        <img src="/images/hero2.png" alt="Hero Poster" className="hero-image" />
      </section>
      
      {/* About Section */}
      <section className="about-section" id="about">
        <h2 className="about-title">About Us</h2>
        <div className="container">
          <div className="content">
            <p>
              Infra-Alert is a community-driven platform that empowers citizens to directly report and track municipal infrastructure issues. 
              With just a few clicks, users can raise complaints about street lights, home electricity, potholes, and garbage collection. 
              Our innovative system connects residents with local departments, ensuring swift resolution and creating a more responsive, 
              transparent municipal service ecosystem. We believe in transforming urban challenges into collaborative solutions, 
              one report at a time.
            </p>
          </div>
          <div className="image-container">
            <img src="/images/about.jpg" alt="About" />
          </div>
        </div>
      </section>
      
      {/* Department Section */}
      <section className="dept-section" id="dept">
        <h1 className="welcome-title">
          <span style={{ color: 'white' }}>Departments</span>
        </h1>
        
        <div className="container">
          <div className="home-content">
            <h2 className="dept-title">Home Electricity</h2>
            <p>
              Through Infra-Alert, residents can effortlessly report electrical issues directly to the responsible government departments. 
              Our platform simplifies the process of highlighting power-related problems, 
              facilitating swift communication and efficient resolution of home electricity concerns.
            </p>
          </div>
          <div className="home-image-container">
            <img src="/images/home.jpg" alt="Home Electricity" />
          </div>
        </div>

        <div className="container">
          <div className="street-image-container">
            <img src="/images/street.jpg" alt="Street Lights" />
          </div>
          <div className="street-content">
            <h2 className="dept-title">Street Electricity</h2>
            <p>
              Infra-Alert provides a streamlined platform for reporting street light issues. 
              Users can easily log concerns about malfunctioning or damaged street lights, 
              enabling municipal authorities to quickly identify and address infrastructure problems, 
              ensuring community safety and well-being.
            </p>
          </div>
        </div>

        <div className="container">
          <div className="home-content">
            <h2 className="dept-title">Potholes</h2>
            <p>
              Infra-Alert offers citizens a direct channel to report road damages and potholes. 
              By providing a user-friendly interface, we enable residents to notify municipal authorities about infrastructure issues, 
              promoting responsive and transparent urban maintenance.
            </p>
          </div>
          <div className="home-image-container">
            <img src="/images/pothole.jpg" alt="Potholes" />
          </div>
        </div>

        <div className="container">
          <div className="street-image-container">
            <img src="/images/garbage1.jpg" alt="Garbage" />
          </div>
          <div className="street-content">
            <h2 className="dept-title">Garbage</h2>
            <p>
              Our platform allows residents to easily report garbage collection and disposal issues. 
              Infra-Alert serves as a crucial communication bridge between citizens and municipal services, 
              helping to maintain a clean and healthy urban environment.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <h2 className="contact-title">Contact Us</h2>
        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-detail">
              <i className="ri-map-pin-line"></i>
              <p>Tilakwadi, Belagavi, Karnataka, India</p>
            </div>
            <div className="contact-detail">
              <i className="ri-phone-line"></i>
              <p>+91 9380122673</p>
            </div>
            <div className="contact-detail">
              <i className="ri-mail-line"></i>
              <p>support@infra-alert.com</p>
            </div>
            <div className="contact-detail">
              <i className="ri-time-line"></i>
              <p>Monday - Friday: 9 AM to 5 PM</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column">
            <h3>Infra-Alert</h3>
            <p>Empowering citizens to report and resolve municipal infrastructure issues.</p>
          </div>
          
          <div className="footer-column">
            <h3>Connect With Us</h3>
            <div className="social-icons">
              <a href="#"><i className="ri-facebook-line"></i></a>
              <a href="#"><i className="ri-twitter-line"></i></a>
              <a href="#"><i className="ri-instagram-line"></i></a>
              <a href="#"><i className="ri-linkedin-line"></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Infra-Alert. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Home;