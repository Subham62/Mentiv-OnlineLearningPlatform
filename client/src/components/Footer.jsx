import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Copyright,
} from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Footer = () => {

  const sections = [
    {
      title: "Mentiv",
      links: [
        { name: "About Us", href: "/info" },
        { name: "Careers", href: "/info" },
        { name: "Press", href: "/info" },
        { name: "Blog", href: "/info" },
        { name: "Help Center", href: "/info" },
        { name: "Contact", href: "/info" },
      ],
    },
    {
      title: "Courses",
      links: [
        { name: "Web Development", href: "/course/search?query=web-development" },
        { name: "Data Science", href: "/course/search?query=python" },
        { name: "Mobile Development", href: "/course/search?query=mobile" },
        { name: "Business", href: "/course/search?query=business" },
        { name: "Design", href: "/course/search?query=design" },
        { name: "Marketing", href: "/course/search?query=marketing" },
      ],
    },
    {
      title: "Teach",
      links: [
        { name: "Become Instructor", href: "/info" },
        { name: "Upload Course", href: "/info" },
        { name: "Creator Resources", href: "/info" },
        { name: "Pricing", href: "/info" },
        { name: "Affiliates", href: "/info" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/info" },
        { name: "Terms of Service", href: "/info" },
        { name: "Cookie Policy", href: "/info" },
        { name: "Refund Policy", href: "/info" },
        { name: "Sitemap", href: "/info" },
      ],
    },
  ];

  return (
    <footer className="mt-10 w-full bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-gray-200 border-t border-gray-200 dark:border-gray-800">
      {/* Main Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 space-y-6">
            <div className="flex items-center gap-3">
              <img
                src={Logo}
                alt="Mentiv Logo"
                className="w-12 h-12 object-contain rounded-lg"
              />
              <h2 className="text-2xl lg:text-3xl font-extrabold bg-gradient-to-r from-MentivPurple to-MentivPurple/80 bg-clip-text text-transparent">
                Mentiv
              </h2>
            </div>
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-md">
              Learn from the world's best instructors and transform your career
              with hands-on projects and expert guidance.
            </p>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-base text-gray-800 dark:text-white">
                Quick Links
              </h3>
              <div className="flex flex-col gap-2">
                <Link
                  to="course/search?query"
                  className="text-gray-600 dark:text-gray-400 hover:text-MentivPurple dark:hover:text-MentivPurple transition-colors text-sm"
                >
                  Explore All Courses
                </Link>
                <Link
                  to="/become-instructor"
                  className="text-gray-600 dark:text-gray-400 hover:text-MentivPurple dark:hover:text-MentivPurple transition-colors text-sm"
                >
                  Become an Instructor
                </Link>
                <Link
                  to="/info"
                  className="text-gray-600 dark:text-gray-400 hover:text-MentivPurple dark:hover:text-MentivPurple transition-colors text-sm"
                >
                  Help & Support
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation Sections */}
          {sections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-bold text-base text-gray-900 dark:text-white">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.href}
                      className="group flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-MentivPurple dark:hover:text-MentivPurple hover:bg-MentivPurple/5 dark:hover:bg-MentivPurple/10 rounded-md py-1.5 px-2 -ml-2 transition-all duration-200 font-medium text-sm"
                    >
                      {link.name}
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-200 ml-auto text-MentivPurple" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Contact & Social Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
              Get in Touch
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-gray-700">
                <Phone className="w-5 h-5 mt-0.5 text-MentivPurple flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Phone
                  </p>
                  <a
                    href="tel:+919876543210"
                    className="text-gray-800 dark:text-white font-semibold hover:text-MentivPurple transition-colors"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-gray-700">
                <Mail className="w-5 h-5 mt-0.5 text-MentivPurple flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Email
                  </p>
                  <a
                    href="mailto:support@mentiv.com"
                    className="text-gray-800 dark:text-white font-semibold hover:text-MentivPurple transition-colors"
                  >
                    support@mentiv.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-gray-700">
                <MapPin className="w-5 h-5 mt-0.5 text-MentivPurple flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Address
                  </p>
                  <p className="text-gray-800 dark:text-white text-sm max-w-xs leading-relaxed">
                    3rd Floor, Trident Innovation Center, Infocity Road,
                    Chandaka Industrial Estate, Bhubaneswar, Odisha 751024
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="lg:col-span-2 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="space-y-2">
              <p className="font-semibold text-lg text-gray-900 dark:text-white">
                Follow Us
              </p>
              <div className="flex gap-3 pt-2">
                <a
                  href="#"
                  className="w-11 h-11 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 hover:border-MentivPurple hover:bg-MentivPurple/10 dark:hover:bg-MentivPurple/20 rounded-xl flex items-center justify-center transition-all duration-200 group"
                >
                  <Facebook className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-MentivPurple" />
                </a>
                <a
                  href="#"
                  className="w-11 h-11 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 hover:border-MentivPurple hover:bg-MentivPurple/10 dark:hover:bg-MentivPurple/20 rounded-xl flex items-center justify-center transition-all duration-200 group"
                >
                  <Twitter className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-MentivPurple" />
                </a>
                <a
                  href="#"
                  className="w-11 h-11 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20 rounded-xl flex items-center justify-center transition-all duration-200 group"
                >
                  <Instagram className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-pink-500 dark:group-hover:text-pink-400" />
                </a>
                <a
                  href="#"
                  className="w-11 h-11 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl flex items-center justify-center transition-all duration-200 group"
                >
                  <Linkedin className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                </a>
                <a
                  href="#"
                  className="w-11 h-11 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl flex items-center justify-center transition-all duration-200 group"
                >
                  <Youtube className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-6">
            <p>
              <Copyright className="w-4 h-4 inline mr-1" /> 2025 Mentiv. All
              rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 lg:gap-6">
            <Link
              to="/info"
              className="hover:text-MentivPurple transition-colors"
            >
              Privacy
            </Link>
            <Link
              to="/info"
              className="hover:text-MentivPurple transition-colors"
            >
              Terms
            </Link>
            <Link
              to="/info"
              className="hover:text-MentivPurple transition-colors"
            >
              Cookies
            </Link>
            <Link
              to="/info"
              className="hover:text-MentivPurple transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
