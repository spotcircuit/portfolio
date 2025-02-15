'use client';

export default function Resume(): JSX.Element {
  return (
    <section id="resume" className="relative">
      <div className="rounded-3xl bg-gradient-to-r from-gray-50/90 to-gray-100/90 dark:from-gray-800/90 dark:to-gray-900/90 p-4 sm:p-6 lg:p-8 h-full ring-1 ring-gray-900/10 dark:ring-white/10">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Resume</h2>
        <p className="mt-4 text-base sm:text-lg leading-8 text-gray-600 dark:text-gray-400">
          Download my resume to learn more about my experience and skills.
        </p>
        <div className="mt-6">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
