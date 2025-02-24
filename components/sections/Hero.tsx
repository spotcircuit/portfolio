'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { 
  SiShopify, SiReact, SiNextdotjs, SiTypescript, SiPython, SiNodedotjs, 
  SiGraphql, SiDjango, SiTailwindcss, SiSass, SiWebflow, SiDocker, 
  SiKubernetes, SiTerraform, SiJenkins, SiVercel, SiAmazonwebservices, 
  SiGooglecloud, SiOpenai, SiTensorflow, SiPytorch, 
  SiPandas, SiNumpy, SiScikitlearn, SiGooglesearchconsole, SiGoogleanalytics, 
  SiGoogleads, SiMeta, SiHubspot, SiJira, SiGit, SiGitlab, SiSlack, SiConfluence,
  SiWordpress, SiHotjar, SiPostman, SiRedis, SiSnowflake,
  SiGoogletagmanager, SiMarketo, SiAdobe, SiJupyter, SiBigcommerce, 
  SiJavascript, SiPhp, SiRuby, SiGo,
  SiSupabase, SiNetlify } from 'react-icons/si';
import { FaSearchDollar, FaChartLine, FaRobot, FaMapMarkerAlt, FaCode, FaBrain, 
  FaChartBar, FaShoppingCart, FaStore, FaGoogle, FaShoppingBag, FaBolt, 
  FaCloud, FaWindows } from 'react-icons/fa';
import { BiTestTube } from 'react-icons/bi';
import { TbSeo, TbBrandOpenai, TbChartBar, TbBolt } from 'react-icons/tb';
import { FaLinkedin, FaGithub, FaFacebook, FaMedium } from 'react-icons/fa';

const categories = [
  {
    title: "SEO & Analytics",
    icon: "📈",
    gradient: "from-orange-500 to-yellow-500",
    skills: [
      { name: "SEO/AEO", icon: "gsc" },
      { name: "Google Analytics", icon: "ga" },
      { name: "Adobe Analytics", icon: "adobe" },
      { name: "SEMrush", icon: "semrush" },
      { name: "Ahrefs", icon: "ahrefs" },
      { name: "Google Ads", icon: "googleads" },
      { name: "Meta Ads", icon: "meta" },
      { name: "BrightLocal", icon: "brightlocal" },
      { name: "Surfer SEO", icon: "surfer" },
      { name: "Schema.org", icon: "schema" },
      { name: "Local SEO", icon: "localseo" },
      { name: "Rank Math", icon: "rankmath" },
      { name: "Yoast SEO", icon: "yoast" },
      { name: "A/B Testing", icon: "abtesting" },
      { name: "GTM", icon: "gtm" },
      { name: "Hotjar", icon: "hotjar" }
    ]
  },
  {
    title: "Programming",
    icon: "💻",
    gradient: "from-blue-500 to-cyan-500",
    skills: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "JavaScript", icon: "javascript" },
      { name: "Python", icon: "python" },
      { name: "Node.js", icon: "nodejs" },
      { name: "PHP", icon: "php" },
      { name: "Ruby", icon: "ruby" },
      { name: "Go", icon: "go" },
      { name: "GraphQL", icon: "graphql" },
      { name: "Django", icon: "django" },
      { name: "TailwindCSS", icon: "tailwindcss" }
    ]
  },
  {
    title: "AI/ML & Data",
    icon: "🤖",
    gradient: "from-purple-500 to-pink-500",
    skills: [
      { name: "OpenAI/ChatGPT", icon: "openai" },
      { name: "Anthropic", icon: "anthropic" },
      { name: "Perplexity", icon: "perplexity" },
      { name: "Notebook LM Plus", icon: "notebook" },
      { name: "LM Studio", icon: "lmstudio" },
      { name: "Napkin.ai", icon: "napkin" },
      { name: "Bolt.new", icon: "bolt" },
      { name: "Windsurf", icon: "windsurf" },
      { name: "TensorFlow", icon: "tensorflow" },
      { name: "PyTorch", icon: "pytorch" },
      { name: "Pandas", icon: "pandas" },
      { name: "NumPy", icon: "numpy" },
      { name: "Scikit-learn", icon: "sklearn" },
      { name: "BigQuery", icon: "gcp" },
      { name: "Snowflake", icon: "snowflake" }
    ]
  },
  {
    title: "Growth & CRO",
    icon: "📊",
    gradient: "from-red-500 to-rose-500",
    skills: [
      { name: "User Analytics", icon: "useranalytics" },
      { name: "Revenue Opt", icon: "revenue" },
      { name: "Market Analysis", icon: "market" },
      { name: "Growth Hacking", icon: "growth" },
      { name: "CRO", icon: "cro" },
      { name: "Mixpanel", icon: "mixpanel" },
      { name: "Optimizely", icon: "optimizely" },
      { name: "HubSpot", icon: "hubspot" },
      { name: "Mailchimp", icon: "mailchimp" },
      { name: "Intercom", icon: "intercom" },
      { name: "Lead Gen", icon: "leadgen" },
      { name: "Funnel Opt", icon: "funnel" },
      { name: "User Research", icon: "research" },
      { name: "Heat Mapping", icon: "heatmap" }
    ]
  },
  {
    title: "Tools & Platforms",
    icon: "🛠️",
    gradient: "from-indigo-500 to-blue-500",
    skills: [
      { name: "Shopify", icon: "shopify" },
      { name: "BigCommerce", icon: "bigcommerce" },
      { name: "Webflow", icon: "webflow" },
      { name: "WordPress", icon: "wordpress" },
      { name: "Google Profile", icon: "gmb" },
      { name: "Merchant Center", icon: "merchant" },
      { name: "Shopping Feed", icon: "shopping" },
      { name: "Teams", icon: "teams" },
      { name: "SharePoint", icon: "sharepoint" },
      { name: "Salesforce", icon: "salesforce" },
      { name: "Jira", icon: "jira" },
      { name: "Slack", icon: "slack" },
      { name: "Confluence", icon: "confluence" }
    ]
  },
  {
    title: "Cloud & DevOps",
    icon: "☁️",
    gradient: "from-green-500 to-emerald-500",
    skills: [
      { name: "AWS", icon: "aws" },
      { name: "Google Cloud", icon: "gcp" },
      { name: "Azure", icon: "azure" },
      { name: "Supabase", icon: "supabase" },
      { name: "Netlify", icon: "netlify" },
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "GitLab", icon: "gitlab" },
      { name: "Docker", icon: "docker" },
      { name: "Kubernetes", icon: "kubernetes" },
      { name: "Terraform", icon: "terraform" },
      { name: "Jenkins", icon: "jenkins" },
      { name: "Vercel", icon: "vercel" }
    ]
  }
];

