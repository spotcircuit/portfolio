'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const projects = [
  {
    name: 'AdUPlanner',
    description: 'Developed an innovative AI-powered ADU (Accessory Dwelling Unit) planning tool that combines Google Maps integration with OpenAI Vision analysis. The application allows users to input any address, visualizes the property on an interactive map, performs AI-based eligibility assessment, analyzes property constraints through satellite imagery, and enables users to plan structures with precise measurements. Features include property boundary detection, setback visualization, structure placement tools, and automated building template generation.',
    image: '/images/aduplanner.png',
    link: 'https://aduplanner-kz7dw2411-spotcircuits-projects.vercel.app/',
    tags: ['Next.js', 'OpenAI Vision', 'Google Maps API', 'AI Property Analysis'],
    metrics: [
      { label: 'Analysis Accuracy', value: '95%' },
      { label: 'Processing Time', value: '< 30s' },
      { label: 'User Satisfaction', value: '4.8/5' }
    ]
  },
  {
    name: 'Tube2Link',
    description: 'Created an AI-powered video analysis and processing platform that transforms YouTube content into engaging blog posts and social media content. The platform leverages advanced NLP and AI technologies to automatically generate SEO-optimized content, extract key insights, and create multi-format content distribution strategies. Features include automated transcription, content summarization, keyword optimization, and intelligent content repurposing.',
    image: '/images/tube2link.jpg',
    link: 'https://tube2link.com',
    tags: ['AI Content Generation', 'Video Analysis', 'NLP', 'Content Automation'],
    metrics: [
      { label: 'Content Generated', value: '100K+' },
      { label: 'Time Saved', value: '85%' },
      { label: 'SEO Performance', value: '+150%' }
    ]
  },
  {
    name: 'BnB Tobacco',
    description: 'Implemented comprehensive SEO/AEO optimization and e-commerce automation for one of the largest online tobacco retailers. Developed custom Shopify solutions, automated product listings, and optimized content for maximum visibility. Achieved significant improvements in organic traffic and conversion rates.',
    image: '/images/bnbtobacco.jpg',
    link: 'https://bnbtobacco.com',
    tags: ['Shopify', 'SEO/AEO', 'E-commerce', 'Content Automation'],
    metrics: [
      { label: 'Organic Traffic', value: '+25%' },
      { label: 'Conversion Rate', value: '+15%' },
      { label: 'Revenue Growth', value: '+20%' }
    ]
  },
  {
    name: 'StarCityGames',
    description: 'Revolutionized the online presence of the world\'s largest Magic: The Gathering retailer. Implemented advanced AI-driven product optimization, automated marketplace listings, and enhanced search visibility. Developed custom solutions for managing large-scale inventory and pricing automation.',
    image: '/images/starcitygames.jpg',
    link: 'https://starcitygames.com',
    tags: ['E-commerce', 'Marketplace Integration', 'Inventory Management', 'AI Automation'],
    metrics: [
      { label: 'Inventory Accuracy', value: '99.9%' },
      { label: 'Order Fulfillment', value: '99.5%' },
      { label: 'Customer Satisfaction', value: '4.9/5' }
    ]
  },
  {
    name: 'TheFixClinic',
    description: 'Developed and implemented a comprehensive digital strategy for this healthcare provider. Created automated systems for appointment scheduling, content management, and patient engagement. Improved online visibility through targeted SEO/AEO optimization and content automation.',
    image: '/images/fixclinic.jpg',
    link: 'https://thefixclinic.com',
    tags: ['Healthcare', 'SEO/AEO', 'Content Automation', 'Patient Engagement'],
    metrics: [
      { label: 'Patient Engagement', value: '+30%' },
      { label: 'Appointment Scheduling', value: '+25%' },
      { label: 'Online Visibility', value: '+50%' }
    ]
  },
  {
    name: 'Mr. Maple',
    description: 'Transformed the online presence of this specialty plant nursery through custom e-commerce solutions. Implemented automated inventory management, optimized product listings, and enhanced customer engagement. Developed specialized content automation for unique plant varieties.',
    image: '/images/mrmaple.jpg',
    link: 'https://mrmaple.com',
    tags: ['Shopify', 'E-commerce', 'Inventory Management', 'Content Optimization'],
    metrics: [
      { label: 'Inventory Turnover', value: '+20%' },
      { label: 'Customer Retention', value: '+15%' },
      { label: 'Revenue Growth', value: '+10%' }
    ]
  }
];

export default function Projects() {
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
              A collection of my most impactful projects, showcasing innovation in e-commerce and AI automation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <motion.article
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative isolate flex flex-col gap-6 sm:gap-8 lg:flex-row overflow-hidden rounded-2xl bg-white/50 dark:bg-gray-800/50 p-4 sm:p-6 ring-1 ring-gray-900/10 dark:ring-white/10"
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
                    <Link
                      href={project.link}
                      className="relative z-10 rounded-full bg-gradient-to-r from-green-600 to-blue-600 px-3 py-1.5 font-medium text-white hover:from-green-500 hover:to-blue-500"
                    >
                      Visit Site
                    </Link>
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
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.metrics.map((metric) => (
                      <span
                        key={metric.label}
                        className="inline-flex items-center rounded-md bg-gray-50 dark:bg-gray-800 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 ring-1 ring-inset ring-gray-500/10"
                      >
                        {metric.label}: {metric.value}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
