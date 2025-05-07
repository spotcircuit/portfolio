'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const projects = [
  {
    name: 'AI BootCamp for Recruiters',
    description: 'Developed a comprehensive educational platform specifically designed to upskill recruiters for the AI era. The platform features live interactive classes, hands-on workshops, and personalized learning paths. Key functionalities include class registration and payment processing, progress tracking, certification management, and interactive assessments. The system also includes community features for peer learning, resource libraries, and AI-powered job market insights to help recruiters understand emerging trends. Built with Next.js and integrated with video conferencing and payment processing APIs.',
    image: '/images/aibootcamp.png',
    link: 'https://aibootcamp.lexduo.ai/',
    tags: ['Next.js', 'EdTech', 'Interactive Learning', 'Payment Processing'],
    metrics: [
      { label: 'Completion Rate', value: '92%' },
      { label: 'Career Advancement', value: '+45%' },
      { label: 'Knowledge Retention', value: '85%' }
    ]
  },
  {
    name: 'RoofMaster',
    description: 'Engineered a comprehensive roofing business management platform with an advanced sales training module. The system features interactive video-based learning, knowledge assessment tests, and groundbreaking AI-powered voice simulations for real-time practice with virtual customer personas. The dashboard provides real-time analytics, customer management, job scheduling, and financial tracking in an intuitive interface. Additional features include interactive project timelines, weather-aware scheduling, material estimation, and automated customer communications. Built with Next.js, Tailwind CSS, and integrated with OpenAI for voice simulations.',
    image: '/images/roofmaster.png',
    link: 'https://roofmaster-lemon.vercel.app/dashboard',
    tags: ['Next.js', 'AI Voice Simulation', 'Interactive Training', 'Business Management'],
    metrics: [
      { label: 'Sales Conversion', value: '+42%' },
      { label: 'Training Completion', value: '95%' },
      { label: 'Customer Satisfaction', value: '4.9/5' }
    ]
  },
  {
    name: 'Real-Time AI Training',
    description: 'Developed an innovative real-time voice interaction platform that enables users to practice conversations with AI-powered customer personas. This cutting-edge application allows roofing salespeople to engage in natural voice conversations with virtual customers, receiving immediate feedback and coaching. The system adapts to different scenarios, objections, and customer personalities, creating a realistic training environment. This technology has wide applications beyond sales training, including interview preparation, customer service training, and language learning. Built with Next.js, WebRTC for real-time audio, and OpenAI\'s advanced voice models.',
    image: '/images/realtimeaitraining.png',
    link: 'https://roofmaster-lemon.vercel.app/ai-interactive',
    tags: ['Real-time Voice AI', 'Interactive Training', 'Natural Language Processing', 'WebRTC'],
    metrics: [
      { label: 'Conversation Quality', value: '94%' },
      { label: 'Response Time', value: '< 500ms' },
      { label: 'Learning Effectiveness', value: '+65%' }
    ]
  },
  {
    name: 'Cohertly',
    description: 'Developed an innovative team collaboration and knowledge management platform that transforms how organizations capture, share, and leverage institutional knowledge. The platform features AI-powered document analysis, smart search capabilities, automated knowledge extraction, and customizable knowledge bases. The intuitive dashboard provides real-time insights into knowledge gaps, team engagement metrics, and learning progress. Built with Next.js and integrates with various productivity tools to create a seamless workflow experience.',
    image: '/images/cohertly.png',
    link: 'https://cohertly.vercel.app/dashboard',
    tags: ['Next.js', 'Knowledge Management', 'AI Analysis', 'Team Collaboration'],
    metrics: [
      { label: 'Knowledge Retention', value: '+65%' },
      { label: 'Team Productivity', value: '+40%' },
      { label: 'Onboarding Time', value: '-50%' }
    ]
  },
  {
    name: 'HouseHappy',
    description: 'Created a comprehensive real estate platform that revolutionizes the home buying and selling experience. The application features virtual property tours, AI-powered property recommendations, interactive neighborhood exploration, and seamless transaction management. The platform includes advanced filtering options, saved search notifications, mortgage calculators, and direct communication channels with agents. Built with Next.js and Tailwind CSS, with integrations to multiple real estate APIs and mapping services.',
    image: '/images/househappy.png',
    link: 'https://househappy.vercel.app/',
    tags: ['Next.js', 'Real Estate', 'Virtual Tours', 'Transaction Management'],
    metrics: [
      { label: 'User Engagement', value: '+75%' },
      { label: 'Time to Transaction', value: '-35%' },
      { label: 'Customer Satisfaction', value: '4.8/5' }
    ]
  },
  {
    name: 'Make to n8n Converter',
    description: 'Developed a professional web application that helps users convert Make.com workflows to n8n format. The tool analyzes uploaded Make.com JSON workflows, categorizes nodes by complexity, and calculates conversion costs based on a tiered pricing model. Features include drag-and-drop file upload, detailed node breakdowns, and responsive design built with Next.js and Tailwind CSS.',
    image: '/images/make-to-n8n.jpg',
    link: 'https://make-2-n8n.vercel.app/',
    tags: ['Next.js', 'Tailwind CSS', 'Workflow Analysis', 'Node.js'],
    metrics: [
      { label: 'Conversion Accuracy', value: '97%' },
      { label: 'Processing Time', value: '< 5s' },
      { label: 'Support Coverage', value: '25+ node types' }
    ]
  },
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

