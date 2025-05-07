'use client';

import { motion } from 'framer-motion';
import { 
  SiShopify, SiReact, SiNextdotjs, SiTypescript, SiPython, SiNodedotjs, 
  SiGraphql, SiDjango, SiTailwindcss, SiSass, SiWebflow, SiDocker, 
  SiKubernetes, SiJenkins, SiVercel, SiAmazonwebservices, SiGooglecloud, 
  SiOpenai, SiTensorflow, SiPytorch, SiPandas, SiNumpy, SiScikitlearn, 
  SiGooglesearchconsole, SiGoogleanalytics, SiGoogleads, SiMeta, SiHubspot, 
  SiJira, SiGit, SiGitlab, SiSlack, SiConfluence, SiWordpress, SiHotjar, 
  SiPostman, SiRedis, SiSnowflake, SiGoogletagmanager, SiMarketo, SiAdobe,
  SiJupyter, SiBigcommerce, SiJavascript, SiPhp, SiRuby, SiGo, SiSupabase, SiNetlify
} from 'react-icons/si';
import { FaSearchDollar, FaChartLine, FaMapMarkerAlt, FaCode, FaBrain, FaRobot, FaShoppingBag, FaShoppingCart, FaGoogle, FaWindows } from 'react-icons/fa';
import { TbSeo, TbChartBar, TbBolt, TbBrandOpenai } from 'react-icons/tb';
import { BiTestTube } from 'react-icons/bi';

// Define categories and skills
const categories = [
  {
    title: 'SEO & Analytics',
    skills: [
      { name: 'SEO/AEO', icon: 'gsc' },
      { name: 'Google Analytics', icon: 'ga' },
      { name: 'Adobe Analytics', icon: 'adobe' },
      { name: 'Ahrefs', icon: 'ahrefs' },
      { name: 'SEMrush', icon: 'semrush' },
      { name: 'BrightLocal', icon: 'brightlocal' },
      { name: 'Schema.org', icon: 'schema' },
      { name: 'Local SEO', icon: 'localseo' },
      { name: 'Surfer SEO', icon: 'surfer' },
      { name: 'Meta Ads', icon: 'meta' },
      { name: 'Google Ads', icon: 'googleads' },
      { name: 'A/B Testing', icon: 'abtesting' },
      { name: 'GTM', icon: 'gtm' },
    ]
  },
  {
    title: 'Programming',
    skills: [
      { name: 'React', icon: 'react' },
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Python', icon: 'python' },
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'Ruby', icon: 'ruby' },
      { name: 'PHP', icon: 'php' },
      { name: 'Go', icon: 'go' },
      { name: 'Django', icon: 'django' },
      { name: 'GraphQL', icon: 'graphql' },
      { name: 'TailwindCSS', icon: 'tailwindcss' },
    ]
  },
  {
    title: 'AI/ML & Data',
    skills: [
      { name: 'OpenAI/ChatGPT', icon: 'openai' },
      { name: 'Anthropic', icon: 'anthropic' },
      { name: 'Perplexity', icon: 'perplexity' },
      { name: 'Notebook LM Plus', icon: 'notebook' },
      { name: 'LM Studio', icon: 'lmstudio' },
      { name: 'Bolt.new', icon: 'bolt' },
      { name: 'TensorFlow', icon: 'tensorflow' },
      { name: 'PyTorch', icon: 'pytorch' },
      { name: 'Pandas', icon: 'pandas' },
      { name: 'Scikit-learn', icon: 'sklearn' },
      { name: 'NumPy', icon: 'numpy' },
      { name: 'BigQuery', icon: 'gcp' },
    ]
  },
  {
    title: 'Growth & CRO',
    skills: [
      { name: 'User Analytics', icon: 'useranalytics' },
      { name: 'Market Analysis', icon: 'market' },
      { name: 'Growth Hacking', icon: 'growth' },
      { name: 'CRO', icon: 'cro' },
      { name: 'Optimizely', icon: 'optimize' },
      { name: 'Mixpanel', icon: 'marketing' },
      { name: 'HubSpot', icon: 'hubspot' },
      { name: 'Intercom', icon: 'marketing' },
      { name: 'Funnel Opt', icon: 'revenue' },
      { name: 'Lead Gen', icon: 'marketing' },
      { name: 'User Research', icon: 'useranalytics' },
      { name: 'Heat Mapping', icon: 'hotjar' },
    ]
  },
  {
    title: 'Tools & Platforms',
    skills: [
      { name: 'Shopify', icon: 'shopify' },
      { name: 'BigCommerce', icon: 'bigcommerce' },
      { name: 'WordPress', icon: 'wordpress' },
      { name: 'Webflow', icon: 'webflow' },
      { name: 'Google Profile', icon: 'gmb' },
      { name: 'Merchant Center', icon: 'merchant' },
      { name: 'Shopping Feed', icon: 'shopping' },
      { name: 'Teams', icon: 'slack' },
      { name: 'Shopaholic', icon: 'shopping' },
      { name: 'Salesforce', icon: 'marketing' },
      { name: 'Jira', icon: 'jira' },
      { name: 'Confluence', icon: 'confluence' },
      { name: 'Slack', icon: 'slack' },
    ]
  },
  {
    title: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', icon: 'aws' },
      { name: 'Google Cloud', icon: 'gcp' },
      { name: 'Azure', icon: 'azure' },
      { name: 'Netlify', icon: 'netlify' },
      { name: 'GitHub', icon: 'git' },
      { name: 'GitLab', icon: 'gitlab' },
      { name: 'Docker', icon: 'docker' },
      { name: 'Terraform', icon: 'terraform' },
      { name: 'Vercel', icon: 'vercel' },
      { name: 'Jenkins', icon: 'jenkins' },
      { name: 'Supabase', icon: 'supabase' },
      { name: 'Windsurf', icon: 'windsurf' },
    ]
  },
];

