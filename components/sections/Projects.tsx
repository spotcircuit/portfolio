'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaYoutube, FaLinkedin, FaInstagram, FaTiktok, FaTwitter, FaPinterest } from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';

interface ProjectSocial {
  readonly platform: string;
  readonly url: string;
  readonly icon: JSX.Element;
  readonly color: string;
}

interface Project {
  readonly name: string;
  readonly description: string;
  readonly image: string;
  readonly link: string;
  readonly github: string;
  readonly tags: readonly string[];
  readonly socials: readonly ProjectSocial[];
}

const projects: readonly Project[] = [
  {
    name: 'Tube2Link',
    description: 'Developed an innovative AI-powered application that transforms YouTube videos into engaging LinkedIn posts. Features include OAuth authentication, automatic caption extraction, AI content generation with length control, and a modern responsive UI. Supports multiple video types and includes real-time previews.',
    image: '/images/tube2link.jpg',
    link: 'https://www.tube2link.com',
    github: 'https://github.com/spotcircuit/tube2link',
    tags: ['Next.js', 'TypeScript', 'OAuth', 'AI', 'TailwindCSS'] as const,
    socials: [
      { platform: 'Upwork', url: 'https://www.upwork.com/freelancers/~017e1b39c3a62a0efe', icon: <SiUpwork />, color: 'hover:text-[#6FDA44]' },
      { platform: 'YouTube', url: 'https://youtube.com/@spotcircuit', icon: <FaYoutube />, color: 'hover:text-red-600' },
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/brianpyatt', icon: <FaLinkedin />, color: 'hover:text-blue-600' },
      { platform: 'Instagram', url: 'https://instagram.com/spotcircuit', icon: <FaInstagram />, color: 'hover:text-pink-600' },
      { platform: 'TikTok', url: 'https://tiktok.com/@spotcircuit', icon: <FaTiktok />, color: 'hover:text-black dark:hover:text-white' },
      { platform: 'Twitter', url: 'https://twitter.com/spotcircuit', icon: <FaTwitter />, color: 'hover:text-blue-400' },
      { platform: 'Pinterest', url: 'https://pinterest.com/spotcircuit', icon: <FaPinterest />, color: 'hover:text-red-700' }
    ] as const
  },
  {
    name: 'BnB Tobacco',
    description: 'Implemented comprehensive SEO/AEO optimization and e-commerce automation for one of the largest online tobacco retailers. Developed custom Shopify solutions, automated product listings, and optimized content for maximum visibility. Achieved significant improvements in organic traffic and conversion rates.',
    image: '/images/bnbtobacco.jpg',
    link: 'https://bnbtobacco.com',
    github: '',
    tags: ['Shopify', 'SEO/AEO', 'E-commerce', 'Content Automation'] as const,
    socials: [
      { platform: 'Instagram', url: 'https://instagram.com/bnbtobacco', icon: <FaInstagram />, color: 'hover:text-pink-600' },
      { platform: 'Pinterest', url: 'https://pinterest.com/bnbtobacco', icon: <FaPinterest />, color: 'hover:text-red-700' },
      { platform: 'Twitter', url: 'https://twitter.com/bnbtobacco', icon: <FaTwitter />, color: 'hover:text-blue-400' }
    ] as const
  },
  {
    name: 'StarCityGames',
    description: 'Revolutionized the online presence of the world\'s largest Magic: The Gathering retailer. Implemented advanced AI-driven product optimization, automated marketplace listings, and enhanced search visibility. Developed custom solutions for managing large-scale inventory and pricing automation.',
    image: '/images/starcitygames.jpg',
    link: 'https://starcitygames.com',
    github: '',
    tags: ['E-commerce', 'Marketplace Integration', 'Inventory Management', 'AI Automation'] as const,
    socials: [
      { platform: 'YouTube', url: 'https://youtube.com/@starcitygames', icon: <FaYoutube />, color: 'hover:text-red-600' },
      { platform: 'Twitter', url: 'https://twitter.com/starcitygames', icon: <FaTwitter />, color: 'hover:text-blue-400' },
      { platform: 'Instagram', url: 'https://instagram.com/starcitygames', icon: <FaInstagram />, color: 'hover:text-pink-600' }
    ] as const
  },
  {
    name: 'TheFixClinic',
    description: 'Developed and implemented a comprehensive digital strategy for this healthcare provider. Created automated systems for appointment scheduling, content management, and patient engagement. Improved online visibility through targeted SEO/AEO optimization and content automation.',
    image: '/images/fixclinic.jpg',
    link: 'https://thefixclinic.com',
    github: '',
    tags: ['Healthcare', 'SEO/AEO', 'Content Automation', 'Patient Engagement'] as const,
    socials: [
      { platform: 'Instagram', url: 'https://instagram.com/thefixclinic', icon: <FaInstagram />, color: 'hover:text-pink-600' },
      { platform: 'YouTube', url: 'https://youtube.com/@thefixclinic', icon: <FaYoutube />, color: 'hover:text-red-600' },
      { platform: 'LinkedIn', url: 'https://linkedin.com/company/thefixclinic', icon: <FaLinkedin />, color: 'hover:text-blue-600' }
    ] as const
  },
  {
    name: 'Mr. Maple',
    description: 'Transformed the online presence of this specialty plant nursery through custom e-commerce solutions. Implemented automated inventory management, optimized product listings, and enhanced customer engagement. Developed specialized content automation for unique plant varieties.',
    image: '/images/mrmaple.jpg',
    link: 'https://mrmaple.com',
    github: '',
    tags: ['Shopify', 'E-commerce', 'Inventory Management', 'Content Optimization'] as const,
    socials: [
      { platform: 'YouTube', url: 'https://youtube.com/@mrmaple', icon: <FaYoutube />, color: 'hover:text-red-600' },
      { platform: 'Instagram', url: 'https://instagram.com/mrmapletrees', icon: <FaInstagram />, color: 'hover:text-pink-600' },
      { platform: 'Pinterest', url: 'https://pinterest.com/mrmapletrees', icon: <FaPinterest />, color: 'hover:text-red-700' }
    ] as const
  }
] as const;

