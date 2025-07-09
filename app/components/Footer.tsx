import Form from "./Letter/Form";
import {
  FaCcMastercard,
  FaCcPaypal,
  FaCcStripe,
  FaCcVisa,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  const date = new Date();
  return (
    <div className="bg-orange-50 flex flex-col gap-10 items-center justify-center py-10">
      <div className="flex flex-col gap-6 justify-center items-center">
        <h2 className="text-[1.8rem] md:text-[2rem] font-thin">
          Join Our Newsletter
        </h2>
        <Form />
      </div>
      <div className="w-[20rem] h-[1px] bg-gray-400"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:w-[95vw] xl:grid-cols-4 gap-4 justify-items-center">
        <div className="flex flex-col gap-5">
          <h3 className="text-xl">ELODIA BEAUTY & SPA</h3>
          <span className="font-thin w-[10rem]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
            delectus ipsum explicabo maxime sequi aut.
          </span>
          <button className="text-white text-[0.9rem] bg-cyan-800 w-fit hover:bg-cyan-700 transition-all duration-300 ease-in-out">
            SUBSCRIBE
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-xl">Important Links</h3>
          <div className="flex flex-col gap-2 deco">
            <li>
              <a
                className="font-thin hover:no-underline hover:text-cyan-900"
                href="/"
              >
                Book Online
              </a>
            </li>
            <li>
              <a
                className="font-thin hover:no-underline hover:text-cyan-900"
                href="/"
              >
                Purchase a Gift Certificate
              </a>
            </li>
            <li>
              <a
                className="font-thin hover:no-underline hover:text-cyan-900"
                href="/"
              >
                Spa Promotions
              </a>
            </li>
            <li>
              <a
                className="font-thin hover:no-underline hover:text-cyan-900"
                href="/"
              >
                Exclusive Offer & Events
              </a>
            </li>
            <li>
              <a
                className="font-thin hover:no-underline hover:text-cyan-900"
                href="/"
              >
                Blog and News
              </a>
            </li>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h3 className="text-xl">Contact Us</h3>
          <div className="flex flex-col gap-4 font-thin">
            <span>Goma, Himbi Av du lac N°123</span>
            <span>elodiabeautyspa@gmail.com</span>
            <span>Phone: +1 (437) 665-0194</span>
          </div>
          <div className="">
            <ul className="flex gap-4">
              <li className="a">
                <a href="http://">
                  <FaInstagram className="text-cyan-900 text-2xl" />
                </a>
              </li>
              <li className="a">
                <a href="http://">
                  <FaFacebook className="text-cyan-900 text-2xl" />
                </a>
              </li>
              <li className="a">
                <a href="http://">
                  <FaLinkedin className="text-cyan-900 text-2xl" />
                </a>
              </li>
              <li className="a">
                <a href="http://">
                  <FaPinterest className="text-cyan-900 text-2xl" />
                </a>
              </li>
              <li className="a">
                <a href="http://">
                  <FaTwitter className="text-cyan-900 text-2xl" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h3 className="text-xl">Opening Hours</h3>
          <div>
            <div className="flex justify-between w-[15rem] font-thin">
              <span>Monday to Friday</span>
              <span>09:00 - 20:00</span>
            </div>
            <div className="flex justify-between w-[15rem] font-thin">
              <span>Saturday</span>
              <span>09:00 - 18:00</span>
            </div>
            <div className="flex justify-between w-[15rem] font-thin">
              <span>Sunday</span>
              <span>09:00 - 18:00</span>
            </div>
          </div>
          <ul className="flex gap-4">
            <li>
              <a href="http://">
                <FaCcVisa className="text-cyan-950 text-2xl" />
              </a>
            </li>
            <li>
              <a href="http://">
                <FaCcPaypal className="text-cyan-950 text-2xl" />
              </a>
            </li>
            <li>
              <a href="http://">
                <FaCcStripe className="text-cyan-950 text-2xl" />
              </a>
            </li>
            <li>
              <a href="http://">
                <FaCcMastercard className="text-cyan-950 text-2xl" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-[20rem] h-[1px] bg-gray-400"></div>
      <div className="flex gap-2 flex-col md:flex-row items-center">
        <span className="font-thin">&copy;{date.getFullYear()}</span>
        <span className="font-thin text-center">
          Qode Interactive, All Right is Preserved
        </span>
      </div>
    </div>
  );
};

export default Footer;
