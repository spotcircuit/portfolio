'use client';

import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import Recognition from '@/components/sections/Recognition'
import Contact from '@/components/sections/Contact'
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <>
      <main className="overflow-hidden">
        <Hero />
        
        {/* Recognition Section */}
        <div id="recognition" className="relative py-16 sm:py-24 bg-gray-50/50 dark:bg-gray-900/50">
          <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400">
                  Industry Recognition
                </span>
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
                Achievements and certifications from leading organizations
              </p>
            </motion.div>
            
            <Recognition />
          </div>
        </div>
        
        {/* Projects Showcase Section with Abstract Background */}
        <div className="relative py-16 sm:py-24">
          {/* Abstract Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl"></div>
            <div className="absolute top-60 -left-20 w-72 h-72 rounded-full bg-gradient-to-tr from-green-400/20 to-cyan-300/20 blur-3xl"></div>
            <div className="absolute bottom-20 right-60 w-96 h-96 rounded-full bg-gradient-to-bl from-amber-300/20 to-rose-500/20 blur-3xl"></div>
            <div className="absolute -bottom-40 left-40 w-80 h-80 rounded-full bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 blur-3xl"></div>
          </div>
          
          {/* Section Title */}
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                  Innovative Projects
                </span>
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
                Exploring the intersection of AI, design, and user experience
              </p>
            </motion.div>
          </div>
          
          {/* Projects Display */}
          <div className="relative mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-8">
            <Projects />
          </div>
        </div>
        
        {/* Skills Section with Abstract Background */}
        <div id="skills" className="relative py-16 sm:py-24">
          {/* Abstract Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 left-40 w-96 h-96 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-3xl"></div>
            <div className="absolute bottom-40 right-20 w-80 h-80 rounded-full bg-gradient-to-tr from-amber-400/10 to-pink-300/10 blur-3xl"></div>
            <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-gradient-to-bl from-green-300/10 to-teal-500/10 blur-3xl"></div>
          </div>
          
          {/* Section Title */}
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
                  Expertise & Skills
                </span>
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
                A comprehensive toolkit built from years of experience
              </p>
            </motion.div>
          </div>
          
          {/* Skills Content */}
          <div className="relative mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-8">
            <Skills />
          </div>
        </div>
        
        {/* About Section with Abstract Background */}
        <div id="about" className="relative py-16 sm:py-24">
          {/* Abstract Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-40 right-20 w-96 h-96 rounded-full bg-gradient-to-br from-green-500/10 to-teal-500/10 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-gradient-to-tr from-blue-400/10 to-indigo-300/10 blur-3xl"></div>
          </div>
          
          {/* Section Title */}
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400">
                  About Me
                </span>
              </h2>
            </motion.div>
          </div>
          
          {/* About Content */}
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 sm:p-8 ring-1 ring-gray-900/10 dark:ring-white/10">
              <About />
            </div>
          </div>
        </div>
        
        <Contact />
      </main>
    </>
  )
}
