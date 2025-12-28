describe("Validation utilities", () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  describe("Email validation", () => {
    it("validates correct email formats", () => {
      expect(emailRegex.test("test@example.com")).toBe(true);
      expect(emailRegex.test("user.name@domain.org")).toBe(true);
    });

    it("rejects invalid email formats", () => {
      expect(emailRegex.test("invalid")).toBe(false);
      expect(emailRegex.test("invalid@")).toBe(false);
      expect(emailRegex.test("@domain.com")).toBe(false);
    });
  });

  describe("Password strength", () => {
    const hasUppercase = (p: string) => /[A-Z]/.test(p);
    const hasLowercase = (p: string) => /[a-z]/.test(p);
    const hasNumber = (p: string) => /[0-9]/.test(p);
    const hasSpecial = (p: string) => /[!@#$%^&*(),.?":{}|<>]/.test(p);

    const isStrongPassword = (p: string) =>
      p.length >= 8 &&
      hasUppercase(p) &&
      hasLowercase(p) &&
      hasNumber(p) &&
      hasSpecial(p);

    it("accepts strong passwords", () => {
      expect(isStrongPassword("Password1!")).toBe(true);
      expect(isStrongPassword("StrongPass123@")).toBe(true);
    });

    it("rejects weak passwords", () => {
      expect(isStrongPassword("password")).toBe(false);
      expect(isStrongPassword("PASSWORD1!")).toBe(false);
      expect(isStrongPassword("Password!")).toBe(false);
      expect(isStrongPassword("Password1")).toBe(false);
      expect(isStrongPassword("Pass1!")).toBe(false);
    });
  });
});
