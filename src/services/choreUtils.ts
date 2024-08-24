export function calculateDaysSinceCompletion(
  completions: any[]
): number | null {
  if (completions.length > 0) {
    const lastCompletion = completions[0];
    return Math.floor(
      (Date.now() - lastCompletion.completedAt.getTime()) / 86400000
    );
  }
  return null;
}

export function checkIfOverdue(
  daysSinceCompletion: number | null,
  interval: number
): string {
  if (daysSinceCompletion !== null && daysSinceCompletion > interval * 7) {
    return "overdue";
  }
  return "on-time";
}

export function sortChores(chores: any[]): any[] {
  return chores.sort((a: any, b: any) => {
    if (a.status === "overdue" && b.status === "current") {
      return -1;
    } else if (a.status === "current" && b.status === "overdue") {
      return 1;
    } else {
      return a.daysSinceCompletion - b.daysSinceCompletion;
    }
  });
}
