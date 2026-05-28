const SERVICE_LABELS: Record<string, string> = {
  individual_adolescent: "Psicoterapia individual (adolescentes)",
  individual_adult: "Psicoterapia individual (adultos)",
  couple: "Psicoterapia para casais",
  family: "Psicoterapia para famílias",
  lectures: "Palestras",
};

const AVAILABILITY_LABELS: Record<string, string> = {
  morning: "Manhã",
  afternoon: "Tarde",
  night: "Noite",
};

const THERAPY_BEFORE_LABELS: Record<string, string> = {
  yes: "Sim",
  no: "Não",
};

export function getServiceLabel(service: string) {
  return SERVICE_LABELS[service] ?? service;
}

export function getAvailabilityLabel(availability: string) {
  return AVAILABILITY_LABELS[availability] ?? availability;
}

export function getTherapyBeforeLabel(value: string) {
  return THERAPY_BEFORE_LABELS[value] ?? value;
}
