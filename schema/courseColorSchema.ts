// schemas/courseColorSchema.ts
export const getBadgeColor = (course: string): string => {
    switch (course) {
      case "Refrigeracion":
        return "blue";
      case "Lavarropas":
        return "green";
      case "Electronica":
        return "purple";
      case "Esp. Refrigeracion":
        return "orange";
      case "Esp. Lavarropas":
        return "yellow";
      case "Rep. Plaquetas":
        return "red";
      default:
        return "gray"; // Fallback color
    }
  };