const tabs = [
  { id: 'expert', name: 'digital-expert.ts' },
  { id: 'services', name: 'services.ts' },
  { id: 'projects', name: 'projects.ts' },
];

const recognition = [
  {
    title: 'Industry Recognition',
    items: [
      { name: 'Google Search Central', icon: SiGooglesearchconsole, description: 'Featured SEO Expert' },
      { name: 'Shopify Plus', icon: SiShopify, description: 'Enterprise Partner' },
      { name: 'AI & ML Summit', icon: TbBrandOpenai, description: 'Keynote Speaker' },
      { name: 'E-commerce Weekly', icon: FaShoppingCart, description: 'Technical Advisor' }
    ]
  }
];

const codeContent = {
  expert: `interface DigitalExpert {
  name: string;
  role: string;
  expertise: Expertise;
  experience: number;
  ventures: string[];
}

const expert: DigitalExpert = {
  name: 'Brian Pyatt',
  role: 'AI/Automation Engineer | SEO/AEO Specialist | E-commerce Solutions Architect',
  expertise: {
    seo: [
      'Advanced Technical SEO & AEO Strategy',
      'Enterprise-level Content Architecture',
      'Voice Search Optimization',
      'International SEO',
      'E-commerce SEO Specialization',
      'Core Web Vitals Optimization',
      'Schema.org Implementation',
      'JavaScript SEO'
    ],
    ecommerce: [
      'Shopify Plus Development',
      'BigCommerce Enterprise Solutions',
      'Custom E-commerce Platforms',
      'Marketplace Integration',
      'Payment Gateway Optimization',
      'Inventory Management Systems',
      'Multi-channel Commerce',
      'B2B E-commerce Solutions'
    ],
    ai: [
      'LLM Integration & Fine-tuning',
      'Computer Vision Solutions',
      'NLP & Text Analysis',
      'Automated Content Generation',
      'Predictive Analytics',
      'Machine Learning Pipelines',
      'AI-driven Personalization',
      'Custom AI Model Development'
    ],
    analytics: [
      'GA4 Implementation',
      'Advanced Data Studio',
      'Custom Attribution Modeling',
      'Conversion Tracking',
      'A/B Testing Frameworks',
      'User Behavior Analysis',
      'Revenue Analytics',
      'Cross-platform Attribution'
    ]
  },
  experience: 25,
  ventures: [
    'SpotCircuit - AI-Powered E-commerce Optimization',
    'SpotCircuitOffers - Intelligent Deal Discovery Platform',
    'SpotAI - Enterprise AI Solutions & Consulting',
    'SpotAIOffers - AI-Driven Market Analysis',
    'AdUPlanner - AI Property Analysis Platform',
    'SEO Automation Tools Suite',
    'E-commerce Analytics Platform',
    'Custom LLM Development Projects'
  ]
}`,
services: `interface Services {
  seo: {
    technical: [
      'Advanced Technical SEO Architecture',
      'Core Web Vitals Optimization',
      'Schema Markup Strategy',
      'Mobile-First Optimization',
      'Site Structure Analysis',
      'JavaScript SEO Implementation',
      'International SEO Strategy',
      'Technical Debt Resolution'
    ],
    content: [
      'AI-Powered Content Strategy',
      'AEO Implementation',
      'Content Architecture Design',
      'User Intent Mapping',
      'Topic Cluster Optimization',
      'Content Performance Analysis',
      'Voice Search Optimization',
      'E-A-T Enhancement Strategy'
    ]
  },
  ecommerce: {
    platforms: [
      'Shopify Plus Enterprise Solutions',
      'BigCommerce Custom Development',
      'Headless Commerce Architecture',
      'Custom Platform Development',
      'Multi-channel Integration',
      'B2B E-commerce Solutions',
      'Progressive Web Apps',
      'Mobile Commerce Optimization'
    ],
    optimization: [
      'Revenue Growth Strategy',
      'Conversion Rate Enhancement',
      'Customer Journey Optimization',
      'Cart Abandonment Recovery',
      'Payment Optimization',
      'Inventory Management',
      'Pricing Strategy Automation',
      'Market Expansion Planning'
    ]
  },
  ai: [
    'Custom LLM Development & Integration',
    'AI Solution Architecture Design',
    'Machine Learning Pipeline Development',
    'Computer Vision Implementation',
    'Natural Language Processing Solutions',
    'Predictive Analytics Systems',
    'Automation Workflow Design',
    'AI Model Training & Deployment',
    'Real-time Processing Systems',
    'Edge AI Implementation',
    'AI Performance Optimization',
    'Custom Algorithm Development'
  ]
}`,
projects: `interface Project {
  name: string;
  type: 'enterprise' | 'startup' | 'innovation';
  impact: {
    metrics: string[];
    results: string[];
  };
}

const projects: Project[] = [
  {
    name: 'Enterprise E-commerce Transformation',
    type: 'enterprise',
    impact: {
      metrics: [
        '300% increase in organic traffic',
        '150% improvement in conversion rate',
        '$50M+ additional annual revenue',
        '45% reduction in operational costs'
      ],
      results: [
        'AI-powered inventory management',
        'Automated pricing optimization',
        'Custom recommendation engine',
        'Real-time analytics dashboard'
      ]
    }
  },
  {
    name: 'AI-Driven Property Analysis Platform',
    type: 'innovation',
    impact: {
      metrics: [
        '95% accuracy in property assessment',
        '80% reduction in analysis time',
        '10,000+ properties analyzed',
        '40% increase in client satisfaction'
      ],
      results: [
        'Computer vision integration',
        'Automated compliance checking',
        'Real-time property visualization',
        'Intelligent zoning analysis'
      ]
    }
  },
  {
    name: 'E-commerce Analytics Suite',
    type: 'startup',
    impact: {
      metrics: [
        '200+ enterprise clients',
        '$2M ARR achievement',
        '85% client retention rate',
        '60% reduction in analysis time'
      ],
      results: [
        'Custom attribution modeling',
        'Predictive analytics engine',
        'Real-time monitoring system',
        'Automated reporting suite'
      ]
    }
  }
]`
  };

