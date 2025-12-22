import { TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LearningJourney from "./LearningJourney";

const skillCategories = [
  {
    id: "highlight",
    title: "AI & Automation Skills",
    subtitle: "High demand across modern tech roles",
    cta: "Explore AI & ChatGPT Topics",
    ctaQuery: "AI ChatGPT",
    highlight: true,
    button: "View industry-relevant skills",
    buttonQuery: "AI",
  },

  {
    id: "development",
    title: "Development",
    skills: [
      {
        name: "MERN Full Stack",
        meta: "Project-based learning",
        query: "MERN Full Stack",
      },
      {
        name: "Java + DSA",
        meta: "Interview-focused preparation",
        query: "Java DSA",
      },
      {
        name: "Python Programming",
        meta: "Beginner to advanced",
        query: "Python",
      },
    ],
  },

  {
    id: "tech",
    title: "Tech & Analytics",
    skills: [
      {
        name: "Machine Learning",
        meta: "High industry demand",
        query: "Machine Learning",
      },
      {
        name: "Data Analytics",
        meta: "Business insights & tools",
        query: "Data Analytics",
      },
      {
        name: "Power BI / Tableau",
        meta: "Data visualization skills",
        query: "Power BI",
      },
    ],
  },

  {
    id: "career",
    title: "Career Growth",
    skills: [
      {
        name: "Aptitude & Reasoning",
        meta: "Placement preparation",
        query: "Aptitude Reasoning",
      },
      {
        name: "Interview Preparation",
        meta: "Technical & HR rounds",
        query: "Interview Preparation",
      },
      {
        name: "Resume & Portfolio Building",
        meta: "Career readiness",
        query: "Resume Portfolio",
      },
    ],
  },
];

// ------------------- MAIN COMPONENT -------------------
const PopularSkillsSection = () => {
  const navigate = useNavigate();

  const handleSkillClick = (searchQuery) => {
    navigate(`/course/search?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <section
      id="popular-skills"
      className="scroll-mt-24 bg-white dark:bg-gray-900 py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* ---------- SECTION HEADER ---------- */}
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            In-Demand Skills
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
            Curated learning areas based on modern industry needs and real-world use cases.
          </p>
        </div>

        {/* ---------- SKILL GRID ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="space-y-6">
              {/* Highlighted Category */}
              {category.highlight ? (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                    {category.title}
                  </h3>

                  <button
                    onClick={() => handleSkillClick(category.ctaQuery)}
                    className="group inline-flex items-center gap-2 font-bold text-base hover:underline"
                    style={{ color: "#5A4BDA" }}
                  >
                    {category.cta}
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {category.subtitle}
                  </p>

                  <button
                    onClick={() => handleSkillClick(category.buttonQuery)}
                    className="mt-2 px-6 py-3 text-sm font-bold border-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded inline-flex items-center gap-2"
                    style={{ borderColor: "#5A4BDA", color: "#5A4BDA" }}
                  >
                    {category.button}
                    <TrendingUp className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                /* Regular Skill Categories */
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {category.title}
                  </h3>

                  <ul className="space-y-5">
                    {category.skills.map((skill, i) => (
                      <li key={i}>
                        <button
                          onClick={() => handleSkillClick(skill.query)}
                          className="group block space-y-1 text-left w-full"
                        >
                          <p
                            className="font-bold text-base flex items-center gap-1 group-hover:underline"
                            style={{ color: "#5A4BDA" }}
                          >
                            {skill.name}
                            <svg
                              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </p>

                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {skill.meta}
                          </p>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        <LearningJourney />
      </div>
    </section>
  );
};

export default PopularSkillsSection;
