import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import ExperienceItem from "./ExperienceItem";

export default function Work() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const docRef = doc(db, "experience", "work"); // 👈 points to your seeded doc
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("✅ Firestore data:", data); // 👀 check what comes back
          setExperiences(data.experiences || []);
        } else {
          console.log("❌ No such document!");
        }
      } catch (err) {
        console.error("❌ Error fetching experiences:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading experiences...</p>;
  }

  return (
    <section
      id="work"
      className="relative z-10 min-h-screen bg-transparent mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24 w-full px-4"
      aria-label="Work experience"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-full bg-white/10 dark:bg-gray-900/10 px-6 py-5 backdrop-blur">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-gray-100">
          Experience
        </h2>
      </div>
      <ol className="group/list">
        {experiences.length > 0 ? (
          experiences.map((exp) => (
            <ExperienceItem key={exp.id} exp={exp} />
          ))
        ) : (
          <p className="text-gray-500">No experiences found.</p>
        )}
      </ol>
    </section>
  );
}