export default function Skills() {
  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
        {categories.map((category) => {
          // Determine gradient colors based on category
          const gradientColors = 
            category.title === 'SEO & Analytics' ? 'from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300' :
            category.title === 'Growth & CRO' ? 'from-purple-600 to-purple-400 dark:from-purple-500 dark:to-purple-300' :
            category.title === 'Programming' ? 'from-green-600 to-green-400 dark:from-green-500 dark:to-green-300' :
            category.title === 'Tools & Platforms' ? 'from-orange-600 to-orange-400 dark:from-orange-500 dark:to-orange-300' :
            category.title === 'AI/ML & Data' ? 'from-indigo-600 to-indigo-400 dark:from-indigo-500 dark:to-indigo-300' :
            'from-teal-600 to-teal-400 dark:from-teal-500 dark:to-teal-300';
            
          // Determine background gradient based on category
          const bgGradient = 
            category.title === 'SEO & Analytics' ? 'from-blue-500/5 to-blue-400/5 dark:from-blue-900/10 dark:to-blue-800/10' :
            category.title === 'Growth & CRO' ? 'from-purple-500/5 to-purple-400/5 dark:from-purple-900/10 dark:to-purple-800/10' :
            category.title === 'Programming' ? 'from-green-500/5 to-green-400/5 dark:from-green-900/10 dark:to-green-800/10' :
            category.title === 'Tools & Platforms' ? 'from-orange-500/5 to-orange-400/5 dark:from-orange-900/10 dark:to-orange-800/10' :
            category.title === 'AI/ML & Data' ? 'from-indigo-500/5 to-indigo-400/5 dark:from-indigo-900/10 dark:to-indigo-800/10' :
            'from-teal-500/5 to-teal-400/5 dark:from-teal-900/10 dark:to-teal-800/10';
            
          // Determine hover ring color based on category
          const hoverRing = 
            category.title === 'SEO & Analytics' ? 'hover:ring-blue-500/30' :
            category.title === 'Growth & CRO' ? 'hover:ring-purple-500/30' :
            category.title === 'Programming' ? 'hover:ring-green-500/30' :
            category.title === 'Tools & Platforms' ? 'hover:ring-orange-500/30' :
            category.title === 'AI/ML & Data' ? 'hover:ring-indigo-500/30' :
            'hover:ring-teal-500/30';
          
          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${bgGradient} p-6
                backdrop-blur-sm ring-1 ring-white/10 justify-between w-full h-full
                transform transition-all duration-300 hover:-translate-y-1 ${hoverRing}`}
            >
              {/* Abstract decorative elements based on category */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
                {category.title === 'SEO & Analytics' && (
                  <svg className="absolute top-4 right-4 h-24 w-24 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.88-11.71L10 14.17l-1.88-1.88a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L14.3 9.7a.996.996 0 0 0 0-1.41c-.39-.38-1.03-.39-1.42 0z" />
                  </svg>
                )}
                {category.title === 'Programming' && (
                  <svg className="absolute top-4 right-4 h-24 w-24 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
                  </svg>
                )}
                {category.title === 'AI/ML & Data' && (
                  <svg className="absolute top-4 right-4 h-24 w-24 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                  </svg>
                )}
                {category.title === 'Growth & CRO' && (
                  <svg className="absolute top-4 right-4 h-24 w-24 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z" />
                  </svg>
                )}
                {category.title === 'Tools & Platforms' && (
                  <svg className="absolute top-4 right-4 h-24 w-24 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
                  </svg>
                )}
                {category.title === 'Cloud & DevOps' && (
                  <svg className="absolute top-4 right-4 h-24 w-24 text-teal-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z" />
                  </svg>
                )}
              </div>
              
              <div className="mb-4">
                <h3 className={`text-xl font-bold bg-gradient-to-r ${gradientColors} bg-clip-text text-transparent`}>
                  {category.title}
                </h3>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
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
                    'terraform': TbBolt,
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
                    'napkin': TbChartBar,
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
          );
        })}
      </div>
    </div>
  );
}
