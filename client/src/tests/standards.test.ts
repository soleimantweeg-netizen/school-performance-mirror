import { describe, it, expect } from "vitest";
import { domains, getStats } from "@/data/standards";

describe("بيانات المعايير", () => {
  it("يجب أن تحتوي على 4 مجالات", () => {
    expect(domains.length).toBe(4);
  });

  it("يجب أن يكون لكل مجال رقم فريد", () => {
    const numbers = domains.map((d) => d.number);
    const unique = new Set(numbers);
    expect(unique.size).toBe(domains.length);
  });

  it("يجب أن يكون لكل مجال معايير", () => {
    domains.forEach((domain) => {
      expect(domain.standards.length).toBeGreaterThan(0);
    });
  });

  it("يجب أن يكون لكل معيار مؤشرات", () => {
    domains.forEach((domain) => {
      domain.standards.forEach((standard) => {
        expect(standard.indicators.length).toBeGreaterThan(0);
      });
    });
  });

  it("يجب أن يكون لكل مؤشر إضاءات توجيهية", () => {
    domains.forEach((domain) => {
      domain.standards.forEach((standard) => {
        standard.indicators.forEach((indicator) => {
          expect(indicator.illuminations.length).toBeGreaterThan(0);
        });
      });
    });
  });

  it("يجب أن تُرجع getStats إحصائيات صحيحة", () => {
    const stats = getStats();
    expect(stats.totalDomains).toBe(4);
    expect(stats.totalStandards).toBeGreaterThan(0);
    expect(stats.totalIndicators).toBeGreaterThan(0);
  });

  it("يجب أن يكون المجال الأول هو الإدارة المدرسية", () => {
    const first = domains.find((d) => d.number === 1);
    expect(first?.title).toBe("الإدارة المدرسية");
  });

  it("يجب أن يكون المجال الثاني هو التعليم والتعلم", () => {
    const second = domains.find((d) => d.number === 2);
    expect(second?.title).toBe("التعليم والتعلم");
  });

  it("يجب أن يكون المجال الثالث هو نواتج التعلم", () => {
    const third = domains.find((d) => d.number === 3);
    expect(third?.title).toBe("نواتج التعلم");
  });

  it("يجب أن يكون المجال الرابع هو البيئة المدرسية", () => {
    const fourth = domains.find((d) => d.number === 4);
    expect(fourth?.title).toBe("البيئة المدرسية");
  });

  it("يجب أن يكون لكل مجال لون وأيقونة", () => {
    domains.forEach((domain) => {
      expect(domain.icon).toBeTruthy();
      expect(domain.color).toBeTruthy();
      expect(domain.bgColor).toBeTruthy();
    });
  });
});
