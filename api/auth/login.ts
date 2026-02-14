import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // In a real app, you would:
    // 1. Query your database to find the user by email
    // 2. Verify the password (using bcrypt or similar)
    // 3. Generate a JWT token
    // 4. Return user data with token

    // For demo purposes, we'll simulate a database check
    // Replace this with your actual database query
    const user = await checkUserInDatabase(email, password);

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    return res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.name,
      isPremium: user.isPremium || false,
      subscriptionStatus: user.subscriptionStatus,
      subscriptionEndDate: user.subscriptionEndDate,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

// Simulated database check function
// Replace this with your actual database query
async function checkUserInDatabase(email: string, password: string) {
  // In production, this would query your database
  // For demo, we'll return null to force API error (except for test account)
  
  // Test account is handled in frontend, so API should fail for demo
  // In production, remove this and implement real database check
  
  // Example structure:
  // const user = await db.users.findOne({ email });
  // if (!user) return null;
  // const isValid = await bcrypt.compare(password, user.passwordHash);
  // if (!isValid) return null;
  // return user;
  
  return null;
}
