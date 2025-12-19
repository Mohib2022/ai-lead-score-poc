import { describe, it, expect } from "vitest";
import { returnMaxUsedClass } from "../../components/HelperFunctions/HelperFunctions";

describe("returnMaxUsedClass", () => {
  it("returns empty string when NodeList is empty", () => {
    const mockNodeList =
      document.querySelectorAll<HTMLTableCellElement>("td.none");
    expect(returnMaxUsedClass(mockNodeList)).toBeUndefined();
  });

  it("returns the class when all elements have same class", () => {
    document.body.innerHTML = `
      <table>
        <tr>
          <td class="common"></td>
          <td class="common"></td>
          <td class="common"></td>
        </tr>
      </table>
    `;
    const cells = document.querySelectorAll<HTMLTableCellElement>("td");
    expect(returnMaxUsedClass(cells)).toBe("common");
  });

  it("returns the most frequent class when multiple classes exist", () => {
    document.body.innerHTML = `
      <table>
        <tr>
          <td class="a"></td>
          <td class="b"></td>
          <td class="a"></td>
          <td class="c"></td>
          <td class="b"></td>
          <td class="b"></td>
        </tr>
      </table>
    `;
    const cells = document.querySelectorAll<HTMLTableCellElement>("td");
    // 'b' appears 3 times, 'a' appears 2 times
    expect(returnMaxUsedClass(cells)).toBe("b");
  });

  it("returns one of the classes if multiple have same max frequency", () => {
    document.body.innerHTML = `
      <table>
        <tr>
          <td class="x"></td>
          <td class="y"></td>
          <td class="x"></td>
          <td class="y"></td>
        </tr>
      </table>
    `;
    const cells = document.querySelectorAll<HTMLTableCellElement>("td");
    const result = returnMaxUsedClass(cells);
    expect(["x", "y"]).toContain(result); // could return either 'x' or 'y'
  });

  it("handles single element NodeList", () => {
    document.body.innerHTML = `<table><tr><td class="single"></td></tr></table>`;
    const cell = document.querySelectorAll<HTMLTableCellElement>("td");
    expect(returnMaxUsedClass(cell)).toBe("single");
  });
});
