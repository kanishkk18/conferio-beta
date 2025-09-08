
export enum IntegrationAppEnum {
  GOOGLE_MEET_AND_CALENDAR = "GOOGLE_MEET_AND_CALENDAR",
}

export const IntegrationLogos: Record<IntegrationAppType, string | string[]> = {
  GOOGLE_MEET_AND_CALENDAR: ["https://i.pinimg.com/736x/0c/22/94/0c2294408d1d2eca1663cfedf95bee64.jpg","https://i.pinimg.com/736x/a4/06/13/a40613ba33adcce92df4b6b147d2869f.jpg"],
};
export type IntegrationAppType =
  | "GOOGLE_MEET_AND_CALENDAR"

export type IntegrationTitleType =
  | "Google Meet & Calendar"

// Integration Descriptions
export const IntegrationDescriptions: Record<IntegrationAppType, string> = {
  GOOGLE_MEET_AND_CALENDAR:
    "Include Google Meet details in your Meetly events and sync with Google Calendar.",
};

export enum VideoConferencingPlatform {
  GOOGLE_MEET_AND_CALENDAR = IntegrationAppEnum.GOOGLE_MEET_AND_CALENDAR,
 
}

export const locationOptions = [
  {
    label: "Google Meet",
    value: VideoConferencingPlatform.GOOGLE_MEET_AND_CALENDAR,
    logo: IntegrationLogos.GOOGLE_MEET_AND_CALENDAR?.[0],
    isAvailable: true,
  },
];
