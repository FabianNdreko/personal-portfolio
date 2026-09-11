import type { Project } from "../types";

export const qaAutomationSuite: Project = {
  slug: "qa-automation-suite",
  title: "Automated QA Suite",
  summary:
    "Regression and API test suite covering critical user flows, wired into CI with defect tracking.",
  role: "QA Engineer",
  year: 2025,
  tags: ["Selenium", "PyTest", "Postman", "Jira"],
  overview: [
    "A regression and API suite for the flows that actually lose money when they break, run in CI and tied to defect tracking so failures do not sit in a spreadsheet.",
    "Replace this overview with the product you tested and the risk you were covering.",
  ],
  highlights: [
    "Critical-path UI coverage with Selenium and PyTest.",
    "API checks through Postman collections.",
    "Failures filed into Jira with enough context to reproduce.",
  ],
  sections: [
    {
      title: "Problem",
      body: "Releases depended on manual passes that missed the same regressions. Replace with the real pain.",
    },
    {
      title: "Approach",
      body: "Automate the flows that matter, keep API checks next to UI, and wire results into the tracker the team already uses.",
    },
    {
      title: "Outcome",
      body: "Faster, more repeatable confidence before a release. Replace with what actually changed.",
    },
  ],
};
