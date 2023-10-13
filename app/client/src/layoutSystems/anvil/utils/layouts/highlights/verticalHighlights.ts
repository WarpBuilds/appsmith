import type {
  AnvilHighlightInfo,
  GenerateHighlights,
  LayoutProps,
  PositionData,
  WidgetPositions,
} from "../../anvilTypes";
import { getStartPosition } from "./highlightUtils";
import { HIGHLIGHT_SIZE } from "../../constants";

/**
 * @param layoutProps | LayoutProps : properties of parent layout.
 * @param widgetPositions | WidgetPositions
 * @param baseHighlight | AnvilHighlightInfo : base highlight object.
 * @param generateHighlights | GenerateHighlights : method of generate highlights for the parent layout.
 * @param hasFillWidget | boolean | undefined : whether the list of dragged widgets includes a Fill widget.
 * @returns AnvilHighlightInfo[]
 */
export function getInitialHighlights(
  layoutProps: LayoutProps,
  widgetPositions: WidgetPositions,
  baseHighlight: AnvilHighlightInfo,
  generateHighlights: GenerateHighlights,
  hasFillWidget = false,
): AnvilHighlightInfo[] {
  const { layoutId } = layoutProps;

  const layoutDimension: PositionData = widgetPositions[layoutId];

  const posX: number = getStartPosition(
    baseHighlight.alignment,
    layoutDimension.width,
  );
  return generateHighlights(
    baseHighlight,
    layoutDimension,
    { ...layoutDimension, left: posX, width: HIGHLIGHT_SIZE },
    undefined,
    undefined,
    0,
    true,
    hasFillWidget,
  );
}