export default function Hero() {
  const [activeTab, setActiveTab] = useState('expert');

  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-b from-gray-100/20 dark:from-gray-900/20">
      <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
        <motion.div 
          className="px-6 lg:px-0 lg:pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto max-w-2xl">
            <motion.div 
              className="flex items-center space-x-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="relative w-32 h-32 mb-6 rounded-full overflow-hidden ring-4 ring-green-600/20"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Image
                  src="/images/bpyattheadshot.jpg"
                  alt="Brian Pyatt"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </motion.div>
            <div className="mt-4 sm:mt-8 flex items-center space-x-4">
              <Link
                href="https://spotcircuit.com"
                className="inline-flex"
              >
                <span className="rounded-full bg-green-600/10 px-3 py-1 text-sm font-semibold leading-6 text-green-600 dark:text-green-400 ring-1 ring-inset ring-green-600/10">
                  Founder @ SpotCircuit
                </span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/brianpyatt"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors cursor-pointer"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin className="w-5 h-5" />
              </Link>
              <Link
                href="https://github.com/spotcircuit"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors cursor-pointer"
                aria-label="GitHub Profile"
              >
                <FaGithub className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.facebook.com/profile.php?id=61555883133944"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500 transition-colors cursor-pointer"
                aria-label="Facebook Page"
              >
                <FaFacebook className="w-5 h-5" />
              </Link>
              <Link
                href="https://spotcircuit.medium.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors cursor-pointer"
                aria-label="Medium Blog"
              >
                <FaMedium className="w-5 h-5" />
              </Link>
            </div>
            <div className="mt-4 sm:mt-8">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI/Automation Engineer | SEO/AEO Specialist | E-commerce Solutions Architect
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                With over 25 years of experience pioneering digital innovation, I specialize in crafting sophisticated AI-driven solutions 
                that transform business operations. My expertise spans advanced SEO/AEO strategies, enterprise e-commerce optimization, 
                and cutting-edge automation systems that drive measurable growth and efficiency.
              </p>
            </div>
            <div className="mt-24">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl mb-8">
                Expertise & Skills
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 gap-y-12 -mr-[200%]">
                {categories.map((category) => (
                  <motion.div
                    key={category.title}
                    className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-50/90 to-gray-100/90 dark:from-gray-800/90 dark:to-gray-900/90 p-4
                      backdrop-blur-sm ring-1 ring-white/5 justify-between w-full
                      transform transition-all duration-300 hover:-translate-y-1
                      ${category.title === 'SEO & Analytics' ? 'hover:ring-blue-500/50' : 
                        category.title === 'Growth & CRO' ? 'hover:ring-purple-500/50' :
                        category.title === 'Programming' ? 'hover:ring-green-500/50' :
                        category.title === 'Tools & Platforms' ? 'hover:ring-orange-500/50' :
                        category.title === 'AI/ML & Data' ? 'hover:ring-indigo-500/50' :
                        'hover:ring-teal-500/50'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.2 }
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="mb-2">
                      <h3 className={`text-lg font-semibold bg-gradient-to-r 
                        ${category.title === 'SEO & Analytics' ? 'from-blue-600 to-blue-400' :
                          category.title === 'Growth & CRO' ? 'from-purple-600 to-purple-400' :
                          category.title === 'Programming' ? 'from-green-600 to-green-400' :
                          category.title === 'Tools & Platforms' ? 'from-orange-600 to-orange-400' :
                          category.title === 'AI/ML & Data' ? 'from-indigo-600 to-indigo-400' :
                          'from-teal-600 to-teal-400'} 
                        bg-clip-text text-transparent`}>
                        {category.title}
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {category.skills.map((skill) => {
                        const Icon = {
                          'shopify': SiShopify,
                          'react': SiReact,
                          'nextjs': SiNextdotjs,
                          'typescript': SiTypescript,
                          'python': SiPython,
                          'nodejs': SiNodedotjs,
                          'graphql': SiGraphql,
                          'django': SiDjango,
                          'tailwindcss': SiTailwindcss,
                          'sass': SiSass,
                          'webflow': SiWebflow,
                          'docker': SiDocker,
                          'kubernetes': SiKubernetes,
                          'terraform': SiTerraform,
                          'jenkins': SiJenkins,
                          'vercel': SiVercel,
                          'aws': SiAmazonwebservices,
                          'gcp': SiGooglecloud,
                          'azure': TbBolt,
                          'openai': SiOpenai,
                          'tensorflow': SiTensorflow,
                          'pytorch': SiPytorch,
                          'pandas': SiPandas,
                          'numpy': SiNumpy,
                          'sklearn': SiScikitlearn,
                          'gsc': SiGooglesearchconsole,
                          'ga': SiGoogleanalytics,
                          'googleads': SiGoogleads,
                          'meta': SiMeta,
                          'hubspot': SiHubspot,
                          'jira': SiJira,
                          'git': SiGit,
                          'gitlab': SiGitlab,
                          'slack': SiSlack,
                          'confluence': SiConfluence,
                          'wordpress': SiWordpress,
                          'hotjar': SiHotjar,
                          'postman': SiPostman,
                          'redis': SiRedis,
                          'snowflake': SiSnowflake,
                          'semrush': FaSearchDollar,
                          'ahrefs': FaChartLine,
                          'brightlocal': FaMapMarkerAlt,
                          'surfer': TbSeo,
                          'schema': FaCode,
                          'localseo': FaMapMarkerAlt,
                          'abtesting': BiTestTube,
                          'useranalytics': SiGoogleanalytics,
                          'revenue': FaChartLine,
                          'market': FaSearchDollar,
                          'growth': FaChartLine,
                          'cro': TbChartBar,
                          'optimize': TbChartBar,
                          'gtm': SiGoogletagmanager,
                          'marketing': SiMarketo,
                          'adobe': SiAdobe,
                          'anthropic': FaBrain,
                          'perplexity': FaRobot,
                          'notebook': SiJupyter,
                          'lmstudio': TbBrandOpenai,
                          'napkin': FaChartBar,
                          'bigcommerce': SiBigcommerce,
                          'gmb': FaGoogle,
                          'merchant': FaShoppingBag,
                          'shopping': FaShoppingCart,
                          'javascript': SiJavascript,
                          'php': SiPhp,
                          'ruby': SiRuby,
                          'go': SiGo,
                          'supabase': SiSupabase,
                          'netlify': SiNetlify,
                          'bolt': TbBolt,
                          'windsurf': FaWindows,
                        }[skill.icon];
                        
                        return (
                          <motion.div
                            key={skill.name}
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 
                              hover:bg-white dark:hover:bg-gray-800 ring-1 ring-white/10
                              transform transition-all duration-200"
                          >
                            {Icon && <Icon className="text-lg text-gray-600 dark:text-gray-300" />}
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {skill.name}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Industry Recognition</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {recognition[0].items.map((item, index) => (
                  <div key={index} className="flex flex-col items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <item.icon className="w-8 h-8 mb-2 text-gray-600 dark:text-gray-400" />
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 text-center">{item.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                href="#contact"
                className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Get in touch
              </Link>
              <Link
                href="#resume"
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100"
              >
                View Resume <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </motion.div>
        <motion.div 
          className="mt-16 sm:mt-24 md:mx-0 md:max-w-none lg:mx-0 lg:mt-0 lg:w-screen xl:w-[153%]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[170%] skew-x-[-30deg] bg-white dark:bg-gray-800 shadow-xl shadow-green-600/10 ring-1 ring-green-50 dark:ring-green-900 md:-mr-20 lg:-mr-36" aria-hidden="true" />
          <div className="shadow-lg md:rounded-3xl">
            <div className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]">
              <div className="absolute inset-y-0 left-1/2 -z-10 ml-10 w-[170%] skew-x-[-30deg] bg-green-100 dark:bg-green-800 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36" aria-hidden="true" />
              <div className="relative px-6 pt-4 sm:pt-8 md:pl-16">
                <div className="mx-0 max-w-none">
                  <div className="relative mb-2">
                    <div className="flex items-center justify-end gap-6 opacity-60 pr-0">
                      <SiShopify className="w-10 h-10 text-[#95BF47] hover:opacity-100 transition-opacity" />
                      <SiNextdotjs className="w-10 h-10 text-white hover:opacity-100 transition-opacity" />
                      <SiPython className="w-10 h-10 text-[#3776AB] hover:opacity-100 transition-opacity" />
                      <SiOpenai className="w-10 h-10 text-white hover:opacity-100 transition-opacity" />
                      <SiBigcommerce className="w-10 h-10 text-white hover:opacity-100 transition-opacity" />
                      <SiTypescript className="w-10 h-10 text-[#3178C6] hover:opacity-100 transition-opacity" />
                      <SiReact className="w-10 h-10 text-[#61DAFB] hover:opacity-100 transition-opacity" />
                      <SiGoogleanalytics className="w-10 h-10 text-[#E37400] hover:opacity-100 transition-opacity" />
                      <SiVercel className="w-10 h-10 text-white hover:opacity-100 transition-opacity" />
                      <SiAmazonwebservices className="w-12 h-12 text-[#FF9900] hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div className="relative w-full overflow-hidden rounded-xl bg-gray-900/70 p-2 backdrop-blur">
                    <div className="absolute top-2 left-6 flex space-x-2">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <div className="h-3 w-3 rounded-full bg-yellow-500" />
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                    </div>
                    <div className="mt-6 flex gap-6 text-sm text-gray-400">
                      {tabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`${
                            activeTab === tab.id
                              ? 'text-gray-200 border-b border-gray-200'
                              : 'hover:text-gray-200'
                          } transition-colors`}
                        >
                          {tab.name}
                        </button>
                      ))}
                    </div>
                    <div className="h-[48rem] overflow-y-auto mt-6 relative">
                      <pre className="p-4">
                        <code className="language-typescript text-sm text-gray-100">
                          {codeContent[activeTab]}
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
