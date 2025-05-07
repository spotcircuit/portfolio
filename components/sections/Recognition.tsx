'use client';

import { motion } from 'framer-motion';
import { FaAward, FaTrophy, FaCertificate, FaMedal, FaStar, FaGem, FaGraduationCap, FaUserTie } from 'react-icons/fa';
import { SiGoogleanalytics, SiShopify, SiAmazonwebservices, SiOpenai } from 'react-icons/si';

// Define recognition data
const recognitionData = [
  {
    category: 'Industry Certifications',
    items: [
      { 
        name: 'Google Analytics Expert', 
        description: 'Advanced certification for analytics implementation and strategy', 
        icon: SiGoogleanalytics,
        color: 'from-orange-500 to-amber-500'
      },
      { 
        name: 'AWS Solutions Architect', 
        description: 'Certified expert in cloud architecture design', 
        icon: SiAmazonwebservices,
        color: 'from-orange-400 to-yellow-500'
      },
      { 
        name: 'Shopify Partner', 
        description: 'Elite status in the Shopify ecosystem', 
        icon: SiShopify,
        color: 'from-green-500 to-emerald-500'
      },
      { 
        name: 'OpenAI Specialist', 
        description: 'Advanced implementation of AI technologies', 
        icon: SiOpenai,
        color: 'from-teal-500 to-cyan-500'
      },
    ]
  },
  {
    category: 'Awards & Achievements',
    items: [
      { 
        name: 'E-commerce Excellence', 
        description: 'Top 1% performance in online retail optimization', 
        icon: FaTrophy,
        color: 'from-amber-500 to-yellow-400'
      },
      { 
        name: 'SEO Innovator', 
        description: 'Recognized for pioneering SEO/AEO strategies', 
        icon: FaAward,
        color: 'from-blue-500 to-indigo-500'
      },
      { 
        name: 'Tech Leadership', 
        description: 'Industry recognition for technical innovation', 
        icon: FaUserTie,
        color: 'from-purple-500 to-violet-500'
      },
      { 
        name: 'AI Implementation', 
        description: 'Award for groundbreaking AI business applications', 
        icon: FaGem,
        color: 'from-rose-500 to-pink-500'
      },
    ]
  },
  {
    category: 'Industry Impact',
    items: [
      { 
        name: '150+ Businesses', 
        description: 'Successfully transformed through digital strategies', 
        icon: FaStar,
        color: 'from-yellow-500 to-amber-500'
      },
      { 
        name: '$500M+ Revenue', 
        description: 'Generated for clients through optimization', 
        icon: FaMedal,
        color: 'from-green-500 to-teal-500'
      },
      { 
        name: '25+ Industries', 
        description: 'Cross-sector expertise and implementation', 
        icon: FaCertificate,
        color: 'from-blue-500 to-cyan-500'
      },
      { 
        name: 'Thought Leadership', 
        description: 'Regular speaker at industry conferences', 
        icon: FaGraduationCap,
        color: 'from-indigo-500 to-purple-500'
      },
    ]
  }
];

export default function Recognition() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-r from-amber-500/5 to-orange-500/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="relative">
        {recognitionData.map((category, categoryIndex) => (
          <div key={category.category} className="mb-16">
            <motion.h3 
              className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                {category.category}
              </span>
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.items.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300"
                >
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br opacity-5 dark:opacity-10">
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color}`}></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative p-6 flex flex-col items-center text-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-gradient-to-br ${item.color} text-white`}>
                      <item.icon className="w-8 h-8" />
                    </div>
                    
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {item.name}
                    </h4>
                    
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
