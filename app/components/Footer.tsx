import Link from "next/link";
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
  FaTiktok,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  const date = new Date();
  return (
    <div className="bg-orange-50 flex flex-col gap-10 items-center justify-center py-10">
      <div className="flex flex-col gap-6 justify-center items-center p-4 md:p-0">
        <h2 className="text-[1.8rem] md:text-[2rem] font-thin">
          Join our email list for exclusive offers and the latest news.
        </h2>
        <Form />
      </div>
      <div className="w-[20rem] h-[1px] bg-gray-400"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:w-[95vw] xl:grid-cols-4 gap-4 justify-items-center">
        <div className="flex flex-col gap-5">
          <h3 className="text-xl">ELODIA BEAUTY & SPA</h3>
          <span className="font-thin w-[10rem]">
            Explore luxury treatments designed to enhance your natural beauty
            and boost your confidence
          </span>
          <Link
            href="/signIn"
            className="text-white text-[0.9rem] bg-cyan-800 w-fit hover:bg-cyan-700 transition-all duration-300 ease-in-out"
          >
            SUBSCRIBE
          </Link>
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
            <span>
              598 Concession str, Hamilton, <br /> Ontario, L8V 1B3, Canada
            </span>
            <span>elodiabspa@gmail.com</span>
            <span>Phone: +1(289) 206-1802</span>
          </div>
          <div className="">
            <ul className="flex gap-4">
              <li className="a">
                <a href="https://www.instagram.com/elodia_beauty_and_spa?igsh=MWI2YWN0a3NzNGZvbA%3D%3D">
                  <FaInstagram className="text-cyan-900 text-2xl" />
                </a>
              </li>
              <li className="a">
                <a href="https://www.facebook.com/profile.php?id=61567223621147&mibextid=wwXIfr&rdid=w1IMe9quOL5G1nIE&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18uaNEQTAJ%2F%3Fmibextid%3DwwXIfr#">
                  <FaFacebook className="text-cyan-900 text-2xl" />
                </a>
              </li>
              <li className="a">
                <a href="https://www.tiktok.com/@elodiabeautyandspa?_t=ZM-8ulSXBqXmQJ&_r=1">
                  <FaTiktok className="text-cyan-900 text-2xl" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h3 className="text-xl">Opening Hours</h3>
          <div className="w-[20rem]">
            <div className="flex justify-between font-thin">
              <span>Monday to Tuesday</span>
              <span className="text-nowrap">10 AM - 7 PM</span>
            </div>
            <div className="flex justify-between font-thin">
              <span>Wednesday to Thursday</span>
              <span className="text-nowrap">10 AM - 6 PM</span>
            </div>
            <div className="flex justify-between font-thin">
              <span>Saturday</span>
              <span className="text-nowrap">2 AM - 6 PM</span>
            </div>
            <div className="flex justify-between font-thin">
              <span>Sunday</span>
              <span className="text-nowrap">2 AM - 6 PM</span>
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
