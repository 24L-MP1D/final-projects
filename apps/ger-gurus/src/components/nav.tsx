import { useState } from 'react';
import { AiOutlineDown } from 'react-icons/ai';

const Nav: React.FC = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const toggleAboutMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault(); // Линк рүү үсэрч чадахгүй байх
    setIsAboutOpen(!isAboutOpen);
    setIsContactOpen(false); // Contact менюг хаах
  };

  const toggleContactMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault(); // Линк рүү үсэрч чадахгүй байх
    setIsContactOpen(!isContactOpen);
    setIsAboutOpen(false); // About менюг хаах
  };

  return (
    <nav className="bg-white shadow">
      <ul className="flex space-x-8 p-4">
        <li>
          <a href="/" className="text-gray-800 hover:text-blue-600">
            Нүүр хуудас
          </a>
        </li>
        <li className="relative">
          <div className="flex items-center cursor-pointer" onClick={toggleAboutMenu}>
            <span className="text-gray-800 hover:text-blue-600 cursor-pointer">Бидний тухай</span>
            <AiOutlineDown className={`ml-1 transition-transform duration-500 ${isAboutOpen ? 'rotate-180' : ''}`} />
          </div>
          {isAboutOpen && (
            <ul className="absolute z-10 left-0 mt-2 w-40 bg-white shadow-lg rounded">
              <li>
                <a href="/team" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">
                  Багийн гишүүд
                </a>
              </li>
              <li>
                <a href="/history" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">
                  Түүх
                </a>
              </li>
            </ul>
          )}
        </li>
        <li>
          <a href="/services" className="text-gray-800 hover:text-blue-600">
            Үйлчилгээ
          </a>
        </li>
        <li className="relative">
          <div className="flex items-center cursor-pointer" onClick={toggleContactMenu}>
            <span className="text-gray-800 hover:text-blue-600 cursor-pointer">Холбоо барих</span>
            <AiOutlineDown className={`ml-1 transition-transform duration-500 ${isContactOpen ? 'rotate-180' : ''}`} />
          </div>
          {isContactOpen && (
            <ul className="absolute z-10 left-0 mt-2 w-40 bg-white shadow-lg rounded">
              <li>
                <a href="/support" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">
                  Дэмжлэг
                </a>
              </li>
              <li>
                <a href="/feedback" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">
                  Санал хүсэлт
                </a>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
