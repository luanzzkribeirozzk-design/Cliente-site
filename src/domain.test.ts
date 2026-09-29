import { describe, expect, it } from "vitest";
import { accessExpiration, daysRemaining, isAccessActive } from "./lib/domain";

describe("controle de acesso", () => {
  const createdAt = new Date("2026-01-01T00:00:00.000Z");

  it("prepara validade padrão de 30 dias quando não há data explícita", () => {
    const user = { id: "u1", status: "active", createdAt };
    expect(accessExpiration(user)?.toISOString()).toBe("2026-01-31T00:00:00.000Z");
    expect(daysRemaining(user, new Date("2026-01-15T00:00:00.000Z"))).toBe(16);
  });

  it("bloqueia usuário inactive e expirado", () => {
    expect(isAccessActive({ id: "u1", status: "blocked" }, new Date())).toBe(false);
    expect(isAccessActive({ id: "u1", status: "active", accessExpiresAt: new Date("2025-01-01") }, new Date("2026-01-01"))).toBe(false);
  });

  it("aceita acesso ativo com data futura", () => {
    expect(isAccessActive({ id: "u1", status: "active", accessExpiresAt: new Date("2027-01-01") }, new Date("2026-01-01"))).toBe(true);
  });
});
