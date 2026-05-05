import type { RefObject } from "react";
import { useEffect, useRef } from "react";

const DEFAULT_TRIGGER_OFFSET_PX = 180;

export interface UseScrollSpyOptions {
  /**
   * DOM ids of the scroll-spied sections, in visual order (top to bottom).
   */
  sectionIds: string[];
  /**
   * Maps a section's DOM id to the tab value to set when that section is active.
   */
  getTabValueFromSectionId: (sectionId: string) => string | number;
  /**
   * Called when the active section changes (e.g. to update selected tab state).
   */
  onActiveSectionChange: (value: string | number) => void;
  /**
   * Pixel offset from the top of the viewport. A section is considered "active"
   * when its top has passed this line. Default 180 (switches tab before section
   * goes under a typical sticky header).
   */
  triggerOffsetPx?: number;
  /**
   * When scroll happens inside this element (e.g. overflow: auto), pass its ref
   * so the spy listens to this container instead of the window.
   */
  scrollContainerRef?: RefObject<HTMLElement | null>;
}

/**
 * Scroll-spy: updates the active tab (or similar) based on scroll position.
 * The active section is the one whose top has passed the trigger line, or the
 * topmost section when none have passed yet.
 */
export function useScrollSpy({
  sectionIds,
  getTabValueFromSectionId,
  onActiveSectionChange,
  triggerOffsetPx = DEFAULT_TRIGGER_OFFSET_PX,
  scrollContainerRef,
}: UseScrollSpyOptions): void {
  const onActiveRef = useRef(onActiveSectionChange);
  onActiveRef.current = onActiveSectionChange;
  const getTabValueRef = useRef(getTabValueFromSectionId);
  getTabValueRef.current = getTabValueFromSectionId;

  useEffect(() => {
    if (sectionIds.length === 0) {
      return;
    }

    const scrollTarget = scrollContainerRef?.current ?? window;

    const updateActiveSection = () => {
      const candidates = sectionIds
        .map((id) => {
          const el = document.getElementById(id);
          if (!el) {
            return null;
          }
          return { id, top: el.getBoundingClientRect().top };
        })
        .filter((c): c is { id: string; top: number } => c !== null);

      if (candidates.length === 0) {
        return;
      }

      const pastTrigger = candidates.filter(
        ({ top }) => top <= triggerOffsetPx,
      );
      const active =
        pastTrigger.length > 0
          ? pastTrigger.reduce((best, cur) =>
              cur.top > best.top ? cur : best,
            )
          : candidates.reduce((best, cur) =>
              cur.top < best.top ? cur : best,
            );

      onActiveRef.current(getTabValueRef.current(active.id));
    };

    updateActiveSection();

    if (scrollTarget === window) {
      window.addEventListener("scroll", updateActiveSection, { passive: true });
      return () =>
        window.removeEventListener("scroll", updateActiveSection);
    }

    scrollTarget.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });
    return () =>
      scrollTarget.removeEventListener("scroll", updateActiveSection);
  }, [sectionIds, triggerOffsetPx, scrollContainerRef]);
}
