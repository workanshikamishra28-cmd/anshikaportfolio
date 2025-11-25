import { Mail, Phone, MapPin, Linkedin, Instagram } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { getContactData } from "@/lib/sanity-queries";
import type { ContactData } from "@/types/sanity";
import { FloatingShapes } from "./StorytellingAnimations";

const Contact = () => {
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const data = await getContactData();
        setContactData(data);
      } catch (error) {
        console.error('Error fetching contact data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();

    // Small delay to ensure section is rendered before observing
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
            }
          });
        },
        { threshold: 0.1 }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      };
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <section className="py-20 md:py-32 px-6 md:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-12 md:py-20 lg:py-32 px-4 md:px-6 lg:px-12 bg-gray-50 relative overflow-hidden">
      {/* Animated background */}
      <FloatingShapes count={5} className="opacity-10" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left side - Contact info with animations */}
          <div className="space-y-6 md:space-y-8">
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'}`}>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
                {contactData?.heading || "Let's Work Together"}
              </h2>
              
              <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
                {contactData?.subheading || "Have a project in mind? Let's create something beautiful together."}
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-4 md:space-y-6 pt-4 md:pt-8">
              {contactData?.email && (
                <div className="flex items-center gap-3 md:gap-4 group md:hover:translate-x-2 transition-transform duration-300">
                  <div className="bg-primary text-primary-foreground p-2.5 md:p-3 rounded-full group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    <Mail className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-sm md:text-base">Email</div>
                    <div className="text-xs md:text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300 break-all">{contactData.email}</div>
                  </div>
                </div>
              )}

              {contactData?.phone && (
                <div className="flex items-center gap-3 md:gap-4 group md:hover:translate-x-2 transition-transform duration-300">
                  <div className="bg-primary text-primary-foreground p-2.5 md:p-3 rounded-full group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    <Phone className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-sm md:text-base">Phone</div>
                    <div className="text-xs md:text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">{contactData.phone}</div>
                  </div>
                </div>
              )}

              {contactData?.location && (
                <div className="flex items-center gap-3 md:gap-4 group md:hover:translate-x-2 transition-transform duration-300">
                  <div className="bg-primary text-primary-foreground p-2.5 md:p-3 rounded-full group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-sm md:text-base">Location</div>
                    <div className="text-xs md:text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">{contactData.location}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Social media links */}
            <div className="pt-4 md:pt-8">
              <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4">Connect With Me</h3>
              <div className="flex gap-3 md:gap-4">
                {contactData?.socialMedia?.linkedin && (
                  <a 
                    href={contactData.socialMedia.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-primary text-primary-foreground p-3 rounded-full hover:bg-primary-dark hover:scale-110 hover:rotate-12 transition-all duration-300"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                )}
                {contactData?.socialMedia?.behance && (
                  <a 
                    href={contactData.socialMedia.behance} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-primary text-primary-foreground p-3 rounded-full hover:bg-primary-dark hover:scale-110 hover:rotate-12 transition-all duration-300"
                    aria-label="Behance"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
                    </svg>
                  </a>
                )}
                {contactData?.socialMedia?.instagram && (
                  <a 
                    href={contactData.socialMedia.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-primary text-primary-foreground p-3 rounded-full hover:bg-primary-dark hover:scale-110 hover:rotate-12 transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right side - Contact form */}
          <div className="bg-card p-6 md:p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500">
            <form className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-xs md:text-sm font-bold mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full p-2.5 md:p-3 text-sm md:text-base bg-background border-2 border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-bold mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full p-2.5 md:p-3 text-sm md:text-base bg-background border-2 border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-bold mb-2">Message</label>
                <textarea 
                  rows={4}
                  className="w-full p-2.5 md:p-3 text-sm md:text-base bg-background border-2 border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all duration-300"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <button 
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  console.log('Form submitted');
                }}
                className="w-full bg-primary text-primary-foreground font-bold py-3 md:py-4 px-6 md:px-8 text-sm md:text-base rounded-lg hover:bg-primary-dark transition-all duration-300 shadow-md hover:shadow-lg md:hover:scale-105 active:scale-95"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
