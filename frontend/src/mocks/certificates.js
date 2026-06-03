export const certificates = [
  {
    id: "cert-manthan-001",
    certificateNumber: "AMT-VOL-2026-001",
    verificationCode: "7B92XQK3",
    recipientName: "Arjun Mehta",
    type: "Volunteer",
    program: "Project Manthan",
    startDate: "2025-09-10",
    endDate: "2026-03-10",
    issueDate: "2026-03-15",
    status: "Issued", // Draft, Generated, Issued, Revoked, Expired
    description: "In recognition of outstanding dedication and leadership in providing basic math and literacy teaching support at our Vasant Kunj center.",
    issuedBy: "Aman Sharma (Education Coordinator)"
  },
  {
    id: "cert-shiksha-002",
    certificateNumber: "AMT-INT-2026-012",
    verificationCode: "M9X8P3KD",
    recipientName: "Demo Volunteer",
    type: "Internship",
    program: "Project Shiksha Tech",
    startDate: "2026-01-05",
    endDate: "2026-04-05",
    issueDate: "2026-04-10",
    status: "Revoked",
    description: "Awarded for designing foundational digital literacy lessons and coding tutorials for community classrooms.",
    issuedBy: "Preeti Goyal (Operations Lead)",
    revocationReason: "Issued in Error - Duplicate Entry Profile ID"
  },
  {
    id: "cert-pravah-003",
    certificateNumber: "AMT-WKS-2025-084",
    verificationCode: "Z4K6Q1WL",
    recipientName: "Rahul Saxena",
    type: "Workshop",
    program: "Pravah Health Advocacy Sync",
    startDate: "2025-11-20",
    endDate: "2025-11-22",
    issueDate: "2025-11-25",
    status: "Expired",
    description: "Awarded for participating and completing the 3-day health and environmental awareness drive workshop.",
    issuedBy: "Kabir Dev (Outreach Coordinator)"
  },
  {
    id: "cert-pravah-004",
    certificateNumber: "AMT-VOL-2026-045",
    verificationCode: "Q7X9P2LM",
    recipientName: "Meera Nair",
    type: "Volunteer",
    program: "Project Pravah Center",
    startDate: "2026-02-01",
    endDate: "2026-05-30",
    issueDate: "2026-06-01",
    status: "Generated",
    description: "In recognition of services as community survey surveyor and advocacy team member.",
    issuedBy: "Kabir Dev (Outreach Coordinator)"
  },
  {
    id: "cert-tech-005",
    certificateNumber: "AMT-INT-2026-098",
    verificationCode: "Y2N9B5RT",
    recipientName: "Siddharth Rao",
    type: "Internship",
    program: "Technology & Infrastructure Team",
    startDate: "2026-03-01",
    endDate: "2026-05-31",
    issueDate: "2026-06-03",
    status: "Draft",
    description: "Awarded for contributions towards building database schemas and front-end system Prototype configurations.",
    issuedBy: "Preeti Goyal (Operations Lead)"
  }
];

export const certificateCategories = [
  "Volunteer",
  "Internship",
  "Workshop",
  "Event Participation",
  "Leadership",
  "Project Completion",
  "Recognition",
  "Custom"
];
