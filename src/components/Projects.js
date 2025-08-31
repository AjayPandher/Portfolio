import { useEffect, useState } from "react";
import { db } from "../firebase"; 
import { doc, getDoc } from "firebase/firestore";

const GITHUB_USERNAME = "AjayPandher";

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // ✅ 1. Fetch allowed GitHub repo names from Firestore
        const appContentRef = doc(db, "appContent", "githubProjects");
        const appContentSnap = await getDoc(appContentRef);

        let allowedRepos = [];
        if (appContentSnap.exists()) {
          allowedRepos = appContentSnap.data().repos || [];
        } else {
          console.warn("⚠️ No githubProjects doc found in Firestore.");
        }

        // ✅ 2. Fetch GitHub repos
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
        const data = await res.json();

        const filteredRepos = data.filter(
          (repo) => allowedRepos.includes(repo.name) && !repo.fork
        );

        const reposWithLanguages = await Promise.all(
          filteredRepos.map(async (repo) => {
            try {
              const langRes = await fetch(repo.languages_url);
              const langData = await langRes.json();
              const languages = Object.keys(langData);
              return {
                id: repo.id,
                name: repo.name,
                description: repo.description,
                html_url: repo.html_url,
                languages,
              };
            } catch {
              return {
                id: repo.id,
                name: repo.name,
                description: repo.description,
                html_url: repo.html_url,
                languages: [],
              };
            }
          })
        );

        // ✅ 3. Fetch custom projects from Firestore
        const customRef = doc(db, "projects", "custom");
        const customSnap = await getDoc(customRef);

        let firestoreProjects = [];
        if (customSnap.exists()) {
          firestoreProjects = customSnap.data().repos || [];
        }

        // ✅ 4. Merge GitHub + Firestore
        setRepos([...reposWithLanguages, ...firestoreProjects]);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section
      id="projects"
      className="relative z-10 min-h-screen bg-transparent mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24 w-full px-4"
      aria-label="Projects"
    >
      <div className="sticky top-0 z-20 -mx-4 mb-6 w-full bg-white/10 dark:bg-gray-900/10 px-4 py-5 backdrop-blur">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-gray-100">
          Projects
        </h2>
      </div>

      {loading && (
        <p className="text-gray-600 dark:text-gray-400">Loading projects...</p>
      )}
      {!loading && repos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {repos.map((repo, idx) => (
            <a
              key={repo.id}
              href={repo.html_url || "#"}
              target={repo.html_url ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className={`relative block p-6 rounded-2xl bg-gray-800 dark:bg-gray-900 shadow-md hover:shadow-xl transition-transform transform hover:scale-105
              ${idx % 5 === 0 ? "sm:row-span-2 lg:row-span-2" : ""}
              `}
            >
              <h3 className="text-xl font-semibold text-white hover:text-blue-400 transition-colors">
                {repo.name}
              </h3>
              <p className="text-gray-300 mt-2 text-sm">
                {repo.description || "No description available"}
              </p>

              {repo.languages?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {repo.languages.map((lang, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs rounded-full bg-gray-700 text-gray-200"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              )}
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
