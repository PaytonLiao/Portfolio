import { useEffect } from "react";

import "./SkillSphere.css";

// Importing TagCloud package
import TagCloud from "TagCloud";

const SkillSphere = () => {
  // Animation settings for Text Cloud
  useEffect(() => {
    return () => {
      const container = ".tagcloud";
      const texts = [
        "HTML",
        "CSS",
        "React",
        "Python",
        "JavaScript/Typescript",
        "C/C++",
        "PyTorch",
        "Git",
        "Node.JS",
        "Linux/Ubuntu",
        "SQL",
        "MongoDB",
        "Express.js",
        "OOP",
        "Django",
        "Vite/Tailwind"
      ];

      const options = {
        radius: 300,
        maxSpeed: "normal",
        initSpeed: "normal",
        keep: true,
      };

      TagCloud(container, texts, options);
    };
  }, []);

  return (
    <>
      <div className="text-shpere">
        {/* span tag className must be "tagcloud"  */}
        <span className="tagcloud"></span>
      </div>
    </>
  );
};

export default SkillSphere;
