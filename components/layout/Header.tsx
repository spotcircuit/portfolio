'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'SpotCircuit', href: 'https://www.spotcircuit.com', external: true },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex lg:flex-1"
        >
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent text-2xl font-bold">
              Brian Pyatt
            </span>
          </Link>
        </motion.div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:flex lg:gap-x-8 items-center"
        >
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-100 hover:text-green-600 dark:hover:text-green-400 transition-colors hover:scale-105 transform duration-200"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/resume/BrianPyatt_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 text-base font-semibold text-white rounded-md bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 hover:from-green-500 hover:via-blue-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Resume
          </Link>
        </motion.div>
      </nav>

      {/* Mobile menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isOpen ? 1 : 0,
          height: isOpen ? 'auto' : 0,
          display: isOpen ? 'block' : 'none'
        }}
        transition={{ duration: 0.2 }}
        className="lg:hidden"
      >
        <div className={`fixed inset-x-0 top-[65px] bottom-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md z-50 ${isOpen ? 'block' : 'hidden'}`}>
          <div className="flex flex-col px-4 pt-2 pb-4 space-y-2 divide-y divide-gray-200 dark:divide-gray-700">
            <div className="py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="block px-4 py-3 text-base font-semibold text-gray-900 dark:text-gray-100 hover:text-green-600 dark:hover:text-green-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="py-4">
              <Link
                href="/resume/BrianPyatt_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-4 py-3 text-base font-semibold text-white text-center rounded-lg bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 hover:from-green-500 hover:via-blue-500 hover:to-purple-500 transition-all duration-200 shadow-md hover:shadow-lg"
                onClick={() => setIsOpen(false)}
              >
                View Resume
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
