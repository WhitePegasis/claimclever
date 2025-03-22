
export interface Claim {
  id: string;
  claimNumber: string;
  policyNumber: string;
  claimant: string;
  dateSubmitted: string;
  dateUpdated: string;
  amount: number;
  status: 'New' | 'In Review' | 'Pending' | 'Approved' | 'Rejected';
  type: 'Auto' | 'Property' | 'Health' | 'Life';
  description: string;
  fraudRisk: {
    score: number;
    level: 'Low' | 'Medium' | 'High';
    reasons?: string[];
  };
  entities: Entity[];
}

export interface Entity {
  id: string;
  type: 'Person' | 'Organization' | 'Location' | 'Date' | 'Amount' | 'Document';
  value: string;
  confidence: number;
}

export interface Activity {
  id: string;
  type: 'claim_created' | 'status_updated' | 'fraud_detected' | 'payment_issued';
  timestamp: string;
  description: string;
  claimId?: string;
  userId?: string;
}

export interface Stats {
  totalClaims: number;
  newClaims: number;
  approvedClaims: number;
  rejectedClaims: number;
  averageProcessingTime: number;
  fraudDetected: number;
}

// Mock data for claims
export const claims: Claim[] = [
  {
    id: "claim-001",
    claimNumber: "CLM-2023-001",
    policyNumber: "POL-AUTO-12345",
    claimant: "John Smith",
    dateSubmitted: "2023-05-15T09:30:00Z",
    dateUpdated: "2023-05-16T14:20:00Z",
    amount: 5800,
    status: "In Review",
    type: "Auto",
    description: "Vehicle collision damage on front bumper and right fender. Accident occurred at intersection of Main St and 5th Ave.",
    fraudRisk: {
      score: 0.12,
      level: "Low"
    },
    entities: [
      { id: "ent-001", type: "Person", value: "John Smith", confidence: 0.98 },
      { id: "ent-002", type: "Location", value: "Main St and 5th Ave", confidence: 0.85 },
      { id: "ent-003", type: "Amount", value: "$5,800", confidence: 0.99 },
      { id: "ent-004", type: "Date", value: "May 15, 2023", confidence: 0.97 }
    ]
  },
  {
    id: "claim-002",
    claimNumber: "CLM-2023-002",
    policyNumber: "POL-HOME-45678",
    claimant: "Emily Johnson",
    dateSubmitted: "2023-05-12T11:45:00Z",
    dateUpdated: "2023-05-14T10:30:00Z",
    amount: 12500,
    status: "Pending",
    type: "Property",
    description: "Water damage from burst pipe in basement affecting flooring and drywall. Incident occurred on May 10, 2023.",
    fraudRisk: {
      score: 0.05,
      level: "Low"
    },
    entities: [
      { id: "ent-005", type: "Person", value: "Emily Johnson", confidence: 0.99 },
      { id: "ent-006", type: "Date", value: "May 10, 2023", confidence: 0.96 },
      { id: "ent-007", type: "Amount", value: "$12,500", confidence: 0.99 },
      { id: "ent-008", type: "Location", value: "basement", confidence: 0.85 }
    ]
  },
  {
    id: "claim-003",
    claimNumber: "CLM-2023-003",
    policyNumber: "POL-HEALTH-78901",
    claimant: "Michael Williams",
    dateSubmitted: "2023-05-20T14:15:00Z",
    dateUpdated: "2023-05-21T09:10:00Z",
    amount: 3200,
    status: "New",
    type: "Health",
    description: "Emergency room visit for treatment of broken wrist following a fall. Visit to Memorial Hospital on May 19, 2023.",
    fraudRisk: {
      score: 0.38,
      level: "Medium",
      reasons: ["Multiple claims within short timeframe", "Similar injury pattern to previous claim"]
    },
    entities: [
      { id: "ent-009", type: "Person", value: "Michael Williams", confidence: 0.97 },
      { id: "ent-010", type: "Organization", value: "Memorial Hospital", confidence: 0.93 },
      { id: "ent-011", type: "Date", value: "May 19, 2023", confidence: 0.98 },
      { id: "ent-012", type: "Amount", value: "$3,200", confidence: 0.99 }
    ]
  },
  {
    id: "claim-004",
    claimNumber: "CLM-2023-004",
    policyNumber: "POL-AUTO-23456",
    claimant: "Sarah Brown",
    dateSubmitted: "2023-05-18T16:20:00Z",
    dateUpdated: "2023-05-19T11:30:00Z",
    amount: 8700,
    status: "Approved",
    type: "Auto",
    description: "Hail damage to vehicle roof and hood. Vehicle was parked outside during severe storm on May 17, 2023.",
    fraudRisk: {
      score: 0.08,
      level: "Low"
    },
    entities: [
      { id: "ent-013", type: "Person", value: "Sarah Brown", confidence: 0.98 },
      { id: "ent-014", type: "Date", value: "May 17, 2023", confidence: 0.97 },
      { id: "ent-015", type: "Amount", value: "$8,700", confidence: 0.99 }
    ]
  },
  {
    id: "claim-005",
    claimNumber: "CLM-2023-005",
    policyNumber: "POL-HOME-56789",
    claimant: "Robert Davis",
    dateSubmitted: "2023-05-10T10:45:00Z",
    dateUpdated: "2023-05-16T15:30:00Z",
    amount: 42000,
    status: "In Review",
    type: "Property",
    description: "Fire damage to kitchen and adjacent living room. Fire originated from electrical fault in kitchen appliance.",
    fraudRisk: {
      score: 0.82,
      level: "High",
      reasons: ["Recent policy increase", "Previous similar claim", "Inconsistencies in documentation"]
    },
    entities: [
      { id: "ent-016", type: "Person", value: "Robert Davis", confidence: 0.98 },
      { id: "ent-017", type: "Location", value: "kitchen and living room", confidence: 0.90 },
      { id: "ent-018", type: "Amount", value: "$42,000", confidence: 0.99 },
      { id: "ent-019", type: "Document", value: "Fire incident report #FD-2023-156", confidence: 0.85 }
    ]
  },
  {
    id: "claim-006",
    claimNumber: "CLM-2023-006",
    policyNumber: "POL-AUTO-34567",
    claimant: "Jennifer Miller",
    dateSubmitted: "2023-05-14T13:10:00Z",
    dateUpdated: "2023-05-18T16:45:00Z",
    amount: 4300,
    status: "Rejected",
    type: "Auto",
    description: "Windshield replacement due to crack from road debris. Incident occurred on highway I-95.",
    fraudRisk: {
      score: 0.65,
      level: "Medium",
      reasons: ["Damage inconsistent with described cause"]
    },
    entities: [
      { id: "ent-020", type: "Person", value: "Jennifer Miller", confidence: 0.98 },
      { id: "ent-021", type: "Location", value: "highway I-95", confidence: 0.90 },
      { id: "ent-022", type: "Amount", value: "$4,300", confidence: 0.99 }
    ]
  },
  {
    id: "claim-007",
    claimNumber: "CLM-2023-007",
    policyNumber: "POL-HEALTH-89012",
    claimant: "Daniel Wilson",
    dateSubmitted: "2023-05-19T09:25:00Z",
    dateUpdated: "2023-05-20T14:30:00Z",
    amount: 6800,
    status: "New",
    type: "Health",
    description: "Outpatient surgery for knee arthroscopy. Procedure performed at City Surgical Center on May 18, 2023.",
    fraudRisk: {
      score: 0.15,
      level: "Low"
    },
    entities: [
      { id: "ent-023", type: "Person", value: "Daniel Wilson", confidence: 0.99 },
      { id: "ent-024", type: "Organization", value: "City Surgical Center", confidence: 0.94 },
      { id: "ent-025", type: "Date", value: "May 18, 2023", confidence: 0.98 },
      { id: "ent-026", type: "Amount", value: "$6,800", confidence: 0.99 },
      { id: "ent-027", type: "Document", value: "Surgical report #SR-23587", confidence: 0.86 }
    ]
  }
];