// Helper function to get background gradient based on project type
const getProjectBackground = (tags: string[]) => {
  // Check for project types and return appropriate gradient
  if (tags.some(tag => tag.includes('AI') || tag.includes('Voice'))) {
    return 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-900/30 dark:to-purple-900/30';
  } else if (tags.some(tag => tag.includes('Real Estate') || tag.includes('Virtual'))) {
    return 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-900/30 dark:to-cyan-900/30';
  } else if (tags.some(tag => tag.includes('EdTech') || tag.includes('Training'))) {
    return 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 dark:from-amber-900/30 dark:to-orange-900/30';
  } else if (tags.some(tag => tag.includes('E-commerce') || tag.includes('Business'))) {
    return 'bg-gradient-to-r from-emerald-500/10 to-green-500/10 dark:from-emerald-900/30 dark:to-green-900/30';
  } else if (tags.some(tag => tag.includes('Knowledge') || tag.includes('Collaboration'))) {
    return 'bg-gradient-to-r from-rose-500/10 to-pink-500/10 dark:from-rose-900/30 dark:to-pink-900/30';
  }
  // Default gradient
  return 'bg-gradient-to-r from-gray-500/10 to-slate-500/10 dark:from-gray-800/30 dark:to-slate-800/30';
};

// Helper function to get decorative elements based on project type
const getProjectDecorations = (tags: string[]) => {
  if (tags.some(tag => tag.includes('AI') || tag.includes('Voice'))) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-4 right-8 w-20 h-20 rounded-full bg-indigo-500/10 blur-xl"></div>
        <div className="absolute bottom-8 left-4 w-16 h-16 rounded-full bg-purple-500/10 blur-xl"></div>
        <svg className="absolute top-1/2 right-1/2 h-20 w-20 text-indigo-500/20 dark:text-indigo-400/20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
      </div>
    );
  } else if (tags.some(tag => tag.includes('Real Estate') || tag.includes('Virtual'))) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-8 right-4 w-24 h-24 rounded-full bg-blue-500/10 blur-xl"></div>
        <div className="absolute bottom-4 left-8 w-16 h-16 rounded-full bg-cyan-500/10 blur-xl"></div>
        <svg className="absolute bottom-1/3 right-12 h-16 w-16 text-blue-500/20 dark:text-blue-400/20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3L4 9v12h16V9l-8-6zm0 1.8l6 4.5V20h-2v-6H8v6H6V9.3l6-4.5zM10 14h4v6h-4v-6z" />
        </svg>
      </div>
    );
  } else if (tags.some(tag => tag.includes('EdTech') || tag.includes('Training'))) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-6 right-6 w-20 h-20 rounded-full bg-amber-500/10 blur-xl"></div>
        <div className="absolute bottom-6 left-6 w-16 h-16 rounded-full bg-orange-500/10 blur-xl"></div>
        <svg className="absolute top-1/3 left-12 h-16 w-16 text-amber-500/20 dark:text-amber-400/20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
        </svg>
      </div>
    );
  }
  // Default or other types
  return null;
};

export default function Projects() {
  return (
    <section id="projects" className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
        {projects.map((project, index) => {
          const bgGradient = getProjectBackground(project.tags);
          const decorations = getProjectDecorations(project.tags);
          
          return (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative isolate flex flex-col overflow-hidden rounded-2xl ${bgGradient} p-6 ring-1 ring-gray-900/10 dark:ring-white/10 h-full`}
            >
              {/* Abstract Decorative Elements */}
              {decorations}
              
              {/* Project Image */}
              <div className="relative aspect-[16/9] w-full mb-6 rounded-xl overflow-hidden group">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <Link
                    href={project.link}
                    className="inline-flex items-center text-sm font-medium text-white"
                  >
                    <span>Visit Site</span>
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
              
              {/* Project Content */}
              <div className="flex flex-col flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  <Link href={project.link} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {project.name}
                  </Link>
                </h3>
                
                <p className="mt-3 text-gray-600 dark:text-gray-300 line-clamp-3">
                  {project.description}
                </p>
                
                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
                
                {/* Metrics */}
                <div className="mt-auto pt-4 grid grid-cols-2 gap-2">
                  {project.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="flex flex-col p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                    >
                      <span className="text-xs text-gray-500 dark:text-gray-400">{metric.label}</span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{metric.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
