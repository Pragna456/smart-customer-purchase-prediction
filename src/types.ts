export type TabType = 'dashboard' | 'predictions' | 'analytics' | 'insights';

export interface PredictionInput {
  age: number;
  income: number;
  spendingScore: number;
}

export interface ClusterInfo {
  id: number;
  name: string;
  tagline: string;
  color: string;
  borderColor: string;
  glowColor: string;
  incomeRange: string;
  spendingRange: string;
  ageRange: string;
  description: string;
  characteristics: string[];
}

export interface PredictionResult {
  input: PredictionInput;
  cluster: ClusterInfo;
  customerType: string;
  customerTypeDescription: string;
  purchaseProbability: number;
  willPurchase: boolean;
  predictionScore: number; // calculated synthetic rating
  confidenceScore: number; // model certainty
  aiRecommendation: string;
  treeTrace: {
    treeIndex: number;
    splitFeature: string;
    splitValue: number;
    decision: string;
    weightContribution: number;
  }[];
}

export interface MLMetric {
  title: string;
  value: string | number;
  changeValue: string;
  isPositive: boolean;
  iconName: string;
  description: string;
}

export interface SyntheticCustomer {
  id: number;
  age: number;
  income: number; // in $k
  spendingScore: number; // 1-100
  clusterId: number;
  purchaseProbability: number;
  purchaseStatus: boolean;
}