// Mock data for recent activity
export const recentActivity: Activity[] = [
  {
    id: "act-001",
    type: "claim_created",
    timestamp: "2023-05-20T14:15:00Z",
    description: "New claim submitted by Michael Williams",
    claimId: "claim-003"
  },
  {
    id: "act-002",
    type: "status_updated",
    timestamp: "2023-05-19T11:30:00Z",
    description: "Claim CLM-2023-004 status updated to Approved",
    claimId: "claim-004"
  },
  {
    id: "act-003",
    type: "fraud_detected",
    timestamp: "2023-05-16T15:30:00Z",
    description: "High fraud risk detected for claim CLM-2023-005",
    claimId: "claim-005"
  },
  {
    id: "act-004",
    type: "status_updated",
    timestamp: "2023-05-18T16:45:00Z",
    description: "Claim CLM-2023-006 status updated to Rejected",
    claimId: "claim-006"
  },
  {
    id: "act-005",
    type: "claim_created",
    timestamp: "2023-05-19T09:25:00Z",
    description: "New claim submitted by Daniel Wilson",
    claimId: "claim-007"
  }
];

// Mock stats data
export const stats: Stats = {
  totalClaims: 7,
  newClaims: 2,
  approvedClaims: 1,
  rejectedClaims: 1,
  averageProcessingTime: 3.5, // in days
  fraudDetected: 1
};
