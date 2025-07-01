import React from 'react';
import './Testimonial.css';

function Testimonial() {
  return (
    <section className="testimonial-section" id="testimonials">
      <div className="testimonial-box">
        <p>
          "SolarTrack ha cambiado mi forma de disfrutar el aire libre. Ahora sé exactamente cuándo necesito protegerme y me siento mucho más segura. ¡Es indispensable para mi día a día!"
        </p>
        <div className="testimonial-user">
          <img 
            src="https://cdn.pixabay.com/photo/2017/06/09/05/19/smiling-2385790_640.jpg" 
            alt="Ana G. - Entusiasta del Aire Libre" 
            className="testimonial-avatar"
          />
          <span className="testimonial-name">Ana G., Entusiasta del Aire Libre</span>
        </div>
      </div>
    </section>
  );
}

export default Testimonial; 