import LayoutFactory from "layoutSystems/anvil/layoutComponents/LayoutFactory";
import type {
  AnvilHighlightInfo,
  DraggedWidget,
  GenerateHighlights,
  LayoutComponent,
  LayoutProps,
  PositionData,
  WidgetLayoutProps,
  WidgetPositions,
} from "../../anvilTypes";
import { getStartPosition } from "./highlightUtils";
import { HIGHLIGHT_SIZE } from "../../constants";

/**
 *
 * @param layoutProps | LayoutProps : properties of parent layout.
 * @param widgetPositions | WidgetPositions : positions and dimensions of widgets and layouts.
 * @param baseHighlight | AnvilHighlightInfo : base highlight object.
 * @param draggedWidgets | string[] : list of widgets that are being dragged.
 * @param generateHighlights | GenerateHighlights : method of generate highlights for the parent layout.
 * @param hasFillWidget | boolean | undefined : whether the list of dragged widgets includes a Fill widget.
 * @returns AnvilHighlightInfo[] : List of highlights.
 */
export function getHighlightsForWidgets(
  layoutProps: LayoutProps,
  widgetPositions: WidgetPositions,
  baseHighlight: AnvilHighlightInfo,
  draggedWidgets: DraggedWidget[],
  generateHighlights: GenerateHighlights,
  hasFillWidget = false,
): AnvilHighlightInfo[] {
  const highlights: AnvilHighlightInfo[] = [];

  // Extract list of child widgets
  const layout: WidgetLayoutProps[] = layoutProps.layout as WidgetLayoutProps[];

  // Parent layout dimensions
  const layoutDimensions: PositionData = widgetPositions[layoutProps.layoutId];

  let index = 0;
  let draggedChildCount = 0;

  // Loop over all child widgets
  while (index < layout.length) {
    const widgetId: string = layout[index].widgetId;

    // Check if current widget is included in the dragged widgets.
    const isDraggedWidget: boolean = draggedWidgets.some(
      (widget: DraggedWidget) => widget.widgetId === widgetId,
    );

    // Dimensions of current child widget.
    const currentWidgetDimension: PositionData = widgetPositions[widgetId];

    // Dimensions of neighboring widgets
    const nextWidgetDimension: PositionData | undefined =
      index === layout.length - 1
        ? undefined
        : widgetPositions[layout[index + 1]?.widgetId];
    const previousWidgetDimension: PositionData | undefined =
      index === 0 ? undefined : widgetPositions[layout[index - 1]?.widgetId];

    // If the widget is dragged, don't add a highlight for it.
    if (!isDraggedWidget) {
      highlights.push(
        ...generateHighlights(
          baseHighlight,
          layoutDimensions,
          currentWidgetDimension,
          previousWidgetDimension,
          nextWidgetDimension,
          index - draggedChildCount,
          false,
          hasFillWidget,
        ),
      );
    } else draggedChildCount += 1; // Update the dragged widget count.

    index += 1;

    // Add a highlight after the last widget.
    if (index === layout.length) {
      highlights.push(
        ...generateHighlights(
          baseHighlight,
          layoutDimensions,
          currentWidgetDimension,
          previousWidgetDimension,
          nextWidgetDimension,
          index - draggedChildCount,
          true,
          hasFillWidget,
        ),
      );
    }
  }

  return highlights;
}

/**
 * @param layoutProps | LayoutProps : properties of parent layout.
 * @param widgetPositions | WidgetPositions : positions and dimensions of widgets and layouts.
 * @param baseHighlight | AnvilHighlightInfo : base highlight object.
 * @param draggedWidgets | string[] : list of widgets that are being dragged.
 * @param canvasId | string : widgetId of parent canvas widget.
 * @param layoutOrder | string[] : Hierarchy (Top - down) of layouts.
 * @param generateHighlights | GenerateHighlights : method to generate highlights for the parent layout.
 * @param hasFillWidget | boolean | undefined : whether the list of dragged widgets includes a Fill widget.
 * @returns AnvilHighlightInfo[] : list of highlights.
 */
export function getHighlightsForLayouts(
  layoutProps: LayoutProps,
  widgetPositions: WidgetPositions,
  baseHighlight: AnvilHighlightInfo,
  draggedWidgets: DraggedWidget[],
  canvasId: string,
  layoutOrder: string[],
  generateHighlights: GenerateHighlights,
  hasFillWidget = false,
): AnvilHighlightInfo[] {
  const highlights: AnvilHighlightInfo[] = [];
  // Add parent layoutId to layoutOrder.
  const updatedOrder: string[] = [...layoutOrder, layoutProps.layoutId];
  // Extract list of child layouts.
  const layouts: LayoutProps[] = layoutProps.layout as LayoutProps[];
  // Dimensions of parent layout.
  const layoutDimension: PositionData = widgetPositions[layoutProps.layoutId];

  let index = 0;

  // Loop over all child layouts.
  while (index < layouts.length) {
    // Extract information on current child layout.
    const { isDropTarget, layoutId, layoutType } = layouts[index];

    // Dimensions of current child layout.
    const currentDimension: PositionData = widgetPositions[layoutId];

    // Dimensions of neighboring layouts
    const prevLayoutDimensions: PositionData | undefined =
      index === 0 ? undefined : widgetPositions[layouts[index - 1]?.layoutId];
    const nextLayoutDimensions: PositionData | undefined =
      index === layouts.length - 1
        ? undefined
        : widgetPositions[layouts[index + 1]?.layoutId];

    // Add a highlight for the drop zone above the child layout.
    highlights.push(
      ...generateHighlights(
        baseHighlight,
        layoutDimension,
        currentDimension,
        prevLayoutDimensions,
        nextLayoutDimensions,
        index,
        false,
        hasFillWidget,
      ),
    );

    /**
     * Add highlights of the child layout if it is not a drop target.
     * because if it is, then it can handle its own drag behavior.
     */
    if (!isDropTarget) {
      // Get current child layout component,
      const Comp: LayoutComponent = LayoutFactory.get(layoutType);
      if (!Comp) continue;
      // Calculate highlights for the layout component.
      const layoutHighlights: AnvilHighlightInfo[] = Comp.deriveHighlights(
        layouts[index],
        widgetPositions,
        canvasId,
        draggedWidgets,
        updatedOrder,
      );

      highlights.push(...layoutHighlights);
    }

    index += 1;

    if (index === layouts.length) {
      // Add a highlight for the drop zone below the child layout.
      highlights.push(
        ...generateHighlights(
          baseHighlight,
          layoutDimension,
          currentDimension,
          prevLayoutDimensions,
          nextLayoutDimensions,
          index,
          true,
          hasFillWidget,
        ),
      );
    }
  }

  return highlights;
}

/**
 * @param layoutProps | LayoutProps : properties of parent layout.
 * @param widgetPositions | WidgetPositions : positions and dimensions of widgets and layouts.
 * @param baseHighlight | AnvilHighlightInfo : base highlight object.
 * @param generateHighlights | GenerateHighlights : method to generate highlights for the parent layout.
 * @param hasFillWidget | boolean | undefined : whether the list of dragged widgets includes a Fill widget.
 * @returns AnvilHighlightInfo[] : list of highlights.
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

  // Get start position of the highlight along the y axis based on layoutAlignment.
  const posY: number = getStartPosition(
    baseHighlight.alignment,
    layoutDimension.height,
  );

  return generateHighlights(
    baseHighlight,
    layoutDimension,
    { ...layoutDimension, height: HIGHLIGHT_SIZE, top: posY },
    undefined,
    undefined,
    0,
    true,
    hasFillWidget,
  );
}