export default function Projects(): JSX.Element {
  return (
    <section id="projects" className="relative">
      <div className="rounded-3xl bg-gradient-to-r from-gray-50/90 to-gray-100/90 dark:from-gray-800/90 dark:to-gray-900/90 p-4 sm:p-6 lg:p-8 h-full ring-1 ring-gray-900/10 dark:ring-white/10">
        <div className="space-y-6 sm:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Featured Projects</h2>
            <p className="mt-4 text-base sm:text-lg leading-8 text-gray-600 dark:text-gray-400">
              A collection of my most impactful projects, showcasing innovation in e-commerce, AI automation, and software development.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <motion.article
                key={`${project.name}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative isolate flex flex-col gap-6 sm:gap-8 lg:flex-row overflow-hidden rounded-2xl bg-white/50 dark:bg-gray-800/50 p-4 sm:p-6 ring-1 ring-gray-900/10 dark:ring-white/10 hover:ring-2 hover:ring-blue-500/50 dark:hover:ring-blue-400/50"
              >
                <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-x-4 text-xs mb-4">
                    {project.link && (
                      <Link
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 rounded-full bg-gradient-to-r from-green-600 to-blue-600 px-3 py-1.5 font-medium text-white hover:from-green-500 hover:to-blue-500 transition-all duration-300"
                      >
                        Visit Site
                      </Link>
                    )}
                    {project.github && (
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 px-3 py-1.5 font-medium text-white hover:from-gray-500 hover:to-gray-600 transition-all duration-300"
                      >
                        View on GitHub
                      </Link>
                    )}
                  </div>
                  
                  <div className="group relative">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
                      <Link href={project.link}>
                        <span className="absolute inset-0" />
                        {project.name}
                      </Link>
                    </h3>
                    <p className="mt-3 text-base sm:text-lg text-gray-600 dark:text-gray-400">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-md bg-gray-50 dark:bg-gray-800 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 ring-1 ring-inset ring-gray-500/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {project.socials && (
                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Connect on Social Media</h4>
                      <div className="flex flex-wrap gap-3">
                        {project.socials.map((social) => (
                          <Link
                            key={social.platform}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-gray-500 dark:text-gray-400 text-xl transition-all duration-300 transform hover:scale-110 ${social.color}`}
                            title={social.platform}
                          >
                            {social.icon}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
