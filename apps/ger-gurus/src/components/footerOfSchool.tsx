'use client';

import Link from 'next/link';

const globalStyles = `
  @keyframes floatBubbles {
    0% { transform: translateY(0); }
    50% { transform: translateY(-30px); }
    100% { transform: translateY(0); }
  }

  .footer-bubble {
    position: absolute;
    border-radius: 50%;
    opacity: 0.5;
    animation: floatBubbles 5s ease-in-out infinite;
    pointer-events: none;
  }
`;

const bubbleStyle = (duration: number, index: number) => ({
  animationDuration: `${duration}s`,
  animationDelay: `${index * 1}s`, // This adds a slight delay to each bubble for a more dynamic effect
  backgroundColor: index % 2 === 0 ? '#A5D6A7' : '#81C784', // Alternating colors for bubbles
});

export default function FooterOfSchool() {
  return (
    <footer className="relative text-gray-700 py-10 px-4 mt-64">
      <style>{globalStyles}</style>

      {/* Floating Bubbles */}
      <div className="absolute top-[-50px] left-0 w-full h-[450px] mt-[-255px] overflow-hidden" style={{ pointerEvents: 'none' }}>
        <div style={{ ...bubbleStyle(3, 0), width: '120px', height: '120px', top: '9%', left: '4%' }} className="footer-bubble"></div>
        <div style={{ ...bubbleStyle(3, 0), width: '40px', height: '40px', top: '59%', left: '2%' }} className="footer-bubble"></div>
        <div style={{ ...bubbleStyle(4, 1), width: '100px', height: '100px', top: '25%', left: '75%' }} className="footer-bubble"></div>
        <div style={{ ...bubbleStyle(5, 2), width: '90px', height: '90px', top: '80%', left: '30%' }} className="footer-bubble"></div>
        <div style={{ ...bubbleStyle(3, 3), width: '75px', height: '75px', top: '82%', left: '70%' }} className="footer-bubble"></div>
        <div style={{ ...bubbleStyle(4, 4), width: '110px', height: '110px', top: '63%', left: '82%' }} className="footer-bubble"></div>
        <div style={{ ...bubbleStyle(5, 5), width: '70px', height: '70px', top: '70%', left: '55%' }} className="footer-bubble"></div>
        <div style={{ ...bubbleStyle(5, 5), width: '50px', height: '50px', top: '35%', left: '59%' }} className="footer-bubble"></div>
        <div style={{ ...bubbleStyle(3, 6), width: '110px', height: '110px', top: '20%', left: '25%' }} className="footer-bubble"></div>
        <div style={{ ...bubbleStyle(4, 7), width: '100px', height: '100px', top: '44%', left: '42%' }} className="footer-bubble"></div>
        <div style={{ ...bubbleStyle(5, 8), width: '150px', height: '150px', top: '10%', left: '90%' }} className="footer-bubble"></div>
        <div style={{ ...bubbleStyle(4, 9), width: '105px', height: '105px', top: '58%', left: '12%' }} className="footer-bubble"></div>
      </div>

      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Logo Section */}
        <div className="flex justify-center items-center space-x-4">
          <span className="text-xl font-semibold text-green-700">Verse School</span>
        </div>

        {/* Links */}
        <ul className="flex space-x-8 text-sm font-medium">
          <li>
            <Link href="/about" className="hover:text-green-600">
              About Us
            </Link>
          </li>
          <li>
            <Link href="/courses" className="hover:text-green-600">
              Courses
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-green-600">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/privacy" className="hover:text-green-600">
              Privacy Policy
            </Link>
          </li>
        </ul>

        {/* Social Media Icons */}
        <div className="flex space-x-6">
          <Link href="https://facebook.com" target="_blank" className="text-gray-600 hover:text-green-600">
            <i className="fab fa-facebook-f"></i>
          </Link>
          <Link href="https://twitter.com" target="_blank" className="text-gray-600 hover:text-green-600">
            <i className="fab fa-twitter"></i>
          </Link>
          <Link href="https://instagram.com" target="_blank" className="text-gray-600 hover:text-green-600">
            <i className="fab fa-instagram"></i>
          </Link>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-green-500 pt-6 text-center text-sm text-gray-600">
        <p>&copy; 2024 Verse School. All rights reserved.</p>
      </div>
    </footer>
  );
}
