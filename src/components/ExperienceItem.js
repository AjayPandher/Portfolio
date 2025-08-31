import React from "react";

export default function ExperienceItem({ exp }) {
  return (
    <li className="mb-12">
      <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 hover:opacity-100 group/list:hover:opacity-50">
        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none md:-inset-x-6 md:block group-hover:bg-slate-800/50 group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] group-hover:drop-shadow-lg"></div>

        <header
          className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-text-light dark:text-text-dark sm:col-span-2"
          aria-label={`${exp.duration}`}
        >
          {exp.duration}
        </header>

        <div className="z-10 sm:col-span-6">
          <h3 className="font-medium leading-snug text-text-light dark:text-text-dark">
            {exp.companyUrl ? (
              <a
                className="inline-flex items-baseline font-medium leading-tight text-text-light dark:text-text-dark hover:text-primary-dark focus-visible:text-primary-dark group/link text-base"
                href={exp.companyUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${exp.title} at ${exp.company} (opens in a new tab)`}
              >
                <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 md:block"></span>
                <span>
                  <span className="text-text-light dark:text-text-dark">{exp.title}</span> ·{" "}
                  <span className="inline-block">{exp.company}</span>
                </span>
              </a>
            ) : (
              <span className="text-text-light dark:text-text-dark">
                {exp.title} · {exp.company}
              </span>
            )}
          </h3>

          <p className="mt-2 text-sm leading-normal text-text-light dark:text-text-dark">
            {exp.description}
          </p>

          {exp.technologies.length > 0 && (
            <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
              {exp.technologies.map((tech, i) => (
                <li key={i} className="mr-1.5 mt-2">
                  <div className="flex items-center rounded-full bg-primary-light/10 px-3 py-1 text-xs font-medium leading-5 text-primary-light">
                    {tech}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </li>
  );
}
