import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";
import "./Experience.scss";

import { experiences } from "./Static";

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#fff",
        color: "black",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      iconStyle={{ background: "#fff" }}
      icon={
        <div className="experience-icon-container">
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="experience-icon"
          />
        </div>
      }
    >
      <div>
        <h4 className="text-[24px] font-bold">{experience.title}</h4>
        <h5 className="text-[16px] font-semibold" style={{ margin: 0 }}>
          {experience.company_name}
        </h5>
        <p>{experience.date}</p>
      </div>

      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-white-100 text-[14px] pl-1 tracking-wider"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <>
      <div></div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default Experience;
