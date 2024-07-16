interface ENV {
  API_URL: string;
}

export const CONFIG: ENV = {
  API_URL: process.env.NEXTAUTH_URL!,
};
