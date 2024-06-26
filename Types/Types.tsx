export interface WorkoutProps {
  id: number;
  duration: string;
  instruction: string;
  intensity: string;
  type: string;
}

export interface Tips {
  id: number;
  tips: string;
}

export interface Homepage {
  id: number;
  headline: string;
  description: string;
}

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};
