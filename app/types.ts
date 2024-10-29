// app/types.ts

// Define or import the Doctor type
type Doctor = {
  id: string;
  name: string;
  specialty: string;
  price: string;
  date: string;
  clock: string;
 };
 
 // Define CycleData type
 export interface CycleData {
  hasActivePeriod: boolean;
  startDate: string | null;
  lastPeriod: string | null;
  cycleLength: number;
  periodLength: number;
  symptoms: string[];
  notes?: string;
  isFirstTimeSetup: boolean;
 }
 
 export type RootStackParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  HomeScreen: { fromSOS?: boolean } | undefined;
  DetailEducare: undefined;
  Counseling: undefined;
  CounselingDetail: { doctorType: string };
  ArticlesDetail: { url: string };
  PaymentScreen: { doctor: Doctor };
  ConfirmationScreen: { 
    doctor: string;
    date: string;
    clock: string;
  };
  SosScreen: undefined;
  DetailSos: undefined;
  RedDaySetup: undefined;
  RedDayTracker: {
    isFirstCycle: boolean;
    currentCycleData: CycleData;
  };
 };