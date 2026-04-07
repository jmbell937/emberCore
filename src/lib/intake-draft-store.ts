export type IntakeQueueItem = {
  slug: string;
  name: string;
  levelOfCare: string;
  facility: string;
  payer: string;
  requestedDate: string;
  updatedAt: string;
  priority: string;
  status: string;
  stage: string;
  summary: string;
};

export const intakeQueueStorageKey = "embercore-intake-queue-item";
