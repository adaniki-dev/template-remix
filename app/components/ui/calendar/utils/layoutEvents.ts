import { CalendarEvent } from "../types/calendar";

interface LayoutEvent extends CalendarEvent {
  width?: string;
  left?: string;
}

export const calculateOverlappingEvents = (events: CalendarEvent[]): LayoutEvent[] => {
  if (!events.length) return [];

  // Sort events by start time
  const sortedEvents = [...events].sort((a, b) => a.start.getTime() - b.start.getTime());

  // Find overlapping groups
  const groups: LayoutEvent[][] = [];
  let currentGroup: LayoutEvent[] = [sortedEvents[0]];

  for (let i = 1; i < sortedEvents.length; i++) {
    const currentEvent = sortedEvents[i];
    const previousEvent = sortedEvents[i - 1];

    // Check if current event overlaps with previous event
    if (currentEvent.start < previousEvent.end) {
      currentGroup.push(currentEvent);
    } else {
      if (currentGroup.length > 0) {
        groups.push([...currentGroup]);
      }
      currentGroup = [currentEvent];
    }
  }

  // Add the last group
  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }

  // Calculate positions for each group
  const layoutEvents: LayoutEvent[] = [];

  groups.forEach((group) => {
    const count = group.length;
    group.forEach((event, index) => {
      // Calculate width and left position
      const width = `${95 / count}%`;
      const left = `${(95 * index) / count}%`;

      layoutEvents.push({
        ...event,
        width,
        left,
      });
    });
  });

  return layoutEvents;
};
