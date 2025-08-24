export type MultipleChoiceInterpretType = {
  Question: string;
  summary: string;
  details: {
    theory: {
      title: string;
      description: string;
      rules: {
        title: string;
        explanation: string;
      }[];
    };
    analogy: {
      title: string;
      scenarios: {
        type: string;
        title: string;
        story: string;
      }[];
    };
  };
};

export type TechType = "JavaScript" | "NextJs" | "React" | "";
